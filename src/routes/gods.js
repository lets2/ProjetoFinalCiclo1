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
//Routes with parameters but without body for gods
router.get("/godstable/:id", godsController.getById);

module.exports = router;
