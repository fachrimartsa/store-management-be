const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schemas = require('./graphql/schemas/schemas');
const resolvers = require('./graphql/resolvers/resolvers');
const cors = require('cors');

const app = express();

const allowedOrigins = ['http://localhost:5173', 'http://127.0.0.1:5500', 'https://your-frontend-domain.com'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use('/graphql', graphqlHTTP({
  schema: schemas,
  rootValue: resolvers,
  graphiql: true,
}));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/graphql`);
});
