const express = require("express");
const router = express.Router();
const godsController = require("../controllers/gods.js");

//-------------------------------------------------------------------
/*Routes related to the "gods" entity, AVAILABLE TO ADMS ONLY.*/
//-------------------------------------------------------------------

//-------------------------------------------------
//Routes without parameters or body for gods
router.get("/godstable", godsController.getAll);

//-------------------------------------------------
//Routes with parameters but without req.body for gods
router.get("/godstable/:id", godsController.getById);
router.delete("/godstableDelete/:id", godsController.deleteGodById);
//----------------------
//Routes with req.body for gods
//usando o multer
const multer = require("multer");

const upload = multer({
    dest: "./public/assets/uploads/",
});

//router.post('/gods/table/create/')
router.post(
    "/godstablecreate/",
    upload.single("file"),
    godsController.createGod
);
//req.body:
// {
//     name: String,
//      status: String, (ex: "Deus do Milho")
//      category_id: String
//      resume: String
//      src:String, (ex: "god.jpg")
// }

//router.put("/gods/table/Edit/:id"
router.put("/godstableEdit/:id", godsController.updateGod);
//id=req.params.id
//req.body:
// {
//     name: String,
//      status: String, (ex: "Deus do Milho")
//      category_id: String
//      resume: String
//      src:String, (ex: "god.jpg")
// }

module.exports = router;
