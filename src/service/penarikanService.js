const db = require("../config/db");

const penarikanService = {
  getAllPenarikan: async ({ pnr_idUser }) => {
    try {
      const result = await db`
        SELECT 
          pnr_id,
          pnr_tanggal,
          pnr_jumlah
        FROM penarikan 
        WHERE "pnr_idUser" = ${pnr_idUser}
        ORDER BY pnr_tanggal ASC
      `;

      const formattedData = result.map(row => {
        if (row.pnr_tanggal instanceof Date) {
          const date = row.pnr_tanggal;
          const yyyy = date.getFullYear();
          const mm = String(date.getMonth() + 1).padStart(2, '0');
          const dd = String(date.getDate()).padStart(2, '0');
          row.pnr_tanggal = `${yyyy}-${mm}-${dd}`;
        }
        if (typeof row.pnr_jumlah === 'number') {
          row.pnr_jumlah = row.pnr_jumlah.toFixed(2);
        }
  
        return row;
      });

      return formattedData;
    } catch (err) {
      console.error("Error fetching all penarikan:", err);
      throw new Error("Failed to fetch penarikan from the database.");
    }
  },

  getPenarikanMonth: async ({ pnr_idUser }) => {
    try {
      const result = await db`
        SELECT 
          COALESCE(SUM(pnr_jumlah), 0) AS total_bulan_ini
        FROM penarikan
        WHERE EXTRACT(MONTH FROM pnr_tanggal) = EXTRACT(MONTH FROM CURRENT_DATE)
          AND EXTRACT(YEAR FROM pnr_tanggal) = EXTRACT(YEAR FROM CURRENT_DATE)
          AND "pnr_idUser" = ${pnr_idUser}
      `;
      return parseFloat(result[0]?.total_bulan_ini || 0);
    } catch (err) {
      console.error("Error mengambil total penarikan bulan ini:", err);
      throw err;
    }
  },

  createPenarikan: async ({ pnr_idUser, pnr_tanggal, pnr_jumlah }) => {
    try {
      const result = await db`
        INSERT INTO penarikan ( "pnr_idUser", pnr_tanggal, pnr_jumlah)
        VALUES (${pnr_idUser}, ${pnr_tanggal}, ${pnr_jumlah})
        RETURNING *
      `;
      
      return result[0];
    } catch (err) {
      console.error("Error creating new penarikan:", err);
      throw new Error("Failed to create new penarikan in the database.");
    }
  },
};

module.exports = penarikanService;