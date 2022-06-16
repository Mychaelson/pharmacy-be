const { Sequelize } = require("sequelize");
const mySqlConfig = require("../config/database");

const sequelize = new Sequelize({
  username: mySqlConfig.MYSQL_USERNAME,
  password: mySqlConfig.MYSQL_PASSWORD,
  database: mySqlConfig.MYSQL_DB_NAME,
  port: 3306,
  dialect: "mysql",
  logging: false,
});

// call all the models
const User = require("../models/user")(sequelize);
const UserLoginSession = require("../models/userLoginSession")(sequelize);
const AccountVerificationToken = require("../models/accountVerificationToken")(
  sequelize
);
const ForgotPasswordToken = require("../models/forgotPasswordToken")(sequelize);
const Admin = require("../models/admin")(sequelize);
const AdminLoginSession = require("../models/adminLoginSession")(sequelize);
const Alamat = require("../models/alamat")(sequelize);
const Produk = require("../models/produk")(sequelize);
const Stok = require("../models/stok")(sequelize);
const StokStatus = require("../models/stokStatus")(sequelize);
const PurchaseOrder = require("../models/purchaseOrder")(sequelize);
const KategoriProduk = require("../models/kategoriProduk")(sequelize);
const Cart = require("../models/cart")(sequelize);
const DaftarTransaksi = require("../models/daftarTransaksi")(sequelize);
const DetailTransaksi = require("../models/detailTransaksi")(sequelize);
const MetodePembayaran = require("../models/metodePembayaran")(sequelize);
const BuktiPembayaran = require("../models/buktiPembayaran")(sequelize);
const StatusTransaksi = require("../models/statusTransaksi")(sequelize);
const MutasiStok = require("../models/mutasiStok")(sequelize);
const TipeMutasi = require("../models/tipeMutasi")(sequelize);

// defind the relationship of the model
Admin.hasMany(AdminLoginSession, { foreignKey: "admin_id" });
AdminLoginSession.belongsTo(Admin, { foreignKey: "admin_id" });

User.hasMany(UserLoginSession);
UserLoginSession.belongsTo(User);

User.hasMany(AccountVerificationToken);
AccountVerificationToken.belongsTo(User);

User.hasMany(ForgotPasswordToken);
ForgotPasswordToken.belongsTo(User);

User.hasMany(Alamat);
Alamat.belongsTo(User);

User.hasMany(Cart);
Cart.belongsTo(User);

Produk.hasMany(Cart);
Cart.belongsTo(Produk);

Produk.hasMany(PurchaseOrder);
PurchaseOrder.belongsTo(Produk);

Admin.hasMany(PurchaseOrder);
PurchaseOrder.belongsTo(Admin);

KategoriProduk.hasMany(Produk);
Produk.belongsTo(KategoriProduk);

Produk.hasMany(Stok);
Stok.belongsTo(Produk);

StokStatus.hasMany(Stok);
Stok.belongsTo(StokStatus);

Produk.hasMany(MutasiStok);
MutasiStok.belongsTo(Produk);

TipeMutasi.hasMany(MutasiStok);
MutasiStok.belongsTo(TipeMutasi);

User.hasMany(DaftarTransaksi);
DaftarTransaksi.belongsTo(User);

StatusTransaksi.hasOne(DaftarTransaksi);
DaftarTransaksi.belongsTo(StatusTransaksi);

DaftarTransaksi.hasMany(DetailTransaksi);
DetailTransaksi.belongsTo(DaftarTransaksi);

Produk.hasMany(DetailTransaksi);
DetailTransaksi.belongsTo(Produk);

DaftarTransaksi.hasOne(BuktiPembayaran);
BuktiPembayaran.belongsTo(DaftarTransaksi);

MetodePembayaran.hasMany(BuktiPembayaran);
BuktiPembayaran.belongsTo(MetodePembayaran);

DaftarTransaksi.hasMany(Stok);
Stok.belongsTo(DaftarTransaksi);

module.exports = {
  sequelize,
  AccountVerificationToken,
  Admin,
  AdminLoginSession,
  Alamat,
  BuktiPembayaran,
  Cart,
  DaftarTransaksi,
  DetailTransaksi,
  ForgotPasswordToken,
  KategoriProduk,
  MetodePembayaran,
  MutasiStok,
  Produk,
  PurchaseOrder,
  StatusTransaksi,
  Stok,
  StokStatus,
  TipeMutasi,
  User,
  UserLoginSession,
};
