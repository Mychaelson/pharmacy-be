const adminControllers = require("../controller/admin");
const fileUploader = require("../lib/uploader");
const { authorizedLoginAdmin } = require("../middleware/authorizeLoginAdmin");

const router = require("express").Router();

router.get("/", adminControllers.getAdmin);

// Input New Product
router.post(
  "/product",
  fileUploader({
    destinationFolder: "product",
    prefix: "PRODUCT",
    fileType: "image",
  }).array("product_image_file", 5),
  adminControllers.addProduct
);

// Input New Product Category
router.post("/product-category", adminControllers.addProductCategory);

// Get Product Category
router.get("/product-category", adminControllers.getAllProductCategory);

// Get Product
router.get("/product", adminControllers.getProduct);

// Edit Product
router.patch(
  "/product/:productId",
  authorizedLoginAdmin,
  adminControllers.editProduct
);

// Edit Product Images
router.put(
  "/product-images/:productId",
  fileUploader({
    destinationFolder: "product",
    prefix: "PRODUCT",
    fileType: "image",
  }).array("product_image_file", 5),
  adminControllers.editProductImages
);

// Delete Product
router.delete(
  "/product/:productId",
  authorizedLoginAdmin,
  adminControllers.deleteProduct
);

// Input Stock Status
router.post("/stock/status", adminControllers.addStockStatus);

// Input Stock
router.post("/stock", authorizedLoginAdmin, adminControllers.addStock);

// Get Product Stock History
router.get(
  "/stock-history/product/:productId",
  adminControllers.getProductStockHistory
);

// Serve User custom Order
router.post("/product/custom-order", adminControllers.addCustomOrder);

// Get Revenue
router.get("/revenue", adminControllers.getRevenue);

router.post("/accept-transaction", adminControllers.acceptTransaction);

router.post("/decline-transaction", adminControllers.declineTransaction);

router.post("/ask-for-delivery", adminControllers.askForDelivery);
module.exports = router;
