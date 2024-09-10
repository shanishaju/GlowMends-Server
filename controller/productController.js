const products = require("../modal/productModal");
//db logics

exports.addProductController = async (req, res) => {
  console.log("inside product controller");

  const { productName, category, price, description } = req.body;
  const productImage = req.file.filename;

  //logic
  try {
    const exisitingProduct = await products.findOne({ productName });
    if (exisitingProduct) {
      return res.status(400).json("this product is already exist");
    } else {
      const newProduct = new products({
        productName,
        category,
        price,
        description,
        productImage,
      });
      //store the data to mongodb
      await newProduct.save();
      res.status(200).json(newProduct);
    }
  } catch (error) {
    res.status(406).json(error);
  }

  //multer-- Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.
};
//All project Controller
exports.getAllProductsController = async (req, res) => {
  const searchKey = req.query.search//search usring query parameter

  try {
    //serachkey logic
    //reqex -- regular expression
    //$options:"i" -- mongodb operation -- avoid casesensitivity

    const query = {
      category:{$regex:searchKey,$options:'i'}

    }
    //fect all products from db
    const allProducts = await products.find(query)
    if (allProducts) {
      res.status(200).json(allProducts)
    } else {
      res.status(402).json("No Products");
    }
  } catch (error) {
    res.status(401).json(error);
  }
};


//Single product API
exports.getSingleProductController = async (req,res)=>{
  const id = req.params.id;
  try { 
    const singleProduct = await products.findById(id);
    if(!singleProduct){
      res.status(200).json("no such product")

    }
    else{
      res.status(200).json(singleProduct)
    }
    

}
catch(error){
  res.status(400).json(error)
}
}


//admin all product 
exports.getAdminAllProductsController = async (req, res) => {

  try {
   
    //fect all products from db
    const allProducts = await products.find()
    if (allProducts) {
      res.status(200).json(allProducts)
    } else {
      res.status(402).json("No Products");
    }
  } catch (error) {
    res.status(401).json(error);
  }
};

//home project
exports.homeProductsController = async (req, res) => {
  try {
    const homeProducts = await products.find().limit(3);
    res.status(200).json(homeProducts);
  } catch (error) {
    res.status(403).json(error);
  }
};

//delete products

exports.deleteProductController = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const project = await products.findByIdAndDelete({ _id: id });
    res.status(200).json(project);
  } catch (error) {
    res.status(405).json(error);
  }
};

//edit product

exports.editProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const exisitingProduct = await products.findByIdAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    );
    res.status(200).json(exisitingProduct);
  } catch (error) {
    res.status(403).json(error);
  }
};


