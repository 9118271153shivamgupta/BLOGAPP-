const { Router } = require("express");
const { addBlog, fetchAllBlog, fetchOneBlog, deleteBlog, updateBlog } = require("../controllers/blogs.controller.js");
const { authenticate } = require("../middlewares/auth.js");
const router = Router();

router.post("/add", authenticate, addBlog);
router.get("/all", fetchAllBlog);
router.get("/one/:id", fetchOneBlog);
router.delete("/del/:id", deleteBlog)
router.put("/put/:id", updateBlog)

module.exports = router;