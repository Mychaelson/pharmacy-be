const { DataTypes } = require("sequelize");

const MutasiStok = (sequelize) => {
  return sequelize.define("stock_mutation", {
    aktivitas: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jumlah: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    exp_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
};

module.exports = MutasiStok;
