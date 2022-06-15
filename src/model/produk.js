const { DataTypes } = require("sequelize/types");

const Produk = (sequelize) => {
  // blom mskin image untuk produk dalam bentuk array
  return sequelize.define("Produk", {
    nama_produk: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    harga: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    diskon: {
      type: DataTypes.DECIMAL,
    },
    harga_modal: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
  });
};

module.exports = Produk;
