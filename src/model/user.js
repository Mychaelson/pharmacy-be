const { DataTypes } = require("sequelize/types");

const User = (sequelize) => {
  return sequelize.define("User", {
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};

export default User;
