import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import jwt from 'jsonwebtoken'
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

const getUser = token => {
  if (token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
      new Error('Session invalid')
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    const token = req.headers.authorization
    const user = getUser(token)
    console.log(user)
    return { models, user }
  },
})
server.applyMiddleware({ app, path: '/api' })

app.listen({ port }, () =>
  console.log(
    `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
  )
)
