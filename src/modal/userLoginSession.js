const { DataTypes } = require("sequelize/types");

const UserLoginSession = (sequelize) => {
  return sequelize.define("User_login_session", {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};

module.exports = UserLoginSession;
