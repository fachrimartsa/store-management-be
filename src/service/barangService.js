const db = require("../config/db");

const barangService = {
  getBarang: async ({ brg_idUser }) => {
    try {
      const barang = await db`
        SELECT brg_id, brg_nama, brg_kategori, brg_harga_beli, brg_stok, brg_status
        FROM barang WHERE "brg_idUser" = ${brg_idUser};
      `;
      return barang; 
    } catch (error) {
      console.error('Error fetching barang:', error);
      throw new Error('Failed to fetch barang');
    }
  },

  getBarangById: async ({ brg_id }) => {
    try {
      const result = await db`
        SELECT brg_id, brg_nama, brg_kategori, brg_harga_beli, brg_stok, brg_status
        FROM barang
        WHERE brg_id = ${brg_id}
      `;
      return result[0] || null; 
    } catch (err) {
      console.error(`Error mengambil barang dengan ID ${brg_id}:`, err);
      throw new Error(`Gagal mengambil barang dengan ID ${brg_id}.`);
    }
  },

  getTotalStok: async ({ brg_idUser }) => {
    try {
      const result = await db`
        SELECT SUM(brg_stok) AS total_stok FROM barang WHERE brg_idUser = ${brg_idUser}
      `;
      return result[0]?.total_stok || 0;
    } catch (err) {
      console.error("Error mengambil total stok:", err);
      throw new Error("Gagal mengambil total stok dari database.");
    }
  },

  createBarang: async ({ brg_nama, brg_kategori, brg_harga_beli, brg_stok, brg_status, brg_idUser }) => {
    try {
      const result = await db`
        INSERT INTO barang (brg_nama, brg_kategori, brg_harga_beli, brg_stok, brg_status, "brg_idUser")
        VALUES (${brg_nama}, ${brg_kategori}, ${brg_harga_beli}, ${brg_stok}, ${brg_status}, ${brg_idUser})
        RETURNING brg_id, brg_nama, brg_kategori, brg_harga_beli, brg_stok, brg_status, "brg_idUser"
      `;
      return result[0];
    } catch (err) {
      console.error("Error membuat barang baru:", err);
      throw new Error("Gagal membuat barang baru di database.");
    }
  },

  updateBarang: async ({ brg_id, ...updates }) => {
    try {
      const updateKeys = Object.keys(updates);
      if (updateKeys.length === 0) {
        throw new Error("Tidak ada data yang diberikan untuk update.");
      }

      const updatesString = updateKeys.map((key, index) => `"${key}" = $${index + 1}`).join(", ");
      const values = Object.values(updates);

      const query = `
        UPDATE barang
        SET ${updatesString}
        WHERE brg_id = $${values.length + 1}
        RETURNING brg_id, brg_nama, brg_kategori, brg_harga_beli, brg_stok, brg_status, "brg_idUser"
      `;

      const result = await db.unsafe(query, [...values, brg_id]);

      return result[0] || null;

    } catch (err) {
      console.error(`Error mengedit barang dengan ID ${brg_id}:`, err);
      throw new Error(`Gagal mengedit barang dengan ID ${brg_id}.`);
    }
  },

  deleteBarang: async ({ brg_id }) => {
    try {
      await db`
        DELETE FROM barang WHERE brg_id = ${brg_id}
      `;
      return true;
    } catch (err) {
      console.error(`Error menghapus barang dengan ID ${brg_id}:`, err);
      throw new Error(`Gagal menghapus barang dengan ID ${brg_id}.`);
    }
  }
};

module.exports = barangService;
