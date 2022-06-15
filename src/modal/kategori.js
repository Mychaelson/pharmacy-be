const { DataTypes } = require("sequelize/types");

const Kategori = (sequelize) => {
  return sequelize.define("Kategori_produk", {
    kategori: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};

module.exports = Kategori;
