const { Op } = require("sequelize");
const { AdminLoginSession } = require("../lib/sequelize");
const moment = require("moment");

const authorizedLoginAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const validateToken = await AdminLoginSession.findOne({
      where: {
        token,
        is_valid: true,
        valid_until: {
          [Op.gt]: moment().utc(),
        },
      },
    });

    if (!validateToken) {
      return res.status(401).json({
        message: "Token is not valid",
      });
    }

    req.adminToken = { token: validateToken.token, id: validateToken.id };
    req.admin = { id: validateToken.admin_id };

    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Server error!",
    });
  }
};

module.exports = { authorizedLoginAdmin };
