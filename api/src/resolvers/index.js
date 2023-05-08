import { notes, note } from './query'
import { newNote } from './mutation'

export default {
  Query: {
    notes,
    note,
  },
  Mutation: {
    newNote,
  },
}
