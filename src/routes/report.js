const ReportController = require("../controller/report");

const router = require("express").Router();

router.post("/get-transaction-count", ReportController.getTransactionCount);
router.get("/get-exp-product", ReportController.getExpProduct);
router.get("/get-today-transaction", ReportController.getTodayTransaction);
router.get("/get-today-stok", ReportController.getTodayStok);
router.post("/get-penjualan", ReportController.getPenjualan);
router.get("/get-today-revenue", ReportController.getTodayRevenue);
router.post("/get-profit", ReportController.getProfit);
router.post("/get-pembatalan", ReportController.getPembatalan);
router.post("/get-product-qty-sold", ReportController.getProductQuantitySold);
router.post("/get-product-viewed-count", ReportController.getItemViewedCount);
router.post("/get-product-sold-count", ReportController.getProductSoldCount);
router.post("/get-product-revenue", ReportController.getRevenuePerProduct);

module.exports = router;
