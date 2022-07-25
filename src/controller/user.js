const UserService = require("../services/user");

const userControllers = {
  getUserById: async (req, res) => {
    try {
      const { userId } = req.params;
      const serviceResult = await UserService.getUserById(userId);

      if (!serviceResult.success) throw serviceResult;

      return res.status(serviceResult.statusCode || 200).json({
        message: serviceResult.message,
        result: serviceResult.data,
      });
    } catch (err) {
      console.log(err);
      return res.status(err.statusCode || 500).json({
        message: err.message,
      });
    }
  },
  editUser: async (req, res) => {
    try {
      const userId = req.user.id;
      const { username, nama, gender, DOB } = req.body;

      const serviceResult = await UserService.editUser(
        userId,
        username,
        nama,
        gender,
        DOB
      );

      if (!serviceResult.success) throw serviceResult;

      return res.status(serviceResult.statusCode || 200).json({
        message: serviceResult.message,
        result: serviceResult.data,
      });
    } catch (err) {
      console.log(err);
      return res.status(err.statusCode || 500).json({
        message: err.message,
      });
    }
  },

  editAvatarUser: async (req, res) => {
    try {
      const { id } = req.params;

      const serviceResult = await UserService.editAvatarUser(id, req.file);
      if (!serviceResult.success) throw serviceResult;
      return res.status(serviceResult.statusCode || 200).json({
        message: serviceResult.message,
        result: serviceResult.data,
      });
    } catch (err) {
      console.log(err);
      return res.status(err.statusCode || 500).json({
        message: err.message,
      });
    }
  },
  // createNewAddress: async (req, res) => {
  //   try {
  //     const { name, username, email, password } = req.body;

  //     const serviceResult = await AuthService.registerUser(
  //       username,
  //       email,
  //       name,
  //       password
  //     );

  //     if (!serviceResult.success) throw serviceResult;
  //     return res.status(serviceResult.statusCode || 200).json({
  //       message: serviceResult.message,
  //       result: serviceResult.data,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //     return res.status(err.statusCode || 500).json({
  //       message: err.message,
  //     });
  //   }
  // },
};

module.exports = userControllers;
