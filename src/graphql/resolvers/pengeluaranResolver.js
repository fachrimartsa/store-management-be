const pengeluaranService = require("../../service/pengeluaranService");

const pengeluaranResolver = {
  getAllPengeluaran: async ({ pgl_idUser}) => {
    try {
      return await pengeluaranService.getAllPengeluaran({ pgl_idUser });
    } catch (error) {
      console.error("Error in getAllPengeluaran resolver:", error);
      throw new Error("Failed to fetch pengeluaran records.");
    }
  },
  getPengeluaranById: async ({ pgl_id }) => {
    try {
      return await pengeluaranService.getPengeluaranById({ pgl_id });
    } catch (error) {
      console.error(`Error in getPengeluaranById resolver for ID ${pgl_id}:`, error);
      throw new Error(`Failed to fetch pengeluaran record with ID ${pgl_id}.`);
    }
  },
  getPengeluaranMonth: async () => {
    try {
      return await pengeluaranService.getPengeluaranMonth();
    } catch (error) {
      console.error("Error in getPengeluaranMonth resolver:", error);
      throw new Error("Failed to fetch pengeluaran records.");
    }
  },
  createPengeluaran: async ({ pgl_tanggal, pgl_barang, pgl_jumlah, pgl_total, pgl_idUser }) => {
    try {
      return await pengeluaranService.createPengeluaran({ pgl_tanggal, pgl_barang, pgl_jumlah, pgl_total, pgl_idUser });
    } catch (error) {
      console.error("Error in createPengeluaran resolver:", error);
      throw new Error("Failed to create pengeluaran record.");
    }
  },
  updatePengeluaran: async ({ pgl_id, pgl_tanggal, pgl_barang, pgl_jumlah, pgl_total, pgl_idUser }) => {
    try {
      return await pengeluaranService.updatePengeluaran({ pgl_id, pgl_tanggal, pgl_barang, pgl_jumlah, pgl_total, pgl_idUser });
    } catch (error) {
      console.error(`Error in updatePengeluaran resolver for ID ${pgl_id}:`, error);
      throw new Error(`Failed to update pengeluaran record with ID ${pgl_id}.`);
    }
  },
  deletePengeluaran: async ({ pgl_id }) => {
    try {
      return await pengeluaranService.deletePengeluaran({ pgl_id });
    } catch (error) {
      console.error(`Error in deletePengeluaran resolver for ID ${pgl_id}:`, error);
      throw new Error(`Failed to delete pengeluaran record with ID ${pgl_id}.`);
    }
  }
};

module.exports = pengeluaranResolver;