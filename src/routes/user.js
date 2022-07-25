const userControllers = require("../controller/user");
const fileUploader = require("../lib/uploader");
const { authorizedLoginUser } = require("../middleware/authorizeLoginUser");

const router = require("express").Router();

// Get User By ID
router.get("/:userId", userControllers.getUserById);

// Edit Profile
router.patch("/edit-profile", authorizedLoginUser, userControllers.editUser);

// Edit Avatar
router.patch(
  "/:id",
  fileUploader({
    destinationFolder: "avatar",
    fileType: "image",
    prefix: "AVATAR",
  }).single("avatar_image_file"),
  userControllers.editAvatarUser
);

module.exports = router;
