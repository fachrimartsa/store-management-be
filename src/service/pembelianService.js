const db = require("../config/db");

const pembelianService = {
    getAllPembelian: async () => {
    try {
      const result = await db.query(
        `SELECT
            p.pbl_id,
            p.pbl_tanggal,
            b.brg_nama,
            s.sp_nama,
            p.pbl_jumlah,
            p.pbl_alamat,
            p.pbl_harga_beli,
            p.pbl_total
        FROM
            pembelian p
        JOIN
            barang b ON p.pbl_barang = b.brg_id
        JOIN
            supplier s ON p.pbl_supplier = s.sp_id
        ORDER BY p.pbl_tanggal ASC
        `
      );

      const formattedData = result.rows.map(row => {
        if (row.pbl_tanggal instanceof Date) {
          const date = row.pbl_tanggal;
          const yyyy = date.getFullYear();
          const mm = String(date.getMonth() + 1).padStart(2, '0');
          const dd = String(date.getDate()).padStart(2, '0');
          row.pbl_tanggal = `${yyyy}-${mm}-${dd}`;
        }
        if (typeof row.pbl_total === 'number') {
            row.pbl_total = row.pbl_total.toFixed(2);
        }
        if (typeof row.pbl_harga_beli === 'number') {
            row.pbl_harga_beli = row.pbl_harga_beli.toFixed(2);
        }
        return row;
      });

      return formattedData;
    } catch (err) {
      console.error("Error mengambil daftar pembelian:", err);
      throw new Error("Gagal mengambil daftar pembelian dari database.");
    }
  },

  getPembelianById: async ({ pbl_id }) => {
    try {
      const result = await db.query(
        `SELECT
            pbl_id,
            pbl_tanggal,
            pbl_barang,
            pbl_supplier,
            pbl_jumlah,
            pbl_alamat,
            pbl_harga_beli,
            pbl_total
        FROM pembelian
        WHERE pbl_id = $1`,
        [pbl_id]
      );
      return result.rows[0] || null;
    } catch (err) {
      console.error(`Error mengambil pembelian dengan ID ${pbl_id}:`, err);
      throw new Error(`Gagal mengambil pembelian dengan ID ${pbl_id}.`);
    }
  },

  getPembelianMonth: async () => {
    try {
      const result = await db.query(
        `SELECT 
            COALESCE(SUM(pbl_total), 0) AS total_bulan_ini
        FROM pembelian
        WHERE EXTRACT(MONTH FROM pbl_tanggal) = EXTRACT(MONTH FROM CURRENT_DATE)
          AND EXTRACT(YEAR FROM pbl_tanggal) = EXTRACT(YEAR FROM CURRENT_DATE)`
      );

      const total = parseFloat(result.rows[0].total_bulan_ini);
      return total;
    } catch (err) {
      console.error("Error mengambil total penjualan bulan ini:", err);
      throw err;
    }
  },

  createPembelian: async ({ pbl_tanggal, pbl_barang, pbl_supplier, pbl_jumlah, pbl_alamat, pbl_harga_beli, pbl_total }) => {
    try {
      const insertResult = await db.query(
        `INSERT INTO pembelian (pbl_tanggal, pbl_barang, pbl_supplier, pbl_jumlah, pbl_alamat, pbl_harga_beli, pbl_total)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *`,
        [pbl_tanggal, pbl_barang, pbl_supplier, pbl_jumlah, pbl_alamat, pbl_harga_beli, pbl_total]
      );

      await db.query(
        `UPDATE barang SET brg_stok = brg_stok + $1 WHERE brg_id = $2`,
        [pbl_jumlah, pbl_barang]
      );

      await db.query('COMMIT');

      return insertResult.rows[0];
    } catch (err) {
      console.error("Error membuat pembelian baru:", err);
      throw new Error("Gagal membuat pembelian baru di database.");
    }
  },

  updatePembelian: async ({ pbl_id, pbl_tanggal, pbl_barang, pbl_supplier, pbl_jumlah, pbl_alamat, pbl_harga_beli, pbl_total }) => {
    try {
      const updates = [];
      const values = [pbl_id];
      let paramCount = 2;

      if (pbl_tanggal !== undefined) {
        updates.push(`pbl_tanggal = $${paramCount++}`);
        values.push(pbl_tanggal);
      }
      if (pbl_barang !== undefined) {
        updates.push(`pbl_barang = $${paramCount++}`);
        values.push(pbl_barang);
      }
      if (pbl_supplier !== undefined) {
        updates.push(`pbl_supplier = $${paramCount++}`);
        values.push(pbl_supplier);
      }
      if (pbl_jumlah !== undefined) {
        updates.push(`pbl_jumlah = $${paramCount++}`);
        values.push(pbl_jumlah);
      }
      if (pbl_alamat !== undefined) {
        updates.push(`pbl_alamat = $${paramCount++}`);
        values.push(pbl_alamat);
      }
      if (pbl_harga_beli !== undefined) {
        updates.push(`pbl_harga_beli = $${paramCount++}`);
        values.push(pbl_harga_beli);
      }
      if (pbl_total !== undefined) {
        updates.push(`pbl_total = $${paramCount++}`);
        values.push(pbl_total);
      }

      if (updates.length === 0) {
        throw new Error("Tidak ada data yang diberikan untuk update.");
      }

      const query = `UPDATE pembelian SET ${updates.join(', ')}
                     WHERE pbl_id = $1
                     RETURNING pbl_id, pbl_tanggal, pbl_barang, pbl_supplier, pbl_jumlah, pbl_alamat, pbl_harga_beli, pbl_total`;

      const result = await db.query(query, values);
      return result.rows[0] || null;
    } catch (err) {
      console.error(`Error mengedit pembelian dengan ID ${pbl_id}:`, err);
      throw new Error(`Gagal mengedit pembelian dengan ID ${pbl_id}.`);
    }
  },

  deletePembelian: async ({ pbl_id }) => {
    try {
      const result = await db.query(
        `DELETE FROM pembelian
                WHERE pbl_id = $1`,
        [pbl_id]
      );
      return true;
    } catch (err) {
      console.error(`Error menghapus pembelian dengan ID ${pbl_id}:`, err);
      throw new Error(`Gagal menghapus pembelian dengan ID ${pbl_id}.`);
    }
  }
};

module.exports = pembelianService;