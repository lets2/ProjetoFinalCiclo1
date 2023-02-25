const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.js");
const upload = require("./multer.js");

//Import middleware to authenticate:
const authenticate = require("../middlewares/authentication.js");
//-------------------------------------------------------------------
/*Routes related to the "USERS/ADMs" entity, AVAILABLE TO ANY USER.*/
//-------------------------------------------------------------------

//rota de login
router.post("/login", usersController.login);

//rota de logout
router.delete("/logout", usersController.logout);
//
//rota paracadastrar novo adm

router.post("/registerAdm", usersController.registerNewAdm);
//req.body
//{
//  username,
//  password, //without cryptografia
//  email,
//}

module.exports = router;
