const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const schemas = require('./graphql/schemas/schemas')
const resolvers = require('./graphql/resolvers/resolvers')
const cors = require('cors')

const app = express()

app.use(cors({
  origin: '*',
  credentials: true
}))

app.get('/', (req, res) => {
  res.send('Backend is running!')
})

app.use('/graphql', graphqlHTTP({
  schema: schemas,
  rootValue: resolvers,
  graphiql: true
}))

module.exports = app