import { notes, note } from './query'
import { newNote, deleteNote, updateNote } from './mutation'

export default {
  Query: {
    notes,
    note,
  },
  Mutation: {
    newNote,
    deleteNote,
    updateNote,
  },
}
