const { DataTypes } = require("sequelize/types");

const DaftarTransaksi = (sequelize) => {
  return sequelize.define("Daftar_transaksi", {
    total_price: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    is_resep: {
      type: DataTypes.BOOLEAN,
    },
    resep_imag_url: {
      type: DataTypes.STRING,
    },
  });
};

module.exports = DaftarTransaksi;
