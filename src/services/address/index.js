const rajaOngkirInstance = require("../../lib/axiosInstance");
const { Alamat } = require("../../lib/sequelize");
const Service = require("../service");

class AddressService extends Service {
  static getAllProvince = async () => {
    try {
      const province = await rajaOngkirInstance.get("/province");

      return this.handleSuccess({
        message: "Provinces Found",
        statusCode: 200,
        data: province.data.rajaongkir.results,
      });
    } catch (err) {
      console.log(err);
      return this.handleError({
        message: "Server Error!",
        statusCode: 500,
      });
    }
  };

  static getAllCity = async (query) => {
    try {
      const { provinceTerpilih } = query;

      const city = await rajaOngkirInstance.get(
        `/city?province=${provinceTerpilih}`
      );

      return this.handleSuccess({
        message: "Cities Found",
        statusCode: 200,
        data: city.data.rajaongkir.results,
      });
    } catch (err) {
      console.log(err);
      return this.handleError({
        message: "Server Error!",
        statusCode: 500,
      });
    }
  };

  static addNewAddress = async (
    label_alamat,
    nama_penerima,
    no_telepon_penerima,
    alamat_lengkap,
    kode_pos,
    provinsi_id,
    kota_kabupaten_id,
    kecamatan,
    userId,
    is_main_address
  ) => {
    try {
      if (is_main_address) {
        await Alamat.update(
          { is_main_address: false },
          {
            where: { userId, is_main_address: true },
          }
        );
      }

      const findMainAdress = await Alamat.findOne({
        where: { userId, is_main_address: true },
      });

      if (!findMainAdress) {
        newAddress = await Alamat.create({
          label_alamat,
          nama_penerima,
          no_telepon_penerima,
          alamat_lengkap,
          kode_pos,
          provinsi_id,
          kota_kabupaten_id,
          kecamatan,
          userId,
          is_main_address: true,
        });
      } else {
        const newAddress = await Alamat.create({
          label_alamat,
          nama_penerima,
          no_telepon_penerima,
          alamat_lengkap,
          kode_pos,
          provinsi_id,
          kota_kabupaten_id,
          kecamatan,
          userId,
          is_main_address,
        });
      }

      return this.handleSuccess({
        statusCode: 200,
        message: "Address Added Successfully",
        data: newAddress,
      });
    } catch (err) {
      console.log(err);
      return this.handleError({
        message: "Server Error!",
        statusCode: 500,
      });
    }
  };

  static getAllAddress = async (userId) => {
    try {
      const findAddress = await Alamat.findAndCountAll({
        where: {
          userId,
        },
        order: [["is_main_address", "DESC"]],
      });
      if (!findAddress) {
        return this.handleError({
          message: "No addresses found, please create one",
          statusCode: 500,
        });
      }
      return this.handleSuccess({
        message: "Addresses found",
        statusCode: 200,
        data: findAddress,
      });
    } catch (err) {
      console.log(err);
      return this.handleError({
        message: "Server Error!",
        statusCode: 500,
      });
    }
  };

  static getMainAddress = async (userId) => {
    try {
      const findMainAddress = await Alamat.findOne({
        where: {
          is_main_address: true,
          userId,
        },
      });

      if (!findMainAddress) {
        return this.handleError({
          message: "There is no main address, please add one!",
          statusCode: 500,
        });
      }

      return this.handleSuccess({
        message: "Main address found",
        statusCode: 200,
        data: findMainAddress,
      });
    } catch (err) {
      console.log(err);
      return this.handleError({
        message: "Server Error!",
        statusCode: 500,
      });
    }
  };

  static getOngkir = async (body) => {
    try {
      const ongkir = await rajaOngkirInstance.post("/cost", body);
      return this.handleSuccess({
        message: "Ongkir Found",
        statusCode: 200,
        data: ongkir.data.rajaongkir.results,
      });
    } catch (err) {
      console.log(err);
      return this.handleError({
        message: "Server Error",
        statusCode: 500,
      });
    }
  };

  static changeMainAddress = async (userId, newAddressId) => {
    try {
      const findMainAddress = await Alamat.findOne({
        where: {
          is_main_address: true,
          userId,
        },
      });

      if (!findMainAddress) {
        return this.handleError({
          message: "There is no main address, please add one!",
          statusCode: 500,
        });
      }

      await Alamat.update(
        {
          is_main_address: false,
        },
        {
          where: {
            id: findMainAddress.id,
          },
        }
      );

      const updateMainAddress = await Alamat.update(
        {
          is_main_address: true,
        },
        {
          where: {
            id: newAddressId,
            is_main_address: false,
          },
        }
      );

      return this.handleSuccess({
        message: "Main address updated",
        statusCode: 200,
        data: updateMainAddress,
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

module.exports = AddressService;
