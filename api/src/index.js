import express from "express"
import { ApolloServer, gql } from "apollo-server-express"

const app = express()
const port = process.env.PORT || 4000

const typeDefs = gql`
  type Query {
    hello: String
  }
`

app.get('/', (req, res) => res.send('Hello Web Server'));
app.listen(port, () => console.log(`Server running at http://localhost:${port}`))
