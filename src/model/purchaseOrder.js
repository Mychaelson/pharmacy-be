const { DataTypes } = require("sequelize/types");

const PurchaseOrder = (sequelize) => {
  return sequelize.define("Purchase_order", {
    amount: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    price: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
  });
};

module.exports = PurchaseOrder;
