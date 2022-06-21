const authController = require("../controller/auth");
const { authorizedLoginUser } = require("../middleware/authorizeLoginUser");

const router = require("express").Router();

router.post("/register", authController.registerUser);
router.get("/verify/:token", authController.verifyUser);
router.post(
  "/resend-verification-email",
  authorizedLoginUser,
  authController.resendVerificationEmail
);

module.exports = router;
