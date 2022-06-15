const { DataTypes } = require("sequelize/types");

const StokStatus = (sequelize) => {
  return sequelize.define("Stok_status", {
    kategori: {
      type: DataTypes.STRING,
    },
  });
};

module.exports = StokStatus;
