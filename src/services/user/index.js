const { User, Alamat } = require("../../lib/sequelize");
const Service = require("../service");

class UserService extends Service {
  static getUserById = async (userId) => {
    try {
      const findUser = await User.findOne({
        where: {
          id: userId,
        },
      });

      if (!findUser) {
        return this.handleError({
          message: "Wrong User ID!",
          statusCode: 400,
        });
      }

      delete findUser.dataValues.password;

      return this.handleSuccess({
        message: `You Found User ID: ${userId}`,
        data: findUser,
        statusCode: 200,
      });
    } catch (err) {
      console.log(err);
      return this.handleError({
        statusCode: 500,
        message: "Can't reach user server",
      });
    }
  };

  static editAvatarUser = async (id, file) => {
    try {
      const findUser = await User.findOne({
        where: {
          id,
        },
      });
      if (!findUser) {
        return this.handleError({
          statusCode: 400,
          message: "No user found!",
        });
      }
      const uploadFileDomain = process.env.UPLOAD_FILE_DOMAIN;
      const filePath = "avatar";
      const { filename } = file;

      const newAvatar = `${uploadFileDomain}/${filePath}/${filename}`;

      const updatedAvatar = await User.update(
        {
          photo_profile: newAvatar,
        },
        {
          where: {
            id,
          },
        }
      );

      const userInfo = await User.findByPk(id);

      return this.handleSuccess({
        statusCode: 200,
        message: "Avatar edited successfully!",
        data: userInfo,
      });
    } catch (err) {
      console.log(err);
      return this.handleError({
        statusCode: 500,
        message: "Server error!",
      });
    }
  };

  static editUser = async (userId, username, nama, gender, DOB) => {
    try {
      const findUser = await User.findOne({
        where: {
          id: userId,
        },
      });

      if (!findUser) {
        return this.handleError({
          statusCode: 400,
          message: "Wrong User ID!",
        });
      }

      if (username) {
        const findUsername = await User.findOne({
          where: {
            username,
          },
        });

        if (findUsername) {
          return this.handleError({
            message: "Please use different Username!",
            statusCode: 400,
          });
        }
      }

      await User.update(
        {
          nama,
          username,
          gender,
          DOB,
        },
        {
          where: {
            id: userId,
          },
        }
      );

      const editedUser = await User.findByPk(userId);
      delete editedUser.dataValues.password;

      return this.handleSuccess({
        statusCode: 200,
        message: "User Edited!",
        data: editedUser,
      });
    } catch (err) {
      console.log(err);
      return this.handleError({
        statusCode: 500,
        message: "Can't reach user server",
      });
    }
  };

  // static createNewAddress = async () => {
  //   try {
  //     const newAddress = await Alamat({
  //       label_alat,
  //       nama_penerima,
  //       no_telepon_penerima,
  //       alamat_lengkap,
  //       is_main_address,
  //       provinsi: province,
  //       provinci_id: province_id,
  //       kota_kabupaten: city_name,
  //       kota_id: city_id,
  //       kecamatan,
  //       kode_pos,
  //     });

  //     return this.handleSuccess({
  //       statusCode: 200,
  //       message: "Successfully created new address!",
  //       data: newAddress,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //     return this.handleError({
  //       statusCode: 500,
  //       message: "Server Error!",
  //     });
  //   }
  // };
}

module.exports = UserService;
