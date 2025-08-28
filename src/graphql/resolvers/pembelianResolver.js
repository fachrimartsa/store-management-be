const pembelianService = require("../../service/pembelianService");

const pembelianResolver = {
  getAllPembelian: async ({ pbl_idUser }) => {
    try {
      return await pembelianService.getAllPembelian({ pbl_idUser });
    } catch (error) {
      console.error("Error in getAllPembelian resolver:", error);
      throw new Error("Failed to fetch pembelian records.");
    }
  },
  getPembelianById: async ({ pbl_id }) => {
    try {
      return await pembelianService.getPembelianById({ pbl_id });
    } catch (error) {
      console.error(`Error in getPembelianById resolver for ID ${pbl_id}:`, error);
      throw new Error(`Failed to fetch pembelian record with ID ${pbl_id}.`);
    }
  },
  getPembelianMonth: async () => {
    try {
      return await pembelianService.getPembelianMonth();
    } catch (error) {
      console.error("Error in getPembelianMonth resolver:", error);
      throw new Error("Failed to fetch pembelian records.");
    }
  },
  createPembelian: async ({ pbl_tanggal, pbl_barang, pbl_supplier, pbl_jumlah, pbl_harga_beli, pbl_total, pbl_idUser }) => {
    try {
      return await pembelianService.createPembelian({ pbl_tanggal, pbl_barang, pbl_supplier, pbl_jumlah, pbl_harga_beli, pbl_total, pbl_idUser });
    } catch (error) {
      console.error("Error in createPembelian resolver:", error);
      throw new Error("Failed to create pembelian record.");
    }
  },
  updatePembelian: async ({ pbl_id, pbl_tanggal, pbl_barang, pbl_supplier, pbl_jumlah, pbl_harga_beli, pbl_total, pbl_idUser }) => {
    try {
      return await pembelianService.updatePembelian({ pbl_id, pbl_tanggal, pbl_barang, pbl_supplier, pbl_jumlah, pbl_harga_beli, pbl_total, pbl_idUser });
    } catch (error) {
      console.error(`Error in updatePembelian resolver for ID ${pbl_id}:`, error);
      throw new Error(`Failed to update pembelian record with ID ${pbl_id}.`);
    }
  },
  deletePembelian: async ({ pbl_id }) => {
    try {
      return await pembelianService.deletePembelian({ pbl_id });
    } catch (error) {
      console.error(`Error in deletePembelian resolver for ID ${pbl_id}:`, error);
      throw new Error(`Failed to delete pembelian record with ID ${pbl_id}.`);
    }
  }
};

module.exports = pembelianResolver;