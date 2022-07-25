const { DataTypes } = require("sequelize");

const Produk = (sequelize) => {
  // blom mskin image untuk produk dalam bentuk array
  return sequelize.define("product", {
    nama_produk: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nomor_obat: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    satuan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nomor_bpom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    harga_jual: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    diskon: {
      type: DataTypes.DECIMAL,
    },
    produk_image_url: {
      type: DataTypes.JSON,
    },
  });
};

module.exports = Produk;
