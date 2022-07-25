const authController = require("../controller/auth");
const { authorizedLoginUser } = require("../middleware/authorizeLoginUser");
const { authorizedLoginAdmin } = require("../middleware/authorizeLoginAdmin");

const router = require("express").Router();

// Register User
router.post("/register", authController.registerUser);

// register router untuk admin
router.post("/admin/register", authController.registerAdmin);

// login router untuk admin
router.post("/admin/login", authController.loginAdmin);

// keep login router untuk admin
router.get(
  "/admin/refresh-token",
  authorizedLoginAdmin,
  authController.keepLoginAdmin
);

// Verify User
router.get("/verify/:token", authController.verifyUser);

// Resend Verification
router.post(
  "/resend-verification-email",
  authorizedLoginUser,
  authController.resendVerificationEmail
);

// Login User
router.post("/login", authController.loginUser);

// Keep Login User
router.get("/refresh-token", authorizedLoginUser, authController.keepLoginUser);

router.post(
  "/change-password",
  authorizedLoginUser,
  authController.changePassword
);

router.post(
  "/send-reset-password-email",
  authController.sendResetPasswordEmail
);

router.post("/reset-password", authController.resetPassword);

router.post("/login-with-google", authController.loginWithGoogle);

module.exports = router;
