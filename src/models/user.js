const { DataTypes } = require("sequelize");

const User = (sequelize) => {
  return sequelize.define("user", {
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.STRING,
    },
    DOB: {
      type: DataTypes.DATE,
    },
    photo_profile: {
      type: DataTypes.STRING,
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    uid: {
      type: DataTypes.STRING,
    },
  });
};

module.exports = User;
