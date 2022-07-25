const productControllers = require("./product");
const authController = require("./auth");
const userControllers = require("./user");
const adminControllers = require("./admin");
const cartController = require("./cart");
const ReportController = require("./report");

module.exports = {
  productControllers,
  authController,
  userControllers,
  adminControllers,
  cartController,
  ReportController,
};
