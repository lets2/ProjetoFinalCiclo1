const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categories.js");

//Rotas sem parâmetros ou corpo para categorias
router.get("/categories", categoriesController.getAll);

//Rotas com parâmetro mas sem corpo para categorias
//pega uma categoria especifica e sua url
router.get("/categories/:id", categoriesController.getByIndex);

//pega todos os deuses de uma categoria informada
router.get("/categories/:id/all", categoriesController.getAllGodsByIndex);
module.exports = router;
