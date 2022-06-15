const { DataTypes } = require("sequelize/types");

const StatusPembayaran = (sequelize) => {
  return sequelize.define("Status_pembayaran", {
    status: {
      type: DataTypes.STRING,
    },
  });
};

module.exports = StatusPembayaran;
