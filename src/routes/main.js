const express = require("express");
const router = express.Router();
const mainController = require("../controllers/main.js");

//Rotas sem parâmetros ou corpo para categorias
router.get("/", mainController.getAll);

module.exports = router;
