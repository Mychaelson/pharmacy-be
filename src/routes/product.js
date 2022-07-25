const productControllers = require("../controller/product");
const { authorizedLoginUser } = require("../middleware/authorizeLoginUser");

const router = require("express").Router();

// Get Popular Product
router.get("/popular", productControllers.getPopularProduct);
// Get Product With Discount
router.get("/discount", productControllers.getProductWithDiscount);
router.get("/product-name", productControllers.getAllProductName);
router.get("/:productId", productControllers.getProduct);

router.get("/", productControllers.getAllProduct);

router.post(
  "/record-user-product",
  authorizedLoginUser,
  productControllers.recordUserProduct
);

// Get Product By Category
router.get("/category/:categoryId", productControllers.getProductByCategory);

module.exports = router;
