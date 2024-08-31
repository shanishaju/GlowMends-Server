const products = require("../modal/productModal")

exports.addProductController = async (req, res) => {
  console.log("inside product controller")

  const { productName, category, price, description } = req.body
  const productImage = req.file.filename

  //logic
  try {
    const exisitingProduct = await products.findOne({ productName })
    if (exisitingProduct) {
      return res.status(400).json("this product is already exist")
    } else {
      const newProduct = new products({
        productName,category,price,description,productImage
      })
      //store the data to mongodb
      await newProduct.save()
      res.status(200).json(newProduct)

    }
  } catch (error) {
    res.status(406).json(error)
  }

  //multer-- Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.
}