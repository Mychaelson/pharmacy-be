const { DataTypes } = require("sequelize/types");

const Alamat = (sequelize) => {
  return sequelize.define("Alamat", {
    label_alamat: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nama_penerima: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    no_telepon_penerima: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alamat_lengkap: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    provinsi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kota_kabupaten: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kecamatan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kode_pos: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_main_address: {
      type: DataTypes.BOOLEAN,
    },
  });
};

module.exports = Alamat;
