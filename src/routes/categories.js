const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categories.js");

//-------------------------------------------------------------------
/*Routes related to the "Categories" entity, AVAILABLE TO ANY USER.*/
//-------------------------------------------------------------------

//-------------------------------------------------
//Routes without parameters or body for Categories
router.get("/categories", categoriesController.getAll);

//-------------------------------------------------
//Routes with parameters but without body for Categories
router.get("/categories/:id", categoriesController.getById);

//Get all the gods that belong to a specific category
router.get("/categories/:id/all", categoriesController.getAllGodsById);

//Get a god according to its ID from a specified category
router.get("/categories/gods/:godId", categoriesController.getGodById);

//-------------------------------------------------------------------
/*Routes related to the "Categories" entity, AVAILABLE TO ADMS ONLY.*/
//-------------------------------------------------------------------

//-------------------------------------------------
//Routes without parameters or body for Categories
router.get("/categoriestable", categoriesController.getTable);

//Routes with parameters but without body for Categories
router.get("/categoriestable/:id", categoriesController.getFromTableById);
router.delete(
    "/categoriestableDelete/:id",
    categoriesController.deleteCategoryById
);
//----------------------
//Routes with req.body for Categories
//router.post('/categories/table/create/')
const multer = require("multer");

const upload = multer({
    dest: "./public/assets/uploads/",
});

router.post(
    "/categoriestablecreate/",
    upload.single("file"),
    categoriesController.createCategory
);

//req.body:
// {
//     name: String,
//      src:String, (ex: "god.jpg")
//     hexColor: "#000000" (0-9,a-f)
// }

//router.put("/categories/table/Edit/:id"
router.put("/categoriestableEdit/:id", categoriesController.updateCategory);
//id=req.params.id
//req.body:
// {
//     name: String,
//      src:String, (ex: "god.jpg")
//     hexColor: "#000000" (0-9,a-f)
// }

module.exports = router;

//authentication.js
//Posteriormente, quando tiver autenticação:
//router.post("/categoriestablecreate/", authenticate,categoriesController.createCategory);
