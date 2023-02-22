const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.js");
const upload = require("./multer.js");

//-------------------------------------------------------------------
/*Routes related to the "USERS/ADMs" entity, AVAILABLE TO ANY USER.*/
//-------------------------------------------------------------------

//CREATING LOGIN ROUTE
//rota de login
router.post("/login", usersController.login);

//rota de logout
router.delete("/logout", usersController.logout);
//

module.exports = router;
