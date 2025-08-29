const db = require("../config/db");

const pengeluaranService = {
  getAllPengeluaran: async ({ pgl_idUser }) => {
    try {
      const result = await db`
        SELECT
          pgl_id,
          pgl_tanggal,
          pgl_barang,
          pgl_jumlah,
          pgl_total
        FROM pengeluaran
        WHERE "pgl_idUser" = ${pgl_idUser}
        ORDER BY pgl_tanggal ASC
      `;

      const formattedData = result.map(row => {
        if (row.pgl_tanggal instanceof Date) {
          const date = row.pgl_tanggal;
          const yyyy = date.getFullYear();
          const mm = String(date.getMonth() + 1).padStart(2, '0');
          const dd = String(date.getDate()).padStart(2, '0');
          row.pgl_tanggal = `${yyyy}-${mm}-${dd}`;
        }
        if (typeof row.pgl_total === 'number') {
          row.pgl_total = row.pgl_total.toFixed(2);
        }
        return row;
      });

      return formattedData;
    } catch (err) {
      console.error("Error fetching all pengeluaran from DB:", err);
      throw err;
    }
  },

  getPengeluaranById: async ({ pgl_id }) => {
    try {
      const result = await db`
        SELECT
          pgl_id,
          pgl_tanggal,
          pgl_barang,
          pgl_jumlah,
          pgl_total
        FROM pengeluaran
        WHERE pgl_id = ${pgl_id}
      `;

      if (result.length === 0) return null;

      const row = result[0];
      if (row.pgl_tanggal instanceof Date) {
        const date = row.pgl_tanggal;
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        row.pgl_tanggal = `${yyyy}-${mm}-${dd}`;
      }
      if (typeof row.pgl_total === 'number') {
        row.pgl_total = row.pgl_total.toFixed(2);
      }
      return row;
    } catch (err) {
      console.error(`Error fetching pengeluaran by ID ${pgl_id} from DB:`, err);
      throw err;
    }
  },

  getPengeluaranMonth: async ({ pgl_idUser }) => {
    try {
      const result = await db`
        SELECT
          COALESCE(SUM(pgl_total), 0) AS total_bulan_ini
        FROM pengeluaran
        WHERE EXTRACT(MONTH FROM pgl_tanggal) = EXTRACT(MONTH FROM CURRENT_DATE)
          AND EXTRACT(YEAR FROM pgl_tanggal) = EXTRACT(YEAR FROM CURRENT_DATE)
          AND "pgl_idUser" = ${pgl_idUser}
      `;

      return parseFloat(result[0]?.total_bulan_ini || 0);
    } catch (err) {
      console.error("Error mengambil total pengeluaran bulan ini:", err);
      throw err;
    }
  },

  createPengeluaran: async ({ pgl_tanggal, pgl_barang, pgl_jumlah, pgl_total, pgl_idUser }) => {
    try {
      const result = await db`
        INSERT INTO pengeluaran (pgl_tanggal, pgl_barang, pgl_jumlah, pgl_total, "pgl_idUser")
        VALUES (${pgl_tanggal}, ${pgl_barang}, ${pgl_jumlah}, ${pgl_total}, ${pgl_idUser})
        RETURNING pgl_id, pgl_tanggal, pgl_barang, pgl_jumlah, pgl_total, "pgl_idUser"
      `;
      return result[0];
    } catch (err) {
      console.error("Error membuat pengeluaran baru:", err);
      throw new Error("Gagal membuat pengeluaran baru di database.");
    }
  },

  updatePengeluaran: async ({ pgl_id, pgl_tanggal, pgl_barang, pgl_jumlah, pgl_total, pgl_idUser }) => {
    try {
      const updates = [];

      if (pgl_tanggal !== undefined) {
        updates.push(`pgl_tanggal = ${pgl_tanggal}`);
      }
      if (pgl_barang !== undefined) {
        updates.push(`pgl_barang = ${pgl_barang}`);
      }
      if (pgl_jumlah !== undefined) {
        updates.push(`pgl_jumlah = ${pgl_jumlah}`);
      }
      if (pgl_total !== undefined) {
        updates.push(`pgl_total = ${pgl_total}`);
      }
      if (pgl_idUser !== undefined) {
        updates.push(`"pgl_idUser" = ${pgl_idUser}`);
      }

      if (updates.length === 0) {
        throw new Error("Tidak ada data yang diberikan untuk update.");
      }

      const query = `
        UPDATE pengeluaran SET ${updates.join(", ")}
        WHERE pgl_id = ${pgl_id}
        RETURNING pgl_id, pgl_tanggal, pgl_barang, pgl_jumlah, pgl_total, "pgl_idUser"
      `;

      const result = await db.unsafe(query);
      return result[0] || null;
    } catch (err) {
      console.error(`Error mengedit pengeluaran dengan ID ${pgl_id}:`, err);
      throw new Error(`Gagal mengedit pengeluaran dengan ID ${pgl_id}.`);
    }
  },

  deletePengeluaran: async ({ pgl_id }) => {
    try {
      await db`
        DELETE FROM pengeluaran WHERE pgl_id = ${pgl_id}
      `;
      return true;
    } catch (err) {
      console.error(`Error menghapus pengeluaran dengan ID ${pgl_id}:`, err);
      throw new Error(`Gagal menghapus pengeluaran dengan ID ${pgl_id}.`);
    }
  }
};

module.exports = pengeluaranService;
