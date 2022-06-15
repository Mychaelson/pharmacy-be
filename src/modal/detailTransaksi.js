const { DataTypes } = require("sequelize/types");

const TransaksiDetail = (sequelize) => {
  return sequelize.define("Transaksi_detail", {
    price_when_sold: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
  });
};

module.exports = TransaksiDetail;
