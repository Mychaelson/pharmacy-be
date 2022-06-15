const { DataTypes } = require("sequelize/types");

const TipeMutasi = (sequelize) => {
  return sequelize.define("Tipe_mutasi", {
    tipe: {
      type: DataTypes.STRING,
    },
  });
};

module.exports = TipeMutasi;
