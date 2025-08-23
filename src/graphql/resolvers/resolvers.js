const barangResolver = require('./barangResolver');
const supplierResolver = require('./supplierResolver');
const pembelianResolver = require('./pembelianResolver');
const pengeluaranResolver = require('./pengeluaranResolver');
const penjualanResolver = require('./penjualanResolver');
const usersResolver = require('./usersResolver');

const combinedResolvers = {
  // query
  ...barangResolver,
  ...supplierResolver,
  ...pembelianResolver,
  ...pengeluaranResolver,
  ...penjualanResolver,
  ...usersResolver,

  // mutation
  ...barangResolver,
  ...supplierResolver,
  ...pembelianResolver,
  ...pengeluaranResolver,
  ...penjualanResolver,
  ...usersResolver,
};

module.exports = combinedResolvers;