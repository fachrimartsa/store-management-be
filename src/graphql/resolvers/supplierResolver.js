const supplierService = require("../../service/supplierService");

const supplierResolver = {
  getAllSuppliers: async () => {
    try {
      return await supplierService.getAllSuppliers();
    } catch (error) {
      console.error("Error in getAllSuppliers resolver:", error);
      throw new Error("Failed to fetch suppliers.");
    }
  },
  getSupplierById: async ({ sp_id }) => {
    try {
      return await supplierService.getSupplierById({ sp_id });
    } catch (error) {
      console.error(`Error in getSupplierById resolver for ID ${sp_id}:`, error);
      throw new Error(`Failed to fetch supplier with ID ${sp_id}.`);
    }
  },

  getTotalSupplier: async () => {
    try {
      return await supplierService.getTotalSupplier();
    } catch (error) {
      console.error("Error in getTotalSupplier resolver:", error);
      throw new Error("Failed to fetch total suppliers.");
    }
  },

  createSupplier: async ({ sp_nama, sp_contact, sp_kategori, sp_alamat }) => {
    try {
      return await supplierService.createSupplier({ sp_nama, sp_contact, sp_kategori, sp_alamat });
    } catch (error) {
      console.error("Error in createSupplier resolver:", error);
      throw new Error("Failed to create supplier.");
    }
  },
  updateSupplier: async ({ sp_id, sp_nama, sp_contact, sp_kategori, sp_alamat }) => {
    try {
      return await supplierService.updateSupplier({ sp_id, sp_nama, sp_contact, sp_kategori, sp_alamat });
    } catch (error) {
      console.error(`Error in updateSupplier resolver for ID ${sp_id}:`, error);
      throw new Error(`Failed to update supplier with ID ${sp_id}.`);
    }
  },
  deleteSupplier: async ({ sp_id }) => {
    try {
      return await supplierService.deleteSupplier({ sp_id });
    } catch (error) {
      console.error(`Error in deleteSupplier resolver for ID ${sp_id}:`, error);
      throw new Error(`Failed to delete supplier with ID ${sp_id}.`);
    }
  }
};

module.exports = supplierResolver;