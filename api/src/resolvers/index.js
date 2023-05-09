import { notes, note } from './query'
import { newNote, deleteNote, updateNote } from './mutation'
import GraphQLDateTime from 'graphql-iso-date'

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
  DateTime: {
    GraphQLDateTime,
  },
}
