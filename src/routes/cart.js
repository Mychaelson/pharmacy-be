const { cartController } = require("../controller");
const { authorizedLoginUser } = require("../middleware/authorizeLoginUser");

const router = require("express").Router();

router.post("/add-to-cart", authorizedLoginUser, cartController.addToCarts);
router.get("/get-cart", authorizedLoginUser, cartController.getCartData);
router.patch(
  "/edit-quantity/:id",
  authorizedLoginUser,
  cartController.editCartQuantity
);
router.delete(
  "/delete-cart/:id",
  authorizedLoginUser,
  cartController.deleteCart
);
router.post("/get-cart-id", cartController.getCartById);

module.exports = router;
