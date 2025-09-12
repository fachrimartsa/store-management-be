const db = require("../config/db");

const detailPenjualanService = {
  getAllDetail: async ({ dtl_idUser }) => {
    try {
      const result = await db`
        SELECT 
          dtl_id,
          pjl_id,
          brg_id,
          dtl_jumlah,
          dtl_idUser
        FROM detail_penjualan 
        WHERE "dtl_idUser" = ${dtl_idUser}
        ORDER BY dtl_id ASC
      `;
      return result;
    } catch (err) {
      console.error("Error fetching all sales details:", err);
      throw new Error("Failed to fetch sales details from the database.");
    }
  },

  getDetailPenjualan: async ({ pjl_id }) => {
    try {
      const result = await db`
        SELECT 
          dtl_id,
          pjl_id,
          brg_id,
          dtl_jumlah,
          dtl_idUser
        FROM detail_penjualan 
        WHERE "pjl_id" = ${pjl_id}
        ORDER BY dtl_id ASC
      `;
      return result;
    } catch (err) {
      console.error("Error fetching sales details by pjl_id:", err);
      throw new Error("Failed to fetch sales details for the specified sale.");
    }
  },

  createDetail: async ({ dtl_id, pjl_id, brg_id, dtl_jumlah, dtl_idUser }) => {
    try {
      const result = await db`
        INSERT INTO detail_penjualan (dtl_id, pjl_id, brg_id, dtl_jumlah, "dtl_idUser")
        VALUES (${dtl_id}, ${pjl_id}, ${brg_id}, ${dtl_jumlah}, ${dtl_idUser})
        RETURNING *
      `;
      return result[0];
    } catch (err) {
      console.error("Error creating new sales detail:", err);
      throw new Error("Failed to create new sales detail in the database.");
    }
  },
};

module.exports = detailPenjualanService;