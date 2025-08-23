const schemaUsers = `
  type BarangUsers {
        usr_id: ID!
        usr_toko: String!
        usr_username: String!
        usr_password: String!
    }

    extend type Query {
        getUserById(brg_id: ID!): Barang
    }

    extend type Mutation {
    loginUser(
        usr_username: String!
        usr_password: String!
    ): Boolean!
    }
`;

module.exports = schemaUsers;