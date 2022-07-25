const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const fs = require("fs");
const moment = require("moment");
const app = express();

dotenv.config();

const { sequelize } = require("./lib/sequelize");
sequelize.sync({ alter: true });

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  const loggingFormat = `${req.method} ${req.path} ${moment().format("LLL")}`;

  fs.appendFileSync(`${__dirname}/../.log`, loggingFormat + "\n");

  next();
});

const {
  authRoutes,
  productRoutes,
  userRoutes,
  adminRoutes,
  cartRoutes,
  transactionRoutes,
  addressRoutes,
  reportRoutes,
} = require("./routes");

app.use("/avatar", express.static(`${__dirname}/public/avatar`));
app.use("/product", express.static(`${__dirname}/public/product`));
app.use("/resep", express.static(`${__dirname}/public/resep`));
app.use("/payment", express.static(`${__dirname}/public/payment`));

app.use("/auth", authRoutes);
app.use("/product", productRoutes);
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/cart", cartRoutes);
app.use("/transaction", transactionRoutes);
app.use("/address", addressRoutes);
app.use("/report", reportRoutes);

// app.use("/", (req, res, next) => {
//   res.send("<h1>welcome to Pharmacy API</h1>");
// });

app.listen(PORT, () => {
  console.log("Listening in Port: ", PORT);
});
