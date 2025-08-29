const schemaPembelian = `
  type Pembelian {
  pbl_id: ID!
  pbl_tanggal: String!
  pbl_barang: Int!
  brg_nama: String!
  pbl_supplier: Int!
  sp_nama: String!
  pbl_jumlah: Int!
  pbl_harga_beli: Float!
  pbl_total: Float!
  pbl_idUser: Int!
}

extend type Query {
  getAllPembelian(pbl_idUser: Int!): [Pembelian!]!
  getPembelianById(pbl_id: ID!): Pembelian
  getPembelianMonth(pbl_idUser: Int!): Float!
}

extend type Mutation {
  createPembelian(
    pbl_tanggal: String!
    pbl_barang: Int!
    pbl_supplier: Int!
    pbl_jumlah: Int!
    pbl_harga_beli: Float!
    pbl_total: Float!
    pbl_idUser: Int!
  ): Pembelian!
  updatePembelian(
    pbl_id: ID!
    pbl_tanggal: String
    pbl_barang: Int
    pbl_supplier: Int
    pbl_jumlah: Int
    pbl_harga_beli: Float
    pbl_total: Float
    pbl_idUser: Int
  ): Pembelian!
  deletePembelian(pbl_id: ID!): Boolean
}
`;

module.exports = schemaPembelian;