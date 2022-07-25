const ReportService = require("../services/report");

const ReportController = {
  getTransactionCount: async (req, res) => {
    try {
      const { stateOfDate } = req.body;
      const serviceResult = await ReportService.getTransactionCount(
        stateOfDate
      );

      if (!serviceResult.success) throw serviceResult;
      return res.status(serviceResult.statusCode || 200).json({
        message: serviceResult.message,
        result: serviceResult.data,
      });
    } catch (err) {
      console.log(err);
      return res.status(err.statusCode || 500).json({
        message: err.message,
      });
    }
  },

  getExpProduct: async (req, res) => {
    try {
      const serviceResult = await ReportService.getExpDateInfo();

      if (!serviceResult.success) throw serviceResult;
      return res.status(serviceResult.statusCode || 200).json({
        message: serviceResult.message,
        result: serviceResult.data,
      });
    } catch (err) {
      console.log(err);
      return res.status(err.statusCode || 500).json({
        message: err.message,
      });
    }
  },

  getTodayTransaction: async (req, res) => {
    try {
      const serviceResult = await ReportService.getTodayOrder();

      if (!serviceResult.success) throw serviceResult;
      return res.status(serviceResult.statusCode || 200).json({
        message: serviceResult.message,
        result: serviceResult.data,
      });
    } catch (err) {
      console.log(err);
      return res.status(err.statusCode || 500).json({
        message: err.message,
      });
    }
  },

  getTodayStok: async (req, res) => {
    try {
      const serviceResult = await ReportService.getTodayStok();

      if (!serviceResult.success) throw serviceResult;
      return res.status(serviceResult.statusCode || 200).json({
        message: serviceResult.message,
        result: serviceResult.data,
      });
    } catch (err) {
      console.log(err);
      return res.status(err.statusCode || 500).json({
        message: err.message,
      });
    }
  },

  getPenjualan: async (req, res) => {
    try {
      const { stateOfDate } = req.body;
      const serviceResult = await ReportService.getPenjualan(stateOfDate);

      if (!serviceResult.success) throw serviceResult;
      return res.status(serviceResult.statusCode || 200).json({
        message: serviceResult.message,
        result: serviceResult.data,
      });
    } catch (err) {
      console.log(err);
      return res.status(err.statusCode || 500).json({
        message: err.message,
      });
    }
  },

  getTodayRevenue: async (req, res) => {
    try {
      const serviceResult = await ReportService.getTodayRevenue();

      if (!serviceResult.success) throw serviceResult;
      return res.status(serviceResult.statusCode || 200).json({
        message: serviceResult.message,
        result: serviceResult.data,
      });
    } catch (err) {
      console.log(err);
      return res.status(err.statusCode || 500).json({
        message: err.message,
      });
    }
  },

  getProfit: async (req, res) => {
    try {
      const { stateOfDate } = req.body;
      const serviceResult = await ReportService.getProfit(stateOfDate);

      if (!serviceResult.success) throw serviceResult;
      return res.status(serviceResult.statusCode || 200).json({
        message: serviceResult.message,
        result: serviceResult.data,
      });
    } catch (err) {
      console.log(err);
      return res.status(err.statusCode || 500).json({
        message: err.message,
      });
    }
  },

  getPembatalan: async (req, res) => {
    try {
      const { stateOfDate } = req.body;
      const serviceResult = await ReportService.getPembatalan(stateOfDate);

      if (!serviceResult.success) throw serviceResult;
      return res.status(serviceResult.statusCode || 200).json({
        message: serviceResult.message,
        result: serviceResult.data,
      });
    } catch (err) {
      console.log(err);
      return res.status(err.statusCode || 500).json({
        message: err.message,
      });
    }
  },

  getProductQuantitySold: async (req, res) => {
    try {
      const { stateOfDate, productId } = req.body;
      const serviceResult = await ReportService.getProductQuantitySold(
        productId,
        stateOfDate
      );

      if (!serviceResult.success) throw serviceResult;
      return res.status(serviceResult.statusCode || 200).json({
        message: serviceResult.message,
        result: serviceResult.data,
      });
    } catch (err) {
      console.log(err);
      return res.status(err.statusCode || 500).json({
        message: err.message,
      });
    }
  },

  getItemViewedCount: async (req, res) => {
    try {
      const { stateOfDate, productId } = req.body;
      const serviceResult = await ReportService.getItemsViewCount(
        productId,
        stateOfDate
      );

      if (!serviceResult.success) throw serviceResult;
      return res.status(serviceResult.statusCode || 200).json({
        message: serviceResult.message,
        result: serviceResult.data,
      });
    } catch (err) {
      console.log(err);
      return res.status(err.statusCode || 500).json({
        message: err.message,
      });
    }
  },

  getProductSoldCount: async (req, res) => {
    try {
      const { stateOfDate, productId } = req.body;
      const serviceResult = await ReportService.getItemsSoldCOunt(
        productId,
        stateOfDate
      );

      if (!serviceResult.success) throw serviceResult;
      return res.status(serviceResult.statusCode || 200).json({
        message: serviceResult.message,
        result: serviceResult.data,
      });
    } catch (err) {
      console.log(err);
      return res.status(err.statusCode || 500).json({
        message: err.message,
      });
    }
  },

  getRevenuePerProduct: async (req, res) => {
    try {
      const { stateOfDate, productId } = req.body;
      const serviceResult = await ReportService.getRevenuePerProduct(
        productId,
        stateOfDate
      );

      if (!serviceResult.success) throw serviceResult;
      return res.status(serviceResult.statusCode || 200).json({
        message: serviceResult.message,
        result: serviceResult.data,
      });
    } catch (err) {
      console.log(err);
      return res.status(err.statusCode || 500).json({
        message: err.message,
      });
    }
  },
};

module.exports = ReportController;
