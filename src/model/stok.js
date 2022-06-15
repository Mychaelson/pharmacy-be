const { DataTypes } = require("sequelize/types");

const Stok = (sequelize) => {
  return sequelize.define("stok", {
    exp_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    jumlah_stok: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
  });
};

module.exports = Stok;
