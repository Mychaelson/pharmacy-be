const { Op } = require("sequelize");
const {
  User,
  AccountVerificationToken,
  Admin,
  AdminLoginSession,
  UserLoginSession,
  ForgotPasswordToken,
} = require("../../lib/sequelize");
const Service = require("../service");
const mailer = require("../../lib/mailer");
const { nanoid } = require("nanoid");
const moment = require("moment");
const fs = require("fs");
const mustache = require("mustache");
const bcrypt = require("bcryptjs");
// const { generateToken } = require("../../lib/jwt");

class AuthService extends Service {
  static registerUser = async (username, email, name, password) => {
    try {
      const isUsernameOrEmailTaken = await User.findOne({
        where: {
          [Op.or]: [{ username }, { email }],
        },
      });

      if (isUsernameOrEmailTaken) {
        return this.handleError({
          statusCode: 400,
          message: "Username or email has been taken!",
        });
      }

      const hashedPassword = bcrypt.hashSync(password, 5);

      const registerUser = await User.create({
        username,
        nama: name,
        email,
        password: hashedPassword,
      });

      const verifyAccountToken = nanoid(40);

      await AccountVerificationToken.create({
        token: verifyAccountToken,
        is_valid: true,
        valid_until: moment().add(1, "hour"),
        userId: registerUser.id,
      });

      const verifyUserLink = `http://localhost:2000/auth/verify/${verifyAccountToken}`;

      const emailTemplate = fs
        .readFileSync(__dirname + "/../../templates/verifyAccount.html")
        .toString();

      const renderedTemplate = mustache.render(emailTemplate, {
        name,
        verify_url: verifyUserLink,
      });

      await mailer({
        subject: "Verfiy your account!",
        to: email,
        html: renderedTemplate,
      });

      return this.handleSuccess({
        statusCode: 201,
        message:
          "Account Registered, please check your email to verify your account!",
        data: registerUser,
      });
    } catch (err) {
      console.log(err);
      return this.handleError({
        statusCode: 500,
        message: "Server error!",
      });
    }
  };

  static registerAdmin = async (username, email, name, password) => {
    try {
      const isUsernameOrEmailTaken = await Admin.findOne({
        where: {
          [Op.or]: [{ username }, { email }],
        },
      });

      if (isUsernameOrEmailTaken) {
        return this.handleError({
          statusCode: 400,
          message: "Username or email has been taken!",
        });
      }

      const hashedPassword = bcrypt.hashSync(password, 5);

      const registerUser = await Admin.create({
        username,
        nama: name,
        email,
        password: hashedPassword,
      });
      return this.handleSuccess({
        statusCode: 201,
        message: "Admin Registered",
        data: registerUser,
      });
    } catch (err) {
      console.log(err);
      return this.handleError({
        statusCode: 500,
        message: "Server error!",
      });
    }
  };

  static loginAdmin = async (username, password) => {
    try {
      const findUser = await Admin.findOne({
        where: {
          [Op.or]: [{ username }, { email: username }],
        },
      });
      if (!findUser) {
        return this.handleError({
          statusCode: 400,
          message: "Login credentials doesn't match!",
        });
      }
      const isPasswordCorrect = bcrypt.compareSync(password, findUser.password);
      if (!isPasswordCorrect) {
        return this.handleError({
          statusCode: 400,
          message: "Login credentials doesn't match!",
        });
      }
      delete findUser.dataValues.password;

      await AdminLoginSession.update(
        {
          is_valid: false,
        },
        {
          where: {
            admin_id: findUser.id,
            is_valid: true,
          },
        }
      );

      const sessionToken = nanoid(64);

      // Create new session for logged in user
      await AdminLoginSession.create({
        admin_id: findUser.id,
        is_valid: true,
        token: sessionToken,
        valid_until: moment().add(1, "day"),
      });

      return this.handleSuccess({
        statusCode: 200,
        message: "Welcome",
        data: {
          user: findUser,
          token: sessionToken,
        },
      });
    } catch (err) {
      console.log(err);
      return this.handleError({
        statusCode: 500,
        message: "Server error!",
      });
    }
  };

  static keepLoginAdmin = async (token, admin) => {
    try {
      const renewedToken = nanoid(64);

      const findUser = await Admin.findByPk(admin.id);

      delete findUser.dataValues.password;

      await AdminLoginSession.update(
        {
          token: renewedToken,
          valid_until: moment().add(1, "day"),
        },
        {
          where: {
            id: token.id,
          },
        }
      );

      return this.handleSuccess({
        statusCode: 200,
        message: "Renewed user token",
        data: {
          user: findUser,
          token: renewedToken,
        },
      });
    } catch (err) {
      console.log(err);
      return this.handleError({
        statusCode: 500,
        message: "Server error!",
      });
    }
  };

  static loginUser = async (credential, password) => {
    try {
      const findUser = await User.findOne({
        where: {
          [Op.or]: [{ username: credential }, { email: credential }],
        },
      });

      const comparePassword = bcrypt.compareSync(password, findUser.password);

      if (!findUser || !comparePassword) {
        return this.handleError({
          message: "Wrong Username, email or password!",
          statusCode: 400,
        });
      }

      delete findUser.dataValues.password;

      await UserLoginSession.update(
        {
          is_valid: false,
        },
        {
          where: {
            userId: findUser.id,
            is_valid: true,
          },
        }
      );

      const sessionToken = nanoid(64);

      await UserLoginSession.create({
        token: sessionToken,
        userId: findUser.id,
        is_valid: true,
        valid_until: moment().add(1, "day"),
      });

      return this.handleSuccess({
        statusCode: 200,
        message: "Login Success!",
        data: {
          user: findUser,
          token: sessionToken,
        },
      });
    } catch (err) {
      console.log(err);
      return this.handleError({
        statusCode: 500,
        message: "Can't reach auth server",
      });
    }
  };

