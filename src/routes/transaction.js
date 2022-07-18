const transactionControllers = require("../controller/transaction");
const fileUploader = require("../lib/uploader");
const { authorizedLoginUser } = require("../middleware/authorizeLoginUser");

const router = require("express").Router();

router.get("/", transactionControllers.getAllTransaction);

router.post(
  "/upload-resep",
  fileUploader({
    destinationFolder: "resep",
    fileType: "image",
    prefix: "RESEP",
  }).single("resep_image_file"),
  authorizedLoginUser,
  transactionControllers.uploadResepDokter
);

router.get("/get-payment-method", transactionControllers.getAllPaymentMethod);

router.post(
  "/get-payment-method-id",
  transactionControllers.getPaymentMethodById
);

router.post(
  "/add-new-transaction",
  authorizedLoginUser,
  transactionControllers.createTransaction
);

// Upload Bukti Pembayaran
router.post(
  "/upload-proof-of-payment",
  fileUploader({
    destinationFolder: "payment",
    fileType: "image",
    prefix: "PAYMENT",
  }).single("payment_image_file"),
  transactionControllers.uploadProofOfPayment
);

// Fetch Transaksi dari ID
router.get("/:transactionId", transactionControllers.getTransactionById);

module.exports = router;
