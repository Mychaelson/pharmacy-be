const moment = require("moment");
const { Op } = require("sequelize");
const sequelize = require("sequelize");
const {
  Produk,
  KategoriProduk,
  Stok,
  StokStatus,
  MutasiStok,
  PurchaseOrder,
  DetailTransaksi,
  DaftarTransaksi,
} = require("../../lib/sequelize");
const Service = require("../service");

class AdminService extends Service {
  static addProduct = async (body, file) => {
    try {
      const uploadFileDomain = process.env.UPLOAD_FILE_DOMAIN;
      const filePath = "product";
      const filename = file.map((val) => {
        return `${uploadFileDomain}/${filePath}/${val.filename}`;
      });

      const addNewProduct = await Produk.create({
        nama_produk: body.nama_produk,
        harga_jual: body.harga_jual,
        diskon: body.diskon,
        nomor_obat: body.nomor_obat,
        nomor_bpom: body.nomor_bpom,
        produk_image_url: filename,
        productCategoryId: body.productCategoryId,
        satuan: body.satuan,
      });

      return this.handleSuccess({
        message: "Product Added",
        statusCode: 201,
        data: addNewProduct,
      });
    } catch (err) {
      console.log(err);
      return this.handleError({
        message: "Can't Reach Product Server",
        statusCode: 500,
      });
    }
  };
  static addProductCategory = async (kategori) => {
    try {
      const addNewProductCategory = await KategoriProduk.create({ kategori });
      return this.handleSuccess({
        message: "Product Added",
        statusCode: 201,
        data: addNewProductCategory,
      });
    } catch (err) {
      console.log(err);
      return this.handleError({
        message: "Can't Reach Product Server",
        statusCode: 500,
      });
    }
  };

  static getAllProductCategory = async () => {
    try {
      const findAllProductCategory = await KategoriProduk.findAll();
      return this.handleSuccess({
        message: "Products Found",
        statusCode: 200,
        data: findAllProductCategory,
      });
    } catch (err) {
      console.log(err);
      return this.handleError({
        message: "Can't Reach Product Server",
        statusCode: 500,
      });
    }
  };

  static getProductList = async (query) => {
    try {
      const {
        _limit = 30,
        _page = 0,
        _sortBy = "",
        _sortDir = "",
        filterCategory,
        searchProduk,
      } = query;

      delete query._limit;
      delete query._page;
      delete query._sortBy;
      delete query._sortDir;
      delete query.filterCategory;
      delete query.searchProduk;

      const whereCategoryClause = {};
      let searchByNameClause = {};

      if (filterCategory) {
        whereCategoryClause.productCategoryId = filterCategory;
      }

      if (searchProduk) {
        searchByNameClause = {
          nama_produk: { [Op.like]: `%${searchProduk}%` },
        };
      }

      const findProducts = await Produk.findAndCountAll({
        where: {
          ...query,
          ...searchByNameClause,
          ...whereCategoryClause,
        },
        limit: _limit ? parseInt(_limit) : undefined,
        offset: _page * _limit,
        distinct: true,
        order: _sortBy ? [[_sortBy, _sortDir]] : undefined,
        include: [
          {
            model: Stok,
          },
          {
            model: KategoriProduk,
          },
        ],
      });

      if (!findProducts) {
        return this.handleError({
          message: "No product found!",
          statusCode: 400,
        });
      }

      return this.handleSuccess({
        message: "Products found",
        statusCode: 200,
        data: findProducts,
      });
    } catch (err) {
      console.log(err);
      return this.handleError({
        message: "Server Error!",
        statusCode: 500,
      });
    }
  };

  static editProduct = async (body, id) => {
    try {
      const findProducts = await Produk.findOne({
        where: {
          id,
        },
      });

      if (!findProducts) {
        return this.handleError({
          message: `Can't find Product with ID: ${id}`,
          statusCode: 404,
        });
      }

      const editProduk = await Produk.update(
        {
          nama_produk: body.nama_produk,
          nomor_obat: body.nomor_obat,
          nomor_bpom: body.nomor_bpom,
          harga_jual: body.harga_jual,
          satuan: body.satuan,
          productCategoryId: body.productCategoryId,
          diskon: body.diskon,
        },
        {
          where: {
            id,
          },
        }
      );

      return this.handleSuccess({
        message: "Product Edited!",
        statusCode: 201,
        data: editProduk,
      });
    } catch (err) {
      console.log(err);
      return this.handleError({
        message: "Server Edit Product Error!",
        statusCode: 500,
      });
    }
  };

