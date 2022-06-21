const authController = require("../controller/auth");

const router = require("express").Router();

router.post("/register", authController.registerUser);
router.get("/verify/:token", authController.verifyUser);

module.exports = router;
