const schemaPengeluaran = `
  type Pengeluaran {
  pgl_id: ID!
  pgl_tanggal: String!
  pgl_barang: String!
  pgl_jumlah: Int!
  pgl_total: Float!
}

extend type Query {
  getAllPengeluaran: [Pengeluaran!]!
  getPengeluaranById(pgl_id: ID!): Pengeluaran
  getPengeluaranMonth: Float!
}

extend type Mutation {
  createPengeluaran(
    pgl_tanggal: String!
    pgl_barang: String!
    pgl_jumlah: Int!
    pgl_total: Float!
  ): Pengeluaran!
  updatePengeluaran(
    pgl_id: ID!
    pgl_tanggal: String
    pgl_barang: String
    pgl_jumlah: Int
    pgl_total: Float
  ): Pengeluaran!
  deletePengeluaran(pgl_id: ID!): Boolean
}
`;

module.exports = schemaPengeluaran;