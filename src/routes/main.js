const express = require("express");
const router = express.Router();
const mainController = require("../controllers/main.js");

//Routes without parameters or body to categories
router.get("/", mainController.getAll);

module.exports = router;
