const barangResolver = require('./barangResolver');
const supplierResolver = require('./supplierResolver');
const pembelianResolver = require('./pembelianResolver');
const pengeluaranResolver = require('./pengeluaranResolver');
const penjualanResolver = require('./penjualanResolver');

const combinedResolvers = {
  // query
  ...barangResolver,
  ...supplierResolver,
  ...pembelianResolver,
  ...pengeluaranResolver,
  ...penjualanResolver,

  // mutation
  ...barangResolver,
  ...supplierResolver,
  ...pembelianResolver,
  ...pengeluaranResolver,
  ...penjualanResolver,
};

module.exports = combinedResolvers;