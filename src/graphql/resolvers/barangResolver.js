const barangService = require("../../service/barangService");

const barangResolver = {
  getAllBarang: async ({ brg_idUser }) => {
    try {
      return await barangService.getBarang({ brg_idUser });
    } catch (error) {
      console.error("Error in getAllBarang resolver:", error);
      throw new Error("Failed to fetch barang.");
    }
  },
  getBarangById: async ({ brg_id }) => {
    try {
      return await barangService.getBarangById({ brg_id });
    } catch (error) {
      console.error(`Error in getBarangById resolver for ID ${brg_id}:`, error);
      throw new Error(`Failed to fetch barang with ID ${brg_id}.`);
    }
  },
  getTotalStok: async () => {
    try {
      return await barangService.getTotalStok();
    } catch (error) {
      console.error("Error in getTotalStok resolver:", error);
      throw new Error("Failed to fetch stok.");
    }
  },
  createBarang: async ({ brg_nama, brg_kategori, brg_harga_beli, brg_stok, brg_status, brg_idUser }) => {
    try {
      return await barangService.createBarang({ brg_nama, brg_kategori, brg_harga_beli, brg_stok, brg_status, brg_idUser });
    } catch (error) {
      console.error("Error in createBarang resolver:", error);
      throw new Error("Failed to create barang.");
    }
  },
  updateBarang: async ({ brg_id, brg_nama, brg_kategori, brg_harga_beli, brg_stok, brg_status, brg_idUser }) => {
    try {
      return await barangService.updateBarang({ brg_id, brg_nama, brg_kategori, brg_harga_beli, brg_stok, brg_status, brg_idUser });
    } catch (error) {
      console.error(`Error in updateBarang resolver for ID ${brg_id}:`, error);
      throw new Error(`Failed to update barang with ID ${brg_id}.`);
    }
  },
  deleteBarang: async ({ brg_id }) => {
    try {
      return await barangService.deleteBarang({ brg_id });
    } catch (error) {
      console.error(`Error in deleteBarang resolver for ID ${brg_id}:`, error);
      throw new Error(`Failed to delete barang with ID ${brg_id}.`);
    }
  }
};

module.exports = barangResolver;