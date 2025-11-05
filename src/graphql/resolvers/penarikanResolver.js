const penarikanService = require("../../service/penarikanService");

const penarikanResolver = {
    getAllPenarikan: async ({ pnr_idUser }) => {
        try {
        return await penarikanService.getAllPenarikan({ pnr_idUser });
        } catch (error) {
        console.error("Error in getAllPenarikan resolver:", error);
        throw new Error("Failed to fetch penarikan records.");
        }
    },
    getPenarikanMonth: async ({ pnr_idUser }) => {
      try {
        return await penarikanService.getPenarikanMonth({ pnr_idUser });
      } catch (error) {
        console.error("Error in getPenarikanMonth resolver:", error);
        throw new Error("Failed to fetch total penarikan.");
      }
    },
    createPenarikan: async ({ pnr_idUser, pnr_tanggal, pnr_jumlah }) => {
      try {
        return await penarikanService.createPenarikan({ pnr_idUser, pnr_tanggal, pnr_jumlah });
      } catch (error) {
        console.error("Error in createPenarikan resolver:", error);
        throw new Error("Failed to create new penarikan record.");
      }
    },
};

module.exports = penarikanResolver;