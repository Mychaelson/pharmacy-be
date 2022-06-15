const { DataTypes } = require("sequelize/types");

const BuktiPembayaran = (sequelize) => {
  return sequelize.define("Bukti_pembayaran", {
    bukti_transfer: {
      type: DataTypes.STRING,
    },
    reference_id: {
      type: DataTypes.STRING,
    },
    total_payment: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    method: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_approved: {
      type: DataTypes.BOOLEAN,
    },
  });
};

module.exports = BuktiPembayaran;
