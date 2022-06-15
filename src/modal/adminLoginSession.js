const { DataTypes } = require("sequelize/types");

const AdminLoginSession = (sequelize) => {
  return sequelize.define("Admin_login_session", {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};

module.exports = AdminLoginSession;