  static keepLoginUser = async (token, user) => {
    try {
      const newToken = nanoid(64);
      const findUser = await User.findByPk(user.id);

      delete findUser.dataValues.password;

      await UserLoginSession.update(
        {
          token: newToken,
          valid_until: moment().add(1, "day"),
        },
        {
          where: {
            id: token.id,
          },
        }
      );

      return this.handleSuccess({
        statusCode: 200,
        message: "Token just Updated!",
        data: {
          user: findUser,
          token: newToken,
        },
      });
    } catch (err) {
      console.log(err);
      return this.handleError({
        message: "Can't reach token server",
        statusCode: 500,
      });
    }
  };

  static verifyUser = async (token) => {
    try {
      const verifyToken = await AccountVerificationToken.findOne({
        where: {
          token,
          is_valid: true,
          valid_until: {
            [Op.gt]: moment().utc(),
          },
        },
      });

      if (!verifyToken) {
        return this.handleError({
          message: "Token is not valid!",
          statusCode: 401,
        });
      }

      await User.update(
        { is_verified: true },
        {
          where: {
            id: verifyToken.userId,
          },
        }
      );

      await AccountVerificationToken.update(
        { is_valid: false },
        {
          where: {
            userId: verifyToken.userId,
          },
        }
      );

      return this.handleRedirect({
        url: `http://localhost:3000/verifikasi-berhasil?referral=${token}`,
      });
    } catch (err) {
      return this.handleError({
        message: "Server Error!",
        statusCode: 500,
      });
    }
  };

  static resendVerificationToken = async (userId) => {
    try {
      const findUser = await User.findByPk(userId);

      if (findUser.is_verified) {
        return this.handleError({
          message: "Your account has been verified",
          statusCode: "400",
        });
      }

      const verifyAccountToken = nanoid(40);

      await AccountVerificationToken.create({
        token: verifyAccountToken,
        is_valid: true,
        valid_until: moment().add(1, "hour"),
        userId: findUser.id,
      });

      const verifyUserLink = `http://localhost:2000/auth/verify/${verifyAccountToken}`;

      const emailTemplate = fs
        .readFileSync(__dirname + "/../../templates/verifyAccount.html")
        .toString();

      const renderedTemplate = mustache.render(emailTemplate, {
        name: findUser.nama,
        verify_url: verifyUserLink,
      });

      await mailer({
        subject: "Verfiy your account!",
        to: findUser.email,
        html: renderedTemplate,
      });

      return this.handleSuccess({
        message: "Verification link has been sent!",
        statusCode: 200,
      });
    } catch (err) {
      console.log(err);
      return this.handleError({
        message: "Server error!",
        statusCode: 500,
      });
    }
  };

  static changePassword = async (userId, oldPassword, newPassword) => {
    try {
      const findUser = await User.findByPk(userId);

      if (!findUser) {
        return this.handleError({
          message: "User not found!",
          statusCode: 400,
        });
      }

      const comparePassword = bcrypt.compareSync(
        oldPassword,
        findUser.password
      );

      if (!comparePassword) {
        return this.handleError({
          message: "Change password failed, your current password is wrong!",
          statusCode: 400,
        });
      }

      const newHashedPassword = bcrypt.hashSync(newPassword, 5);

      await User.update(
        { password: newHashedPassword },
        {
          where: {
            id: userId,
          },
        }
      );

      return this.handleSuccess({
        message: "Password has been changed!",
        statusCode: 200,
      });
    } catch (err) {
      console.log(err);
      return this.handleError({
        message: "Server Error!",
        statusCode: 500,
      });
    }
  };

  static sendResetPasswordEmail = async (email) => {
    try {
      const findUser = await User.findOne({
        where: {
          email,
        },
      });

      if (!findUser) {
        return this.handleError({
          message: "User not found!",
          statusCode: 400,
        });
      }

      const resetPasswordToken = nanoid(40);

      await ForgotPasswordToken.create({
        token: resetPasswordToken,
        valid_until: moment().add(1, "hour"),
        is_valid: true,
        userId: findUser.id,
      });

      const forgotPasswordLink = `http://localhost:3000/forgot-password/?fp_token=${resetPasswordToken}`;

      const emailTemplate = fs
        .readFileSync(__dirname + "/../../templates/resetPassword.html")
        .toString();

      const renderedTemplate = mustache.render(emailTemplate, {
        name: findUser.nama,
        reset_password_url: forgotPasswordLink,
      });

      await mailer({
        to: email,
        subject: "Reset Password!",
        html: renderedTemplate,
      });

      return this.handleSuccess({
        message: "Email has been sent to your email!",
        statusCode: 200,
      });
    } catch (err) {
      console.log(err);
      return this.handleError({
        message: "Server Error!",
        statusCode: 500,
      });
    }
  };

  static resetPassword = async (password, passwordToken) => {
    try {
      const validateToken = await ForgotPasswordToken.findOne({
        where: {
          token: passwordToken,
          is_valid: true,
          valid_until: {
            [Op.gt]: moment().utc(),
          },
        },
      });

      if (!validateToken) {
        return this.handleError({
          message: "Token is invalid or has expired!",
          statusCode: 400,
        });
      }

      const hashedPassword = bcrypt.hashSync(password, 5);

      await User.update(
        { password: hashedPassword },
        {
          where: {
            id: validateToken.userId,
          },
        }
      );

      return this.handleSuccess({
        message: "Password has been changed!",
        statusCode: 200,
      });
    } catch (err) {
      console.log(err);
      return this.handleError({
        message: "Server Error!",
        statusCode: 500,
      });
    }
  };
}

module.exports = AuthService;
