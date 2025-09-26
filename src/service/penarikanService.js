const db = require("../config/db");

const penarikanService = {
  getAllPenarikan: async ({ pnr_idUser }) => {
    try {
      const result = await db`
        SELECT 
          pnr_id,
          pnr_tanggal,
          pnr_jumlah,
        FROM penarikan 
        WHERE "pnr_idUser" = ${pnr_idUser}
        ORDER BY pnr_tanggal ASC
      `;
      return result;
    } catch (err) {
      console.error("Error fetching all penarikan:", err);
      throw new Error("Failed to fetch penarikan from the database.");
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