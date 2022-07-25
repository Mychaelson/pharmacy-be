const { DataTypes } = require("sequelize");

const userProduct = (sequelize) => {
  return sequelize.define("user_product", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    produk_id: {
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
  });
};

module.exports = userProduct;
