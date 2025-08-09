const schemaBarang = `
  type Barang {
        brg_id: ID!
        brg_nama: String!
        brg_kategori: String!
        brg_harga_beli: Float!
        brg_harga_jual: Float!
        brg_stok: Int!
        brg_status: String!
    }

    extend type Query {
        getAllBarang: [Barang!]!
        getBarangById(brg_id: ID!): Barang
        getTotalStok: Int!
    }

    extend type Mutation {
    createBarang(
        brg_nama: String!
        brg_kategori: String!
        brg_harga_beli: Float!
        brg_harga_jual: Float!
        brg_stok: Int!
        brg_status: String!
    ): Barang!
    updateBarang(
        brg_id: ID!
        brg_nama: String
        brg_kategori: String
        brg_harga_beli: Float
        brg_harga_jual: Float
        brg_stok: Int
        brg_status: String
    ): Barang!
    deleteBarang(brg_id: ID!): Boolean
    }
`;

module.exports = schemaBarang;