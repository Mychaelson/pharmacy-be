const { DataTypes } = require("sequelize");

const StokStatus = (sequelize) => {
  return sequelize.define("stock_status", {
    status: {
      type: DataTypes.STRING,
    },
  });
};

module.exports = StokStatus;
