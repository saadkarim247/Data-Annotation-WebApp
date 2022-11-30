import mongoose from 'mongoose'

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
      isAnnotated: Boolean,
      // passage_level: String,
      qas: [
        {
          question: String,
          // question_group: String,
          id: Number,
          answers: {
            answer: String,
            answer_start: Number,
            answer_type: String,
            answer_entity: String,
            is_impossible: Boolean,
          },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
)

const testpassages = mongoose.model('testpassages', passageSchema)

export default testpassages
