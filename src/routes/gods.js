const express = require("express");
const router = express.Router();
const godsController = require("../controllers/gods.js");
const upload = require("./multer.js");

//Import function to authenticate user
const authenticate = require("../middlewares/authentication.js");

//-------------------------------------------------------------------
/*Routes related to the "gods" entity, AVAILABLE TO ADMS ONLY.*/
//-------------------------------------------------------------------

//-------------------------------------------------
//Routes without parameters or body for gods
router.get("/godstable", godsController.getAll);

//-------------------------------------------------
//Routes with parameters but without req.body for gods
router.get("/godstable/:id", godsController.getById);
router.delete("/godstable/:id", authenticate, godsController.deleteGodById);
//----------------------

//Routes with req.body for gods
router.post(
    "/godstable/",
    authenticate,
    upload.single("file"),
    godsController.createGod
);
//req.body:
// {
//      name: String,
//      status: String,
//      category_id: String,
//      resume: String,
//      src:String
// }

//router.put("/gods/table/Edit/:id"
router.put(
    "/godstable/:id",
    authenticate,
    upload.single("file"),
    godsController.updateGod
);
//id=req.params.id
//req.body:
// {
//      name: String,
//      status: String,
//      category_id: String,
//      resume: String,
//      src:String,
// }

////Routes with req.body for for filtres gods by KEYWORDS
router.get("/searchgods", godsController.getGodsByKeywords);

module.exports = router;
