const db = require("../config/db");

const penjualanService = {
  getAllPenjualan: async ({ pjl_idUser }) => {
    try {
      const result = await db`
        SELECT
          p.pjl_id,
          p.pjl_tanggal,
          b.brg_nama,
          p.pjl_jumlah,
          p.pjl_platform,
          p.pjl_alamat,
          p.pjl_harga_jual,
          p.pjl_total,
          p.pjl_profit
          p.pjl_idUser
        FROM penjualan p
        JOIN barang b ON p.pjl_barang = b.brg_id
        WHERE p."pjl_idUser" = ${pjl_idUser}
        ORDER BY p.pjl_tanggal ASC
      `;

      const formattedData = result.map(row => {
        if (row.pjl_tanggal instanceof Date) {
          const date = row.pjl_tanggal;
          const yyyy = date.getFullYear();
          const mm = String(date.getMonth() + 1).padStart(2, '0');
          const dd = String(date.getDate()).padStart(2, '0');
          row.pjl_tanggal = `${yyyy}-${mm}-${dd}`;
        }
        if (typeof row.pjl_total === 'number') row.pjl_total = row.pjl_total.toFixed(2);
        if (typeof row.pjl_harga_jual === 'number') row.pjl_harga_jual = row.pjl_harga_jual.toFixed(2);
        if (typeof row.pjl_profit === 'number') row.pjl_profit = row.pjl_profit.toFixed(2);
        return row;
      });

      return formattedData;
    } catch (err) {
      console.error("Error mengambil daftar penjualan:", err);
      throw new Error("Gagal mengambil daftar penjualan dari database.");
    }
  },

  getPenjualanMonth: async () => {
    try {
      const result = await db`
        SELECT 
          COALESCE(SUM(pjl_total), 0) AS total_bulan_ini
        FROM penjualan
        WHERE EXTRACT(MONTH FROM pjl_tanggal) = EXTRACT(MONTH FROM CURRENT_DATE)
          AND EXTRACT(YEAR FROM pjl_tanggal) = EXTRACT(YEAR FROM CURRENT_DATE)
      `;
      return parseFloat(result[0]?.total_bulan_ini || 0);
    } catch (err) {
      console.error("Error mengambil total penjualan bulan ini:", err);
      throw err;
    }
  },

  getProfitMonth: async () => {
    try {
      const result = await db`
        SELECT 
          COALESCE(SUM(pjl_profit), 0) AS total_bulan_ini
        FROM penjualan
        WHERE EXTRACT(MONTH FROM pjl_tanggal) = EXTRACT(MONTH FROM CURRENT_DATE)
          AND EXTRACT(YEAR FROM pjl_tanggal) = EXTRACT(YEAR FROM CURRENT_DATE)
      `;
      return parseFloat(result[0]?.total_bulan_ini || 0);
    } catch (err) {
      console.error("Error mengambil total profit bulan ini:", err);
      throw err;
    }
  },

  getPenjualanById: async ({ pjl_id }) => {
    try {
      const result = await db`
        SELECT
          pjl_id,
          pjl_tanggal,
          pjl_barang,
          pjl_jumlah,
          pjl_platform,
          pjl_alamat,
          pjl_harga_jual,
          pjl_total
        FROM penjualan
        WHERE pjl_id = ${pjl_id}
      `;
      return result[0] || null;
    } catch (err) {
      console.error(`Error mengambil penjualan dengan ID ${pjl_id}:`, err);
      throw new Error(`Gagal mengambil penjualan dengan ID ${pjl_id}.`);
    }
  },

  createPenjualan: async ({ pjl_tanggal, pjl_barang, pjl_jumlah, pjl_platform, pjl_telephone, pjl_harga_jual, pjl_total, pjl_profit, pjl_idUser }) => {
    try {
      const result = await db`
        INSERT INTO penjualan (pjl_tanggal, pjl_barang, pjl_jumlah, pjl_platform, pjl_telephone, pjl_harga_jual, pjl_total, pjl_profit, "pjl_idUser")
        VALUES (${pjl_tanggal}, ${pjl_barang}, ${pjl_jumlah}, ${pjl_platform}, ${pjl_telephone}, ${pjl_harga_jual}, ${pjl_total}, ${pjl_profit}, ${pjl_idUser})
        RETURNING *
      `;

      await db`
        UPDATE barang SET brg_stok = brg_stok - ${pjl_jumlah} WHERE brg_id = ${pjl_barang}
      `;

      return result[0];
    } catch (err) {
      console.error("Error membuat penjualan baru:", err);
      throw new Error("Gagal membuat penjualan baru di database.");
    }
  },

  updatePenjualan: async ({ pjl_id, pjl_tanggal, pjl_barang, pjl_jumlah, pjl_platform, pjl_telephone, pjl_harga_jual, pjl_total, pjl_idUser}) => {
    try {
      const updates = [];

      if (pjl_tanggal !== undefined) updates.push(`pjl_tanggal = ${pjl_tanggal}`);
      if (pjl_barang !== undefined) updates.push(`pjl_barang = ${pjl_barang}`);
      if (pjl_jumlah !== undefined) updates.push(`pjl_jumlah = ${pjl_jumlah}`);
      if (pjl_platform !== undefined) updates.push(`pjl_platform = ${pjl_platform}`);
      if (pjl_telephone !== undefined) updates.push(`pjl_telehpone = ${pjl_telephone}`);
      if (pjl_harga_jual !== undefined) updates.push(`pjl_harga_jual = ${pjl_harga_jual}`);
      if (pjl_total !== undefined) updates.push(`pjl_total = ${pjl_total}`);
      if (pjl_idUser !== undefined) updates.push(`"pjl_idUser" = ${pjl_idUser}`);

      if (updates.length === 0) throw new Error("Tidak ada data yang diberikan untuk update.");

      const query = `
        UPDATE penjualan SET ${updates.join(", ")}
        WHERE pjl_id = ${pjl_id}
        RETURNING pjl_id, pjl_tanggal, pjl_barang, pjl_jumlah, pjl_platform, pjl_alamat, pjl_harga_jual, pjl_total, "pjl_idUser"
      `;

      const result = await db.unsafe(query);
      return result[0] || null;
    } catch (err) {
      console.error(`Error mengedit penjualan dengan ID ${pjl_id}:`, err);
      throw new Error(`Gagal mengedit penjualan dengan ID ${pjl_id}.`);
    }
  },

  deletePenjualan: async ({ pjl_id }) => {
    try {
      await db`
        DELETE FROM penjualan WHERE pjl_id = ${pjl_id}
      `;
      return true;
    } catch (err) {
      console.error(`Error menghapus penjualan dengan ID ${pjl_id}:`, err);
      throw new Error(`Gagal menghapus penjualan dengan ID ${pjl_id}.`);
    }
  }
};

module.exports = penjualanService;
