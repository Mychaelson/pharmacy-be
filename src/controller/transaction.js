const TransactionService = require("../services/transaction");

const transactionControllers = {
  getAllTransaction: async (req, res) => {
    try {
      const serviceResult = await TransactionService.getAllTransaction(
        req.query
      );
      if (!serviceResult.success) throw serviceResult;
      return res.status(serviceResult.statusCode || 200).json({
        message: serviceResult.message,
        result: serviceResult.data,
      });
    } catch (err) {
      return res.status(err.statusCode || 500).json({
        message: err.message,
      });
    }
  },
  createTransaction: async (req, res) => {
    try {
      const user_id = req.user.id;

      const { cartId } = req.body;

      const serviceResult = await TransactionService.createTransaction(
        req.body,
        cartId,
        user_id
      );

      if (!serviceResult.success) throw serviceResult;
      return res.status(serviceResult.statusCode).json({
        message: serviceResult.message,
        data: serviceResult.data,
      });
    } catch (err) {
      return res.status(err.statusCode || 500).json({
        message: err.message,
      });
    }
  },

  uploadResepDokter: async (req, res) => {
    try {
      const user_id = req.user.id;
      const serviceResult = await TransactionService.uploadResepDokter(
        req.file,
        user_id
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

  getAllPaymentMethod: async (req, res) => {
    try {
      const serviceResult = await TransactionService.getAllPaymentMethod();
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

  getPaymentMethodById: async (req, res) => {
    try {
      const { id } = req.body;
      const serviceResult = await TransactionService.getPaymentMethodById(id);
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

  uploadProofOfPayment: async (req, res) => {
    try {
      const serviceResult = await TransactionService.uploadProofOfPayment(
        req.body,
        req.file
      );

      if (!serviceResult.success) throw serviceResult;
      return res.status(serviceResult.statusCode || 201).json({
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

  getTransactionById: async (req, res) => {
    try {
      const serviceResult = await TransactionService.getTransactionById(
        req.params.transactionId
      );

      if (!serviceResult.success) throw serviceResult;
      return res.status(serviceResult.statusCode || 201).json({
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

module.exports = transactionControllers;
