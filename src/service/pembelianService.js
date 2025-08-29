const db = require("../config/db");

const pembelianService = {
  getAllPembelian: async ({ pbl_idUser }) => {
    try {
      const result = await db`
        SELECT
          p.pbl_id,
          p.pbl_tanggal,
          b.brg_nama,
          s.sp_nama,
          p.pbl_jumlah,
          p.pbl_harga_beli,
          p.pbl_total
        FROM pembelian p
        JOIN barang b ON p.pbl_barang = b.brg_id
        JOIN supplier s ON p.pbl_supplier = s.sp_id
        WHERE p."pbl_idUser" = ${pbl_idUser}
        ORDER BY p.pbl_tanggal ASC
      `;

      const formattedData = result.map(row => {
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
      const result = await db`
        SELECT
          pbl_id,
          pbl_tanggal,
          pbl_barang,
          pbl_supplier,
          pbl_jumlah,
          pbl_harga_beli,
          pbl_total
        FROM pembelian
        WHERE pbl_id = ${pbl_id}
      `;
      return result[0] || null;
    } catch (err) {
      console.error(`Error mengambil pembelian dengan ID ${pbl_id}:`, err);
      throw new Error(`Gagal mengambil pembelian dengan ID ${pbl_id}.`);
    }
  },

  getPembelianMonth: async ({ pbl_idUser }) => {
    try {
      const result = await db`
        SELECT 
          COALESCE(SUM(pbl_total), 0) AS total_bulan_ini
        FROM pembelian
        WHERE EXTRACT(MONTH FROM pbl_tanggal) = EXTRACT(MONTH FROM CURRENT_DATE)
        AND EXTRACT(YEAR FROM pbl_tanggal) = EXTRACT(YEAR FROM CURRENT_DATE)
        AND "pbl_idUser" = ${pbl_idUser}
      `;
      return parseFloat(result[0]?.total_bulan_ini || 0);
    } catch (err) {
      console.error("Error mengambil total penjualan bulan ini:", err);
      throw err;
    }
  },

  createPembelian: async ({ pbl_tanggal, pbl_barang, pbl_supplier, pbl_jumlah, pbl_harga_beli, pbl_total, pbl_idUser }) => {
    try {
      const insertResult = await db`
        INSERT INTO pembelian (pbl_tanggal, pbl_barang, pbl_supplier, pbl_jumlah, pbl_harga_beli, pbl_total, "pbl_idUser")
        VALUES (${pbl_tanggal}, ${pbl_barang}, ${pbl_supplier}, ${pbl_jumlah}, ${pbl_harga_beli}, ${pbl_total}, ${pbl_idUser})
        RETURNING *
      `;

      await db`
        UPDATE barang SET brg_stok = brg_stok + ${pbl_jumlah} WHERE brg_id = ${pbl_barang}
      `;

      return insertResult[0];
    } catch (err) {
      console.error("Error membuat pembelian baru:", err);
      throw new Error("Gagal membuat pembelian baru di database.");
    }
  },

  updatePembelian: async ({ pbl_id, pbl_tanggal, pbl_barang, pbl_supplier, pbl_jumlah, pbl_harga_beli, pbl_total, pbl_idUser }) => {
    try {
      const updates = [];

      if (pbl_tanggal !== undefined) {
        updates.push(`pbl_tanggal = ${pbl_tanggal}`);
      }
      if (pbl_barang !== undefined) {
        updates.push(`pbl_barang = ${pbl_barang}`);
      }
      if (pbl_supplier !== undefined) {
        updates.push(`pbl_supplier = ${pbl_supplier}`);
      }
      if (pbl_jumlah !== undefined) {
        updates.push(`pbl_jumlah = ${pbl_jumlah}`);
      }
      if (pbl_harga_beli !== undefined) {
        updates.push(`pbl_harga_beli = ${pbl_harga_beli}`);
      }
      if (pbl_total !== undefined) {
        updates.push(`pbl_total = ${pbl_total}`);
      }
      if (pbl_idUser !== undefined) {
        updates.push(`"pbl_idUser" = ${pbl_idUser}`);
      }

      if (updates.length === 0) {
        throw new Error("Tidak ada data yang diberikan untuk update.");
      }

      const query = `
        UPDATE pembelian SET ${updates.join(", ")}
        WHERE pbl_id = ${pbl_id}
        RETURNING pbl_id, pbl_tanggal, pbl_barang, pbl_supplier, pbl_jumlah, pbl_alamat, pbl_harga_beli, pbl_total, "pbl_idUser"
      `;

      const result = await db.unsafe(query);
      return result[0] || null;
    } catch (err) {
      console.error(`Error mengedit pembelian dengan ID ${pbl_id}:`, err);
      throw new Error(`Gagal mengedit pembelian dengan ID ${pbl_id}.`);
    }
  },

  deletePembelian: async ({ pbl_id }) => {
    try {
      await db`
        DELETE FROM pembelian WHERE pbl_id = ${pbl_id}
      `;
      return true;
    } catch (err) {
      console.error(`Error menghapus pembelian dengan ID ${pbl_id}:`, err);
      throw new Error(`Gagal menghapus pembelian dengan ID ${pbl_id}.`);
    }
  }
};

module.exports = pembelianService;
