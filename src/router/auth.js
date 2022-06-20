const authController = require("../controller/auth");

const router = require("express").Router();

router.post("/register", authController.registerUser);

module.exports = router;
