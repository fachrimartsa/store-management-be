const schemaPembelian = `
  type Pembelian {
  pbl_id: ID!
  pbl_tanggal: String!
  pbl_barang: Int!
  brg_nama: String!
  pbl_supplier: Int!
  sp_nama: String!
  pbl_jumlah: Int!
  pbl_alamat: String!
  pbl_harga_beli: Float!
  pbl_total: Float!
}

extend type Query {
  getAllPembelian: [Pembelian!]!
  getPembelianById(pbl_id: ID!): Pembelian
  getPembelianMonth: Float!
}

extend type Mutation {
  createPembelian(
    pbl_tanggal: String!
    pbl_barang: Int!
    pbl_supplier: Int!
    pbl_jumlah: Int!
    pbl_alamat: String!
    pbl_harga_beli: Float!
    pbl_total: Float!
  ): Pembelian!
  updatePembelian(
    pbl_id: ID!
    pbl_tanggal: String
    pbl_barang: Int
    pbl_supplier: Int
    pbl_jumlah: Int
    pbl_alamat: String
    pbl_harga_beli: Float
    pbl_total: Float
  ): Pembelian!
  deletePembelian(pbl_id: ID!): Boolean
}
`;

module.exports = schemaPembelian;