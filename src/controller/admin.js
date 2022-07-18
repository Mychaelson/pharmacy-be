const AdminService = require("../services/admin");

const adminControllers = {
  addProduct: async (req, res) => {
    try {
      const {
        nama_produk,
        nomor_obat,
        nomor_bpom,
        harga_jual,
        diskon,
        productCategoryId,
        satuan,
      } = req.body;
      const file = req.files;

      const serviceResult = await AdminService.addProduct(req.body, file);
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
  addProductCategory: async (req, res) => {
    try {
      const { kategori } = req.body;
      const serviceResult = await AdminService.addProductCategory(kategori);

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

  getAllProductCategory: async (req, res) => {
    try {
      const serviceResult = await AdminService.getAllProductCategory();

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

  getProduct: async (req, res) => {
    try {
      const serviceResult = await AdminService.getProductList(req.query);

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

  editProduct: async (req, res) => {
    try {
      const { productId } = req.params;
      const {
        nama_produk,
        nomor_obat,
        nomor_bpom,
        harga_jual,
        satuan,
        productCategoryId,
        diskon,
      } = req.body;

      const serviceResult = await AdminService.editProduct(req.body, productId);

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

  editProductImages: async (req, res) => {
    try {
      const { productId } = req.params;
      const file = req.files;

      const serviceResult = await AdminService.editProductImages(
        productId,
        file
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

  deleteProduct: async (req, res) => {
    try {
      const serviceResult = await AdminService.deleteProduct(
        req.params.productId
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

  addStockStatus: async (req, res) => {
    try {
      const { status } = req.body;

      const serviceResult = await AdminService.addStockStatus(status);
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

  addStock: async (req, res) => {
    try {
      const { exp_date, jumlah_stok, productId, price } = req.body;

      const serviceResult = await AdminService.addStock(req.body, req.admin.id);
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

  getProductStockHistory: async (req, res) => {
    try {
      const { productId } = req.params;

      const serviceResult = await AdminService.getProductStockHistory(
        productId,
        req.query
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

  addCustomOrder: async (req, res) => {
    try {
      const serviceResult = await AdminService.addCustomOrder(req.body);
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

module.exports = adminControllers;
