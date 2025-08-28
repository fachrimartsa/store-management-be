const schemaPenjualan = `
  type Penjualan {
  pjl_id: ID!
  pjl_tanggal: String!
  pjl_barang: Int!
  brg_nama: String!
  pjl_jumlah: Int!
  pjl_platform: String!
  pjl_telephone: String!
  pjl_harga_jual: Float!
  pjl_total: Float!
  pjl_profit: Float!
  pjl_idUser: Int!
}

extend type Query {
  getAllPenjualan(pjl_idUser: Int!): [Penjualan!]!
  getPenjualanById(pjl_id: ID!): Penjualan
  getPenjualanMonth: Float!
  getProfitMonth: Float!
}

extend type Mutation {
  createPenjualan(
    pjl_tanggal: String!
    pjl_barang: Int!
    pjl_jumlah: Int! 
    pjl_platform: String!
    pjl_telephone: String!
    pjl_harga_jual: Float!
    pjl_total: Float!
    pjl_profit: Float!
    pjl_idUser: Int!
  ): Penjualan!
  updatePenjualan(
    pjl_id: ID!
    pjl_tanggal: String
    pjl_barang: Int
    pjl_jumlah: Int 
    pjl_platform: String
    pjl_telephone: String
    pjl_harga_jual: Float
    pjl_total: Float
    pjl_idUser: Int
  ): Penjualan!
  deletePenjualan(pjl_id: ID!): Boolean
}
`;

module.exports = schemaPenjualan;