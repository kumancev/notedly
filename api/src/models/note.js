import mongoose from 'mongoose'

const NoteSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Note = mongoose.model('Note', NoteSchema)

export default Note
