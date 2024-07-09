const express = require("express");
const router = express.Router();

const BlogController = require("../Controllers/blog.control");
const blogUpload = require("../Middlewares/blog.middleware");
const { authentication , AdminAuthorization} = require("../Middlewares/auth.middleware");

router
    .route("/")
    .post(authentication, blogUpload.single("image"), BlogController.createBlog)
    .get(authentication, BlogController.getBlog)
    .patch(authentication, blogUpload.single("image"), BlogController.updateBlog);

router.delete("/:id", authentication, BlogController.deleteBlog);
router.get('/allblogs' , AdminAuthorization , BlogController.getAllBlogs)
module.exports = router;
