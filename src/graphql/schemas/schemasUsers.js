const schemaUsers = `
  type Users {
        usr_id: ID!
        usr_toko: String!
        usr_username: String!
        usr_password: String!
    }

    extend type Query {
        getUserById(usr_id: ID!): Users
        loginUser(
            usr_username: String!
            usr_password: String!
        ): Users
    }

    extend type Mutation {
    }
`;

module.exports = schemaUsers;