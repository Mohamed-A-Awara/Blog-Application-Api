const express = require("express");
const router = express.Router();

// Require Controller
const userControllers = require("../Controllers/user.control");

// Require Middlewares
const {
    authentication,
    AdminAuthorization,
} = require("../Middlewares/auth.middleware");
const userUpload = require("../Middlewares/blog.middleware");

// Routes
router.route("/:id").delete(AdminAuthorization, userControllers.deleteUser);

router.use(authentication);
router.post('/logout' , userControllers.logOut)
router
    .route("/")
    .get(userControllers.getUser)
    .patch(userUpload.single("image"), userControllers.updateUser);

router.post("/update/password", userControllers.updatePassword);

module.exports = router;
