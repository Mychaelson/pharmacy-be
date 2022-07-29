const { Op, Sequelize } = require("sequelize");
const {
  Produk,
  KategoriProduk,
  UserProduct,
  Stok,
  DetailTransaksi,
} = require("../../lib/sequelize");
const Service = require("../service");

class ProductService extends Service {
  static getProduct = async (req) => {
    try {
      const { productId } = req.params;

      const getProductData = await Produk.findOne({
        where: {
          id: productId,
        },
        include: [
          {
            model: Stok,
            where: {
              stockStatusId: 1,
            },
          },
        ],
      });

      if (!getProductData) {
        return this.handleError({
          message: `Can't Find Product with ID: ${productId}`,
          statusCode: 404,
        });
      }

      return this.handleSuccess({
        message: "Product Found",
        statusCode: 200,
        data: getProductData,
      });
    } catch (err) {
      console.log(err);
      return this.handleError({
        message: "Can't Reach Product Server",
        statusCode: 500,
      });
    }
  };

  static getAllProduct = async (query) => {
    try {
      const {
        _limit = 30,
        _page = 1,
        _sortBy = "",
        _sortDir = "",
        hargaMinimum,
        hargaMaksimum,
        kategoriTerpilih,
        searchProduk,
      } = query;

      delete query._limit;
      delete query._page;
      delete query._sortBy;
      delete query._sortDir;
      delete query.hargaMinimum;
      delete query.hargaMaksimum;
      delete query.kategoriTerpilih;
      delete query.searchProduk;

      const whereCategoryClause = {};
      let searchByNameClause = {};

      if (kategoriTerpilih) {
        whereCategoryClause.productCategoryId = kategoriTerpilih;
      }

      if (searchProduk) {
        searchByNameClause = {
          nama_produk: { [Op.like]: `%${searchProduk}%` },
        };
      }

      const findProducts = await Produk.findAndCountAll({
        where: {
          ...query,
          harga_jual: {
            [Op.between]: [hargaMinimum || 0, hargaMaksimum || 9999999999],
          },
          ...searchByNameClause,
          ...whereCategoryClause,
        },
        limit: _limit ? parseInt(_limit) : undefined,
        offset: (_page - 1) * _limit,
        distinct: true,

        order: _sortBy ? [[_sortBy, _sortDir]] : undefined,
        include: [
          {
            model: Stok,
            where: {
              stockStatusId: 1,
            },
          },
        ],
      });

      if (!findProducts) {
        return this.handleError({
          message: "No product found, server error",
          statusCode: 500,
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
        message: "Server Error",
        statusCode: 500,
      });
    }
  };

  static recordUserProduct = async (user_id, produk_id) => {
    try {
      await UserProduct.create({
        produk_id,
        user_id,
      });

      return this.handleSuccess({
        message: "Recorded!",
        statusCode: 201,
      });
    } catch (err) {
      console.log(err);
      return this.handleError({
        message: "Server Error",
        statusCode: 500,
      });
    }
  };

  static getAllProductName = async () => {
    try {
      const findProduct = await Produk.findAll({
        sort: [["nama_produk", "DESC"]],
        attributes: ["nama_produk", "id"],
      });

      return this.handleSuccess({
        message: "Products found",
        statusCode: 200,
        data: findProduct,
      });
    } catch (err) {
      console.log(err);
      return this.handleError({
        message: "Server Error",
        statusCode: 500,
      });
    }
  };

  static getProductByCategory = async (categoryId) => {
    try {
      const getProductData = await Produk.findAll({
        where: {
          productCategoryId: categoryId,
        },
        include: {
          model: Stok,
        },
        limit: 5,
      });

      if (!getProductData) {
        return this.handleError({
          message: `Can't Find Product with Category ID: ${categoryId}`,
          statusCode: 404,
        });
      }

      return this.handleSuccess({
        message: "Product Found",
        statusCode: 200,
        data: getProductData,
      });
    } catch (err) {
      console.log(err);
      return this.handleError({
        message: "Can't Reach Product Server",
        statusCode: 500,
      });
    }
  };

  static getProductWithDiscount = async () => {
    try {
      const getProductData = await Produk.findAll({
        where: {
          diskon: {
            [Op.ne]: 0,
          },
        },
        limit: 5,
        include: [
          {
            model: Stok,
            where: {
              stockStatusId: 1,
            },
          },
        ],
      });

      if (!getProductData) {
        return this.handleError({
          message: `Can't Find Product with Discount`,
          statusCode: 404,
        });
      }

      return this.handleSuccess({
        message: "Product Found",
        statusCode: 200,
        data: getProductData,
      });
    } catch (err) {
      console.log(err);
      return this.handleError({
        message: "Can't Reach Product Server",
        statusCode: 500,
      });
    }
  };

  static getPopularProduct = async () => {
    try {
      const getPopularProduct = await DetailTransaksi.findAll({
        attributes: {
          include: [
            [Sequelize.fn("COUNT", Sequelize.col("productId")), "productCount"],
          ],
        },
        include: [
          {
            model: Produk,
            include: [
              {
                model: Stok,
                where: {
                  stockStatusId: 1,
                },
              },
            ],
          },
        ],
        order: [[Sequelize.col("productCount"), "DESC"]],
        group: ["productId"],
        limit: 6,
      });

      if (!getPopularProduct) {
        return this.handleError({
          message: `Can't Find Popular Product`,
          statusCode: 404,
        });
      }

      return this.handleSuccess({
        message: "Product Found",
        statusCode: 200,
        data: getPopularProduct,
      });
    } catch (err) {
      console.log(err);
      return this.handleError({
        message: "Can't Reach Popular Product Server",
        statusCode: 500,
      });
    }
  };
}

module.exports = ProductService;
