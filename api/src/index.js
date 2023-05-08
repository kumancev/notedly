import express from 'express'
import { ApolloServer, gql } from 'apollo-server-express'
import { connect, close } from './db'
import models from './models'
import * as dotenv from 'dotenv'
dotenv.config()

const port = process.env.PORT || 4000
const DB_HOST = process.env.DB_HOST

const typeDefs = gql`
  type Note {
    id: ID!
    content: String!
    author: String!
  }
  type Query {
    hello: String!
    notes: [Note!]!
    note(id: ID!): Note!
  }
  type Mutation {
    newNote(content: String!): Note!
  }
`
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    notes: async () => {
      return await models.Note.find()
    },
    note: async (parent, args) => {
      return await models.Note.findById(args.id)
    },
  },
  Mutation: {
    newNote: async (parent, args) => {
      return await models.Note.create({
        content: args.content,
        author: 'Adam Scott',
      })
    },
  },
}

const app = express()

connect(DB_HOST)

const server = new ApolloServer({ typeDefs, resolvers })
server.applyMiddleware({ app, path: '/api' })

app.listen({ port }, () =>
  console.log(
    `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
  )
)
