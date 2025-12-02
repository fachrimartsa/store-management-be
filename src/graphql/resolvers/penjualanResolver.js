const penjualanService = require("../../service/penjualanService");

const penjualanResolver = {
  getAllPenjualan: async ({ pjl_idUser, limit, offset }) => {
    try {
      return await penjualanService.getAllPenjualan({ pjl_idUser, limit, offset });
    } catch (error) {
      console.error("Error in getAllPenjualan resolver:", error);
      throw new Error("Failed to fetch penjualan records.");
    }
  },
  getPenjualanById: async ({ pjl_id }) => {
    try {
      return await penjualanService.getPenjualanById({ pjl_id });
    } catch (error) {
      console.error(`Error in getPenjualanById resolver for ID ${pjl_id}:`, error);
      throw new Error(`Failed to fetch penjualan record with ID ${pjl_id}.`);
    }
  },
  getPenjualanMonth: async ({ pjl_idUser }) => {
    try {
      return await penjualanService.getPenjualanMonth({pjl_idUser});
    } catch (error) {
      console.error("Error in getPenjualanMonth resolver:", error);
      throw new Error("Failed to fetch penjualan records.");
    }
  },
  getProfitMonth: async ({ pjl_idUser }) => {
    try {
      return await penjualanService.getProfitMonth({ pjl_idUser });
    } catch (error) {
      console.error("Error in getProfitMonth resolver:", error);
      throw new Error("Failed to fetch penjualan records.");
    }
  },
  createPenjualan: async ({ pjl_tanggal, pjl_platform, pjl_telephone, pjl_total, pjl_profit, pjl_idUser }) => {
    try {
      return await penjualanService.createPenjualan({ pjl_tanggal, pjl_platform, pjl_telephone, pjl_total, pjl_profit, pjl_idUser });
    } catch (error) {
      console.error("Error in createPenjualan resolver:", error);
      throw new Error("Failed to create penjualan record.");
    }
  },
  updatePenjualan: async ({ pjl_id, pjl_tanggal, pjl_platform, pjl_telephone, pjl_total, pjl_idUser }) => {
    try {
      return await penjualanService.updatePenjualan({ pjl_id, pjl_tanggal, pjl_platform, pjl_telephone, pjl_total, pjl_idUser });
    } catch (error) {
      console.error(`Error in updatePenjualan resolver for ID ${pjl_id}:`, error);
      throw new Error(`Failed to update penjualan record with ID ${pjl_id}.`);
    }
  },
  deletePenjualan: async ({ pjl_id }) => {
    try {
      return await penjualanService.deletePenjualan({ pjl_id });
    } catch (error) {
      console.error(`Error in deletePenjualan resolver for ID ${pjl_id}:`, error);
      throw new Error(`Failed to delete penjualan record with ID ${pjl_id}.`);
    }
  }
};

module.exports = penjualanResolver;