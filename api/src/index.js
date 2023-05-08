import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { connect, close } from './db'
import typeDefs from './schema'
import models from './models'
import resolvers from './resolvers'
import * as dotenv from 'dotenv'
dotenv.config()

const port = process.env.PORT || 4000
const DB_HOST = process.env.DB_HOST

const app = express()

connect(DB_HOST)

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    return { models }
  },
})
server.applyMiddleware({ app, path: '/api' })

app.listen({ port }, () =>
  console.log(
    `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
  )
)
