const express = require("express");
const router = express.Router();
const categoriesRoutes = require("./routes/categories.js");

const mainRoutes = require("./routes/main.js");

router.use(categoriesRoutes);
router.use(mainRoutes);
module.exports = router;
