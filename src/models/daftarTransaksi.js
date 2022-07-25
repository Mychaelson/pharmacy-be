const { DataTypes } = require("sequelize");

const DaftarTransaksi = (sequelize) => {
  return sequelize.define("transaction_list", {
    total_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_resep: {
      type: DataTypes.BOOLEAN,
    },
    resep_image_url: {
      type: DataTypes.STRING,
    },
    nomor_resep: {
      type: DataTypes.STRING,
    },
    productAdded: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
};

module.exports = DaftarTransaksi;
