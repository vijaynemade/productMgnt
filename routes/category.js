const express = require("express");
const categoryController = require("../controller/categoryController");
const isAuth = require("../middleware/session");

const router = express.Router();

router.post("/addCategory",isAuth ,categoryController.addCategory);
router.get("/getCategory",isAuth, categoryController.getCategory);

module.exports = router;