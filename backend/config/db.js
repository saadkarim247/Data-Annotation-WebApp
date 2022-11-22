import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    // console.log(process.env.MONGO_URI);
    const conn = await mongoose.connect("mongodb+srv://Zohair:Zohair123@research.hyfgk.mongodb.net/?retryWrites=true&w=majority", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    console.error(`Error:: ${error.message}`.red.underline.bold)
    process.exit(1)
  }
}

export default connectDB
