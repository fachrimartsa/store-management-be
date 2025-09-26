const detailpenjualanService = require("../../service/detailpenjualanService");

const detailpenjualanResolver = {
    getAllDetail: async ({ dtl_idUser }) => {
        try {
        return await detailpenjualanService.getAllDetail({ dtl_idUser });
        } catch (error) {
        console.error("Error in getAllDetail resolver:", error);
        throw new Error("Failed to fetch sales detail records.");
        }
    },
    getDetailPenjualan: async ({ pjl_id }) => {
        try {
        return await detailpenjualanService.getDetailPenjualan({ pjl_id });
        } catch (error) {
        console.error("Error in getDetailPenjualan resolver:", error);
        throw new Error("Failed to fetch sales detail records.");
        }
    },
    createDetail: async ({ pjl_id, brg_id, dtl_jumlah, dtl_idUser }) => {
      try {
        return await detailpenjualanService.createDetail({ pjl_id, brg_id, dtl_jumlah, dtl_idUser });
      } catch (error) {
        console.error("Error in createDetailsss resolver:", error);
        throw new Error("Failed to create new sales detail record.");
      }
    },
};

module.exports = detailpenjualanResolver;