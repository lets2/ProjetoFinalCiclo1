const express = require("express");
const router = express.Router();
const categoriesRoutes = require("./routes/categories.js");
const godsRoutes = require("./routes/gods.js");
const usersRoutes = require("./routes/users.js");

router.use(categoriesRoutes);
router.use(godsRoutes);
router.use(usersRoutes);

module.exports = router;
