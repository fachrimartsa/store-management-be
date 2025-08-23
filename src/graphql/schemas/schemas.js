const { buildSchema } = require('graphql');

const barangTypeDefs = require('./schemaBarang');
const supplierTypeDefs = require('./schemaSupplier');
const penjualanTypeDefs = require('./schemaPenjualan');
const pembelianTypeDefs = require('./schemaPembelian');
const pengeluaranTypeDefs = require('./schemaPengeluaran');
const usersTypeDefs = require('./schemasUsers');

const baseSchema = `
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;

const combinedSchemaSDL = `
  ${baseSchema}
  ${barangTypeDefs}
  ${supplierTypeDefs}
  ${pembelianTypeDefs}
  ${pengeluaranTypeDefs}
  ${penjualanTypeDefs}
  ${usersTypeDefs}
`;

try {
    const combinedSchema = buildSchema(combinedSchemaSDL);
    module.exports = combinedSchema; 
} catch (error) {
    console.error("Error building combined GraphQL schema:", error);
    module.exports = null; 
}