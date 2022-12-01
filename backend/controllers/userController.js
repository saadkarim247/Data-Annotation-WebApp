import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import Passage from "../models/passageModel.js";
import testpassages from "../models/testModel.js";
// @desc Auth user & get token
// @route POST /api/user/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log("Here in login");

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      completedPassages: user.completedPassages,
      completedQuestions: user.completedQuestions,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      completedPassages: user.completedPassages,
      completedQuestions: user.completedQuestions,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc Register a new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      completedPassages: user.completedPassages,
      completedQuestions: user.completedQuestions,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      completedPassages: updatedUser.completedPassages,
      completedQuestions: updatedUser.completedQuestions,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updatePassageInfo = asyncHandler(async (req, res) => {
  console.log(req.body);
  if (!req.body.passage) {
    res.status(400).send({
      Status: "failed",
      message: "no passage sent!",
    });
  }
  if (!req.body.fields) {
    res.status(400).send({
      Status: "failed",
      message: "no fields sent!",
    });
  }
  if (req.body.comprehension_level == null) {
    res.status(400).send({
      Status: "failed",
      message: "no comprehension level sent",
    });
  }

  const passage = await Passage.find({
    "paragraphs.context": req.body.passage,
  });
  console.log(passage);
  if (passage) {
    if (passage[0].paragraphs.isAnnotated) {
      res.status(400).send({
        Status: "failed",
        message:
          "This passage has already been annotated, kindly get another paragraph.",
      });
    } else {
      passage[0].paragraphs.qas = req.body.fields;
      passage[0].paragraphs.comprehension_level = req.body.comprehension_level;
      passage[0].paragraphs.isAnnotated = true;

      await passage[0].save();

      const user = await User.findById(req.body.user);
      var x = user.completedPassages;
      console.log(x);
      const userUpdated = await User.updateOne(
        { _id: req.body.user },
        { completedPassages: x + 1 }
      );
      // await userUpdated.save();
      if (user) {
        res.json({
          message: "Successfully posted data!" ,
        });
      } else {
        res.status(500).send({
          Status: "failed",
          message: "user count could not be updated",
        });
      }
    }
  } else {
    res.status(404);
    throw new Error("Passage not found");
  }
  
});

const getPassage = asyncHandler(async (req, res) => {
  Passage.count().exec(async function (err, count) {
    var random = Math.floor(Math.random() * count);

    Passage.findOne({ "paragraphs.isAnnotated": false })
      .skip(random)
      .exec(function (err, result) {
        if (err) {
          res.status(500).send({
            Status: "Failed",
            message: "Unable to get random passage from database.",
          });
        } else res.send(result);
      });
  });
});

export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getPassage,
  updatePassageInfo,
};
