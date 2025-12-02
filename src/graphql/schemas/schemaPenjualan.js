const schemaPenjualan = `
  type Penjualan {
  pjl_id: ID!
  pjl_tanggal: String!
  pjl_platform: String!
  pjl_telephone: String!
  pjl_total: Float!
  pjl_profit: Float!
  pjl_idUser: Int!
}

extend type Query {
  getAllPenjualan(pjl_idUser: Int!, limit: Int, offset: Int): [Penjualan!]!
  getPenjualanById(pjl_id: ID!): Penjualan
  getPenjualanMonth(pjl_idUser: Int!): Float!
  getProfitMonth(pjl_idUser: Int!): Float!
}

extend type Mutation {
  createPenjualan(
    pjl_tanggal: String!
    pjl_platform: String!
    pjl_telephone: String!
    pjl_total: Float!
    pjl_profit: Float!
    pjl_idUser: Int!
  ): Penjualan!
  updatePenjualan(
    pjl_id: ID!
    pjl_tanggal: String
    pjl_platform: String
    pjl_telephone: String
    pjl_total: Float
    pjl_idUser: Int
  ): Penjualan!
  deletePenjualan(pjl_id: ID!): Boolean
}
`;

module.exports = schemaPenjualan;