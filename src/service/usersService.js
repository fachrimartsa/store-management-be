const db = require("../config/db");

const usersService = {
  getUserById: async ({ usr_id }) => {
    try {
      const result = await db`
        SELECT usr_id, usr_toko, usr_username
        FROM users
        WHERE usr_id = ${usr_id}
      `;
      return result[0] || null; 
    } catch (err) {
      console.error(`Error mengambil user dengan ID ${usr_id}:`, err);
      throw new Error(`Gagal mengambil user dengan ID ${usr_id}.`);
    }
  },

  loginUser: async ({ usr_username, usr_password }) => {
    try {
        const result = await db`
        SELECT * FROM users WHERE usr_username = ${usr_username} AND usr_password = ${usr_password}
      `;
        return result[0] || null;
    } catch (err) {
      console.error("Error login:", err);
      throw new Error("Gagal login di database.");
    }
  },
};

module.exports = usersService;
