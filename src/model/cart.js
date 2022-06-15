const { DataTypes } = require("sequelize/types");

const Cart = (sequelize) => {
  return sequelize.define("Cart", {
    quantity: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
  });
};

module.exports = Cart;
