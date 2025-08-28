const db = require("../config/db");

const supplierService = {
  getAllSuppliers: async ({ sp_idUser }) => {
    try {
      const result = await db`
        SELECT
          sp_id,
          sp_nama,
          sp_contact,
          sp_kategori,
          sp_alamat
        FROM supplier WHERE "sp_idUser" = ${sp_idUser}
      `;
      return result; 
    } catch (err) {
      console.error("Error mengambil daftar supplier:", err);
      throw new Error("Gagal mengambil daftar supplier dari database.");
    }
  },

  getSupplierById: async ({ sp_id }) => {
    try {
      const result = await db`
        SELECT
          sp_id,
          sp_nama,
          sp_contact,
          sp_kategori,
          sp_alamat
        FROM supplier
        WHERE sp_id = ${sp_id}
      `;
      return result[0] || null;
    } catch (err) {
      console.error(`Error mengambil supplier dengan ID ${sp_id}:`, err);
      throw new Error(`Gagal mengambil supplier dengan ID ${sp_id}.`);
    }
  },

  getTotalSupplier: async () => {
    try {
      const result = await db`
        SELECT COUNT(*) AS total_supplier FROM supplier
      `;
      return parseInt(result[0]?.total_supplier) || 0;
    } catch (err) {
      console.error("Error mengambil total supplier:", err);
      throw new Error("Gagal mengambil total supplier dari database.");
    }
  },

  createSupplier: async ({ sp_nama, sp_contact, sp_kategori, sp_alamat, sp_idUser }) => {
    try {
      const result = await db`
        INSERT INTO supplier (sp_nama, sp_contact, sp_kategori, sp_alamat, "sp_idUser")
        VALUES (${sp_nama}, ${sp_contact}, ${sp_kategori}, ${sp_alamat}, ${sp_idUser})
        RETURNING sp_id, sp_nama, sp_contact, sp_kategori, sp_alamat, "sp_idUser"
      `;
      return result[0];
    } catch (err) {
      console.error("Error membuat supplier baru:", err);
      throw new Error("Gagal membuat supplier baru di database.");
    }
  },

  updateSupplier: async ({ sp_id, ...updates }) => {
    try {
      const updateKeys = Object.keys(updates);
      if (updateKeys.length === 0) {
        throw new Error("Tidak ada data yang diberikan untuk update.");
      }

      const updatesString = updateKeys.map((key, index) => `"${key}" = $${index + 1}`).join(", ");
      const values = Object.values(updates);

      const query = `
        UPDATE supplier
        SET ${updatesString}
        WHERE sp_id = $${values.length + 1}
        RETURNING sp_id, sp_nama, sp_contact, sp_kategori, sp_alamat, "sp_idUser"
      `;

      const result = await db.unsafe(query, [...values, sp_id]);

      return result[0] || null;
    } catch (err) {
      console.error(`Error mengedit supplier dengan ID ${sp_id}:`, err);
      throw new Error(`Gagal mengedit supplier dengan ID ${sp_id}.`);
    }
  },

  deleteSupplier: async ({ sp_id }) => {
    try {
      await db`
        DELETE FROM supplier WHERE sp_id = ${sp_id}
      `;
      return true;
    } catch (err) {
      console.error(`Error menghapus supplier dengan ID ${sp_id}:`, err);
      throw new Error(`Gagal menghapus supplier dengan ID ${sp_id}.`);
    }
  }
};

module.exports = supplierService;