  static editProductImages = async (id, file) => {
    try {
      const uploadFileDomain = process.env.UPLOAD_FILE_DOMAIN;
      const filePath = "product";
      const filename = file.map((val) => {
        return `${uploadFileDomain}/${filePath}/${val.filename}`;
      });

      const findProducts = await Produk.findOne({
        where: {
          id,
        },
      });

      if (!findProducts) {
        return this.handleError({
          message: `Can't find Product with ID: ${id}`,
          statusCode: 404,
        });
      }

      const editProdukImages = await Produk.update(
        {
          produk_image_url: filename,
        },
        {
          where: {
            id,
          },
        }
      );

      return this.handleSuccess({
        message: "Product Images Edited!",
        statusCode: 201,
        data: editProdukImages,
      });
    } catch (err) {
      console.log(err);
      return this.handleError({
        message: "Server Edit Product Images Error!",
        statusCode: 500,
      });
    }
  };

  static deleteProduct = async (productId) => {
    try {
      const findProduct = await Produk.findOne({
        where: {
          id: productId,
        },
      });

      if (!findProduct) {
        return this.handleError({
          message: `Can't Find Product With ID: ${productId}`,
          statusCode: 404,
        });
      }

      await Produk.destroy({
        where: {
          id: productId,
        },
      });

      return this.handleSuccess({
        message: `Delete Product ID: ${productId} Success`,
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

  static addStockStatus = async (status) => {
    try {
      const addStatus = await StokStatus.create({
        status,
      });

      return this.handleSuccess({
        message: "Status Added",
        statusCode: 201,
        data: addStatus,
      });
    } catch (err) {
      console.log(err);
      return this.handleError({
        message: "Can't Reach Stock Server",
        statusCode: 500,
      });
    }
  };

  static addStock = async (body, adminId) => {
    try {
      const addStock = await Stok.create({
        exp_date: body.exp_date,
        jumlah_stok: body.jumlah_stok,
        productId: body.productId,
        stockStatusId: 1,
      });

      await PurchaseOrder.create({
        amount: body.jumlah_stok,
        price: body.price,
        adminId,
        productId: body.productId,
        stockId: addStock.id,
      });

      await MutasiStok.create({
        jumlah: body.jumlah_stok,
        productId: body.productId,
        aktivitas: "Penerimaan Barang",
        exp_date: body.exp_date,
      });

      return this.handleSuccess({
        message: "Stock Added",
        statusCode: 201,
        data: addStock,
      });
    } catch (err) {
      console.log(err);
      return this.handleError({
        message: "Can't Reach Stock Server",
        statusCode: 500,
      });
    }
  };

  static getProductStockHistory = async (productId, query) => {
    try {
      const {
        _limit = 10,
        _page = 1,
        filterByMonth,
        filterByYear,
        filterByActivity,
      } = query;

      delete query._limit;
      delete query._page;
      delete query.filterByMonth;
      delete query.filterByYear;
      delete query.filterByActivity;

      let searchByMonthOrYear = {};
      let whereActivityClause = {};

      if (filterByMonth && filterByYear) {
        searchByMonthOrYear = {
          createdAt: {
            [Op.between]: [
              `${filterByYear}-${moment(filterByMonth).format(
                "MM"
              )}-01T00:00:00.000Z`,
              `${filterByYear}-${moment(filterByMonth)
                .add(1, "month")
                .format("MM")}-01T00:00:00.000Z`,
            ],
          },
        };
      } else if (filterByMonth) {
        searchByMonthOrYear = {
          createdAt: {
            [Op.between]: [
              `${moment().format("YYYY")}-${moment(filterByMonth).format(
                "MM"
              )}-01T00:00:00.000Z`,
              `${moment().format("YYYY")}-${moment(filterByMonth)
                .add(1, "month")
                .format("MM")}-01T00:00:00.000Z`,
            ],
          },
        };
      } else if (filterByYear) {
        searchByMonthOrYear = {
          createdAt: {
            [Op.between]: [
              `${filterByYear}-01-01T00:00:00.000Z`,
              `${filterByYear}-12-31T23:59:59.000Z`,
            ],
          },
        };
      }

      if (filterByActivity) {
        whereActivityClause = {
          aktivitas: {
            [Op.like]: `%${filterByActivity}%`,
          },
        };
      }

      const findProduct = await Produk.findOne({
        where: {
          id: productId,
        },
      });

      if (!findProduct) {
        return this.handleError({
          message: `Can't Find Product with ID: ${productId}`,
          statusCode: 404,
        });
      }

      const findProductStock = await MutasiStok.findAndCountAll({
        where: {
          productId,
          ...query,
          ...searchByMonthOrYear,
          ...whereActivityClause,
        },
        limit: _limit ? parseInt(_limit) : undefined,
        offset: (_page - 1) * _limit,
        distinct: true,
      });

      if (!findProductStock) {
        return this.handleError({
          message: "The product does not have a stock history",
          statusCode: 404,
        });
      }

      return this.handleSuccess({
        message: "Product stock history found!",
        statusCode: 200,
        data: findProductStock,
      });
    } catch (err) {
      console.log(err);
      return this.handleError({
        message: "Can't reach product stock server",
        statusCode: 500,
      });
    }
  };

  static addCustomOrder = async (body) => {
    try {
      const products = body.map((val) => {
        return {
          price_when_sold: val.price,
          quantity: val.quantity,
          transactionListId: val.transactionListId,
          productId: val.productId,
        };
      });
      const addProduct = await DetailTransaksi.bulkCreate(products, {
        individualHooks: true,
      });

      await DaftarTransaksi.update(
        {
          total_price: body[0].total_price,
          productAdded: true,
          nomor_resep: body[0].nomor_resep,
        },
        {
          where: {
            id: body[0].transactionListId,
          },
        }
      );

      products.forEach(async (valo) => {
        const stok = await Stok.findOne({
          where: {
            productId: valo.productId,
            stockStatusId: 1,
            jumlah_stok: {
              [Op.gt]: 0,
            },
          },
          order: [["exp_date", "DESC"]],
        });

        await Stok.create({
          stockStatusId: 2,
          exp_date: stok.exp_date,
          transactionListId: valo.transactionListId,
          jumlah_stok: valo.quantity,
          productId: valo.productId,
        });

        await Stok.decrement(
          {
            jumlah_stok: valo.quantity,
          },
          {
            where: {
              id: stok.id,
            },
          }
        );
      });

      return this.handleSuccess({
        message: "Added Products Success!",
        statusCode: 201,
        data: addProduct,
      });
    } catch (err) {
      console.log(err);
      return this.handleError({
        message: "Can't reach custom product server!",
        statusCode: 500,
      });
    }
  };

  static getRevenue = async (query) => {
    try {
      const { filterByMonth, filterByYear } = query;

      delete query.filterByMonth;
      delete query.filterByYear;

      let searchByMonthOrYear = {};

      if (filterByMonth && filterByYear) {
        searchByMonthOrYear = {
          createdAt: {
            [Op.between]: [
              `${filterByYear}-${moment(filterByMonth).format(
                "MM"
              )}-01T00:00:00.000Z`,
              `${filterByYear}-${moment(filterByMonth)
                .add(1, "month")
                .format("MM")}-01T00:00:00.000Z`,
            ],
          },
        };
      } else if (filterByMonth) {
        searchByMonthOrYear = {
          createdAt: {
            [Op.between]: [
              `${moment().format("YYYY")}-${moment(filterByMonth).format(
                "MM"
              )}-01T00:00:00.000Z`,
              `${moment().format("YYYY")}-${moment(filterByMonth)
                .add(1, "month")
                .format("MM")}-01T00:00:00.000Z`,
            ],
          },
        };
      } else if (filterByYear) {
        searchByMonthOrYear = {
          createdAt: {
            [Op.between]: [
              `${filterByYear}-01-01T00:00:00.000Z`,
              `${filterByYear}-12-31T23:59:59.000Z`,
            ],
          },
        };
      }

      const findOutcome = await PurchaseOrder.findAll({
        where: {
          ...searchByMonthOrYear,
        },
      });

      const outcomeResult = findOutcome.reduce(
        (previousValue, currentValue) => {
          return previousValue + currentValue.amount * currentValue.price;
        },
        0
      );

      const findIncome = await DetailTransaksi.findAll({
        attributes: ["price_when_sold", "quantity"],
        include: [
          {
            model: DaftarTransaksi,
            attributes: ["id", "createdAt"],
            where: {
              paymentStatusId: 4,
              ...searchByMonthOrYear,
            },
          },
        ],
      });

      const incomeResult = findIncome?.reduce((previousValue, currentValue) => {
        return (
          previousValue + currentValue.price_when_sold * currentValue.quantity
        );
      }, 0);

      return this.handleSuccess({
        message: "Here we are!",
        data: {
          income: incomeResult,
          outcome: outcomeResult,
        },
        statusCode: 200,
      });
    } catch (err) {
      console.log(err);
      return this.handleError({
        message: "Can't reach revenue server!",
        statusCode: 500,
      });
    }
  };

  static acceptTransaction = async (transactionId) => {
    try {
      const findTransaction = await DaftarTransaksi.findOne({
        where: {
          id: transactionId,
        },
      });
      if (!findTransaction) {
        return this.handleError({
          message: `transaction with id ${transactionId} not found!`,
        });
      }

      await DaftarTransaksi.update(
        { paymentStatusId: 2 },
        { where: { id: transactionId } }
      );
      return this.handleSuccess({
        message: "Transaction accepted successfully!",
        statusCode: 200,
      });
    } catch (err) {
      console.log(err);
      return this.handleError({
        message: "Server Error",
        statusCode: 500,
      });
    }
  };

  static declineTransaction = async (transactionId) => {
    try {
      const findTransaction = await DaftarTransaksi.findOne({
        where: {
          id: transactionId,
        },
      });
      if (!findTransaction) {
        return this.handleError({
          message: `transaction with id ${transactionId} not found!`,
        });
      }

      await DaftarTransaksi.update(
        { paymentStatusId: 5 },
        { where: { id: transactionId } }
      );

      const stok = await Stok.findAll({
        where: {
          transactionListId: transactionId,
        },
        attributes: ["jumlah_stok", "productId"],
      });

      stok.forEach(async (val) => {
        const mainStok = await Stok.findOne({
          where: {
            productId: val.productId,
          },
        });
        console.log(mainStok);
        await Stok.increment(
          {
            jumlah_stok: val.jumlah_stok,
          },
          {
            where: {
              id: mainStok.id,
            },
          }
        );
      });

      await Stok.destroy({ where: { transactionListId: transactionId } });

      return this.handleSuccess({
        message: "Transaction declined successfully!",
        statusCode: 200,
      });
    } catch (err) {
      console.log(err);
      return this.handleError({
        message: "Server Error",
        statusCode: 500,
      });
    }
  };

  static askForDelivery = async (transactionId) => {
    try {
      const findTransaction = await DaftarTransaksi.findOne({
        where: {
          id: transactionId,
        },
      });
      if (!findTransaction) {
        return this.handleError({
          message: `transaction with id ${transactionId} not found!`,
        });
      }

      await DaftarTransaksi.update(
        { paymentStatusId: 3 },
        { where: { id: transactionId } }
      );

      await Stok.update(
        {
          stockStatusId: 3,
        },
        {
          where: { transactionListId: transactionId },
        }
      );
      // Isi sesuai data barang yang dikirim

      const findStock = await Stok.findOne({
        where: {
          transactionListId: transactionId,
          stockStatusId: 3,
        },
      });

      const data = await DetailTransaksi.findAll({
        where: {
          transactionListId: transactionId,
        },
      });

      const arrayForMutation = data.map((val) => {
        return {
          jumlah: val.quantity,
          productId: val.productId,
          aktivitas: "Penjualan Barang",
          exp_date: findStock.exp_date,
        };
      });
      await MutasiStok.bulkCreate(arrayForMutation, { individualHooks: true });

      return this.handleSuccess({
        message: "Courier is on the way!",
        statusCode: 200,
      });
    } catch (err) {
      console.log(err);
      return this.handleError({
        message: "Server Error",
        statusCode: 500,
      });
    }
  };
}

module.exports = AdminService;
