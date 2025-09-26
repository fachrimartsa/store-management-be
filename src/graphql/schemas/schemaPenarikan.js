const schemaPenarikan = `
  type Penarikan {
    pnr_id: ID!
    pnr_idUser: Int!
    pnr_tanggal: String!
    pnr_jumlah: Int!
    }

    extend type Query {
        getAllPenarikan(pnr_idUser: Int!): [Penarikan!]!
    }

    extend type Mutation {
        createPenarikan(
            pnr_id: ID!
            pnr_idUser: Int!
            pnr_tanggal: String!
            pnr_jumlah: Int!
        ): Penarikan!
    }
`;

module.exports = schemaPenarikan;