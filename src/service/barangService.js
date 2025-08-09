const db = require("../config/db");

const barangService = {
  getBarang: async () => {
    try {
      const barang = await sql`
        SELECT brg_id, brg_nama, brg_kategori, brg_harga_beli, brg_harga_jual, brg_stok, brg_status
        FROM barang;
      `;
      return barang;
    } catch (error) {
      console.error('Error fetching barang:', error);
      throw new Error('Failed to fetch barang');
    }
  },
  getBarangById: async ({ brg_id }) => {
    try {
      const result = await db.query(
        `SELECT
            brg_id,
            brg_nama,
            brg_kategori,
            brg_harga_beli,
            brg_harga_jual,
            brg_stok,
            brg_status
        FROM barang
        WHERE brg_id = $1`,
        [brg_id]
      );
      return result.rows[0] || null;
    } catch (err) {
      console.error(`Error mengambil barang dengan ID ${brg_id}:`, err);
      throw new Error(`Gagal mengambil barang dengan ID ${brg_id}.`);
    }
  },

  getTotalStok: async () => {
    try {
      const result = await db.query(`
        SELECT SUM(brg_stok) AS total_stok FROM barang
      `);
      return result.rows[0].total_stok || 0;
    } catch (err) {
      console.error("Error mengambil total stok:", err);
      throw new Error("Gagal mengambil total stok dari database.");
    }
  },

  createBarang: async ({ brg_nama, brg_kategori, brg_harga_beli, brg_harga_jual, brg_stok, brg_status }) => {
    try {
      const result = await db.query(
        `INSERT INTO barang (brg_nama, brg_kategori, brg_harga_beli, brg_harga_jual, brg_stok, brg_status)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING brg_id, brg_nama, brg_kategori, brg_harga_beli, brg_harga_jual, brg_stok, brg_status`,
        [brg_nama, brg_kategori, brg_harga_beli, brg_harga_jual, brg_stok, brg_status]
      );
      return result.rows[0];
    } catch (err) {
      console.error("Error membuat barang baru:", err);
      throw new Error("Gagal membuat barang baru di database.");
    }
  },
  updateBarang: async ({ brg_id, brg_nama, brg_kategori, brg_harga_beli, brg_harga_jual, brg_stok, brg_status }) => {
    try {
      const updates = [];
      const values = [brg_id];
      let paramCount = 2;

      if (brg_nama !== undefined) {
        updates.push(`brg_nama = $${paramCount++}`);
        values.push(brg_nama);
      }
      if (brg_kategori !== undefined) {
        updates.push(`brg_kategori = $${paramCount++}`);
        values.push(brg_kategori);
      }
      if (brg_harga_beli !== undefined) {
        updates.push(`brg_harga_beli = $${paramCount++}`);
        values.push(brg_harga_beli);
      }
      if (brg_harga_jual !== undefined) {
        updates.push(`brg_harga_jual = $${paramCount++}`);
        values.push(brg_harga_jual);
      }
      if (brg_stok !== undefined) {
        updates.push(`brg_stok = $${paramCount++}`);
        values.push(brg_stok);
      }
      if (brg_status !== undefined) {
        updates.push(`brg_status = $${paramCount++}`);
        values.push(brg_status);
      }

      if (updates.length === 0) {
        throw new Error("Tidak ada data yang diberikan untuk update.");
      }

      const query = `UPDATE barang SET ${updates.join(', ')}
                     WHERE brg_id = $1
                     RETURNING brg_id, brg_nama, brg_kategori, brg_harga_beli, brg_harga_jual, brg_stok, brg_status`;

      const result = await db.query(query, values);
      return result.rows[0] || null;
    } catch (err) {
      console.error(`Error mengedit barang dengan ID ${brg_id}:`, err);
      throw new Error(`Gagal mengedit barang dengan ID ${brg_id}.`);
    }
  },
  deleteBarang: async ({ brg_id }) => {
    try {
        await db.query(
        `DELETE FROM barang
        WHERE brg_id = $1`,
        [brg_id]
      );
      return true;
    } catch (err) {
      console.error(`Error menghapus barang dengan ID ${brg_id}:`, err);
      throw new Error(`Gagal menghapus barang dengan ID ${brg_id}.`);
    }
  }
};

module.exports = barangService;