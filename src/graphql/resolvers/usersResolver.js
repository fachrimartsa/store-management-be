const usersService = require("../../service/usersService");

const usersResolver = {
  getUserById: async ({ usr_id }) => {
    try {
      return await usersService.getUserById({ usr_id });
    } catch (error) {
      console.error(`Error in getUserById resolver for ID ${brg_id}:`, error);
      throw new Error(`Failed to fetch user with ID ${brg_id}.`);
    }
  },
  loginUser: async ({ usr_username, usr_password }) => {
    try {
      return await usersService.loginUser({ usr_username, usr_password });
    } catch (error) {
      console.error("Error in loginUser resolver:", error);
      throw new Error("Failed to login.");
    }
  },
};

module.exports = usersResolver;