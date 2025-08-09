const schemaSupplier = `
  type Supplier {
    sp_id: ID!
    sp_nama: String!
    sp_contact: String!
    sp_kategori: String!
    sp_alamat: String!
    }

    extend type Query {
        getAllSuppliers: [Supplier!]!
        getSupplierById(sp_id: ID!): Supplier
        getTotalSupplier: Int!
    }

    extend type Mutation {
    createSupplier(
        sp_nama: String!
        sp_contact: String!
        sp_kategori: String!
        sp_alamat: String!
    ): Supplier!
    updateSupplier(
        sp_id: ID!
        sp_nama: String
        sp_contact: String
        sp_kategori: String
        sp_alamat: String
    ): Supplier!
    deleteSupplier(sp_id: ID!): Boolean!
    }
`;

module.exports = schemaSupplier;