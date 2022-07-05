const express = require("express");
const userController = require("../controller/userController");

const router = express.Router();

router.post("/signUp", userController.signUp);
router.post("/login", userController.login);

router.get("/getSignUp", userController.getSignUp);
router.get("/getLogin", userController.getLogin);

router.get("/logOut", userController.logOut);


module.exports = router;