const schemaUsers = `
    type Users {
        usr_id: ID!
        usr_toko: String!
        usr_username: String!
        usr_password: String!
    }

    extend type Query {
        getUserById(usr_id: ID!): Users
    }

    extend type Mutation {
        loginUser(
            usr_username: String!
            usr_password: String!
        ): Users
    }
`;

module.exports = schemaUsers;