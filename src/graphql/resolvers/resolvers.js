const barangResolver = require('./barangResolver');
const supplierResolver = require('./supplierResolver');
const pembelianResolver = require('./pembelianResolver');
const pengeluaranResolver = require('./pengeluaranResolver');
const penjualanResolver = require('./penjualanResolver');
const usersResolver = require('./usersResolver');
const detailpenjualanResolver = require('./detailpenjualanResolver');
const penarikanResolver = require('./penarikanResolver');

const combinedResolvers = {
  // query
  ...barangResolver,
  ...supplierResolver,
  ...pembelianResolver,
  ...pengeluaranResolver,
  ...penjualanResolver,
  ...usersResolver,
  ...detailpenjualanResolver,
  ...penarikanResolver,

  // mutation
  ...barangResolver,
  ...supplierResolver,
  ...pembelianResolver,
  ...pengeluaranResolver,
  ...penjualanResolver,
  ...usersResolver,
  ...detailpenjualanResolver,
  ...penarikanResolver,
};

module.exports = combinedResolvers;