const addressControllers = require("../controller/address");
const { authorizedLoginUser } = require("../middleware/authorizeLoginUser");

const router = require("express").Router();

router.get("/province", addressControllers.getAllProvince);

router.get("/city", addressControllers.getAllCity);

router.post(
  "/add-new-address",
  authorizedLoginUser,
  addressControllers.addNewAddress
);

router.get(
  "/get-all-address",
  authorizedLoginUser,
  addressControllers.getAllAddress
);

router.get(
  "/get-main-address",
  authorizedLoginUser,
  addressControllers.getMainAddress
);

router.post("/cost", addressControllers.getOngkir);

router.patch(
  "/change-main-address",
  authorizedLoginUser,
  addressControllers.changeMainAddress
);

module.exports = router;
