//1. import express
const express = require("express");

//import usercontroller after it creats
const usercontroller = require("./controller/userController");
//import addProductController
const productController = require("./controller/productController");
const contactsController = require("./controller/contactsController");

const multerConfig = require("./middleware/multerMiddleware");
//2.create an object for router class
const router = new express.Router();





//3. set path for each request from view(frontend)

//register
router.post("/register", usercontroller.registerController);

//login
router.post("/login", usercontroller.loginController);

//admin addProduct
router.post("/addproduct",multerConfig.single('productImage'), productController.addProductController);

//all product
router.get("/allproducts",productController.getAllProductsController)

//home products
router.get("/homeproducts",productController.homeProductsController)

//delete products id parameter

router.delete("/delete/:id",productController.deleteProductController)


//update product
router.put("/editproject/:id",productController.editProductController)

//contact
router.post("/contact",contactsController.contactController)

//getcontact
router.get("/getcontact",contactsController.getAllContactController)
//4 export the router then imoort it on index.js
module.exports = router;
