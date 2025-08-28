const schemaBarang = `
  type Barang {
        brg_id: ID!
        brg_nama: String!
        brg_kategori: String!
        brg_harga_beli: Float!
        brg_stok: Int!
        brg_status: String!
        brg_idUser: Int!
    }

    extend type Query {
        getBarangByUser(brg_idUser: Int!): [Barang!]!
        getBarangById(brg_id: ID!): Barang
        getTotalStok: Int!
    }

    extend type Mutation {
    createBarang(
        brg_nama: String!
        brg_kategori: String!
        brg_harga_beli: Float!
        brg_stok: Int!
        brg_status: String!
        brg_idUser: Int!
    ): Barang!
    updateBarang(
        brg_id: ID!
        brg_nama: String
        brg_kategori: String
        brg_harga_beli: Float
        brg_stok: Int
        brg_status: String
        brg_idUser: Int
    ): Barang!
    deleteBarang(brg_id: ID!): Boolean
    }
`;

module.exports = schemaBarang;