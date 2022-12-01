import mongoose from "mongoose";

const passageSchema = mongoose.Schema(
  {
    title: {
      title_text: String,
      url: String,
    },
    paragraphs: {
      context: {
        type: String,
        required: true,
      },
      passage_type: String,
      comprehension_level: String,
      isAnnotated: Boolean,
      qas: [
        {
          id: Number,
          question: String,
          answer: String,
          question_group: String,
          question_type: String,
          answer_start: Number,
          answer_type: String,
          answer_entity: String,
          is_impossible: Boolean,
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

const Passage = mongoose.model("Passage", passageSchema);

export default Passage;
