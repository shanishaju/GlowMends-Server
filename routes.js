//1. import express
const express = require("express");

//import usercontroller after it creats
const usercontroller = require("./controller/userController");
//import addProductController
const productController = require("./controller/productController");
//2.create an object for router class
const router = new express.Router();





//3. set path for each request from view(frontend)

//register
router.post("/register", usercontroller.registerController);

//login
router.post("/login", usercontroller.loginController);

//admin addProduct
router.post("/addproduct", productController.addProductController);







//4 export the router then imoort it on index.js
module.exports = router;
