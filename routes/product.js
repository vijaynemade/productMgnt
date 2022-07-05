const express = require('express');
var productController = require("../controller/productController");
var upload = require("../middleware/upload");
const isAuth = require("../middleware/session");

const router = express.Router();

router.get("/getAddProduct", isAuth, productController.getAddProduct);
router.post("/addProduct", isAuth , upload("productImage"), productController.addProduct);
router.get("/", productController.productList);
router.post("/updateProduct",isAuth, upload("productImage"), productController.updateProduct);
router.get("/getProductById/:id",isAuth, productController.getProductById);
router.post("/deleteProduct",isAuth, productController.deleteProduct);

module.exports = router;
