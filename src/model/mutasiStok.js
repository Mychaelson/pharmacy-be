const { DataTypes } = require("sequelize/types");

const MutasiStok = (sequelize) => {
  return sequelize.define("Mutasi_stok", {
    aktifitas: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jumlah: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
  });
};

module.exports = MutasiStok;
