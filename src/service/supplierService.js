const db = require("../config/db");

const supplierService = {
  getAllSuppliers: async () => {
    try {
      const result = await db.query(
        `SELECT
            sp_id,
            sp_nama,
            sp_contact,
            sp_kategori,
            sp_alamat
        FROM supplier`
      );
      return result.rows;
    } catch (err) {
      console.error("Error mengambil daftar supplier:", err);
      throw new Error("Gagal mengambil daftar supplier dari database.");
    }
  },

  getSupplierById: async ({ sp_id }) => {
    try {
      const result = await db.query(
        `SELECT
            sp_id,
            sp_nama,
            sp_contact,
            sp_kategori,
            sp_alamat
        FROM supplier
        WHERE sp_id = $1`,
        [sp_id]
      );
      return result.rows[0] || null;
    } catch (err) {
      console.error(`Error mengambil supplier dengan ID ${sp_id}:`, err);
      throw new Error(`Gagal mengambil supplier dengan ID ${sp_id}.`);
    }
  },

  getTotalSupplier: async () => {
    try {
      const result = await db.query(`
        SELECT COUNT(*) AS total_supplier FROM supplier
      `);
      return parseInt(result.rows[0].total_supplier) || 0;
    } catch (err) {
      console.error("Error mengambil daftar supplier:", err);
      throw new Error("Gagal mengambil daftar supplier dari database.");
    }
  },

  createSupplier: async ({ sp_nama, sp_contact, sp_kategori, sp_alamat }) => {
    try {
      const result = await db.query(
        `INSERT INTO supplier (sp_nama, sp_contact, sp_kategori, sp_alamat)
                VALUES ($1, $2, $3, $4)
                RETURNING sp_id, sp_nama, sp_contact, sp_kategori, sp_alamat`,
        [sp_nama, sp_contact, sp_kategori, sp_alamat]
      );
      return result.rows[0];
    } catch (err) {
      console.error("Error membuat supplier baru:", err);
      throw new Error("Gagal membuat supplier baru di database.");
    }
  },

  updateSupplier: async ({ sp_id, sp_nama, sp_contact, sp_kategori, sp_alamat }) => {
    try {
      const updates = [];
      const values = [sp_id];
      let paramCount = 2;

      if (sp_nama !== undefined) {
        updates.push(`sp_nama = $${paramCount++}`);
        values.push(sp_nama);
      }
      if (sp_contact !== undefined) {
        updates.push(`sp_contact = $${paramCount++}`);
        values.push(sp_contact);
      }
      if (sp_kategori !== undefined) {
        updates.push(`sp_kategori = $${paramCount++}`);
        values.push(sp_kategori);
      }
      if (sp_alamat !== undefined) {
        updates.push(`sp_alamat = $${paramCount++}`);
        values.push(sp_alamat);
      }

      if (updates.length === 0) {
        throw new Error("Tidak ada data yang diberikan untuk update.");
      }

      const query = `UPDATE supplier SET ${updates.join(', ')}
                     WHERE sp_id = $1
                     RETURNING sp_id, sp_nama, sp_contact, sp_kategori, sp_alamat`;

      const result = await db.query(query, values);
      return result.rows[0] || null;
    } catch (err) {
      console.error(`Error mengedit supplier dengan ID ${sp_id}:`, err);
      throw new Error(`Gagal mengedit supplier dengan ID ${sp_id}.`);
    }
  },

  deleteSupplier: async ({ sp_id }) => {
    try {
      await db.query(
        `DELETE FROM supplier
          WHERE sp_id = $1`,
        [sp_id]
      );
      return true;
    } catch (err) {
      console.error(`Error menghapus supplier dengan ID ${sp_id}:`, err);
      throw new Error(`Gagal menghapus supplier dengan ID ${sp_id}.`);
    }
  }
};

module.exports = supplierService;