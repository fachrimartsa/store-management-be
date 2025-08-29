const schemaPengeluaran = `
  type Pengeluaran {
  pgl_id: ID!
  pgl_tanggal: String!
  pgl_barang: String!
  pgl_jumlah: Int!
  pgl_total: Float!
  pgl_idUser: Int!
}

extend type Query {
  getAllPengeluaran(pgl_idUser: Int!): [Pengeluaran!]!
  getPengeluaranById(pgl_id: ID!): Pengeluaran
  getPengeluaranMonth(pgl_idUser: Int!): Float!
}

extend type Mutation {
  createPengeluaran(
    pgl_tanggal: String!
    pgl_barang: String!
    pgl_jumlah: Int!
    pgl_total: Float!
    pgl_idUser: Int!
  ): Pengeluaran!
  updatePengeluaran(
    pgl_id: ID!
    pgl_tanggal: String
    pgl_barang: String
    pgl_jumlah: Int
    pgl_total: Float
    pgl_idUser: Int
  ): Pengeluaran!
  deletePengeluaran(pgl_id: ID!): Boolean
}
`;

module.exports = schemaPengeluaran;