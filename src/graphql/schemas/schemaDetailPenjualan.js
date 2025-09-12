const schemaDetailPenjualan = `
type Detail_Penjualan {
  dtl_id: ID!
  pjl_id: Int!
  brg_id: Int!
  dtl_jumlah: Int!
  dtl_idUser: Int!
}

extend type Query {
  getAllDetail(dtl_idUser: Int!): [Detail_Penjualan!]!
  getDetailPenjualan(pjl_id: Int!): [Detail_Penjualan!]!
}

extend type Mutation {
  createDetailsss(
    dtl_id: ID!
    pjl_id: Int!
    brg_id: Int!
    dtl_jumlah: Int!
    dtl_idUser: Int!
  ): Detail_Penjualan!
}
`;

module.exports = schemaDetailPenjualan;