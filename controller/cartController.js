//import cart modal

const { default: mongoose } = require("mongoose");
const carts = require("../modal/cartModal")

//import product modal

const products = require("../modal/productModal")

//addToCart Item
exports.addTocartController = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  console.log("Received request:", req.body); // Log the request body
  
  try {
    let cart = await carts.findOne({ userId: userId });

    if (!cart) {
      cart = new carts({ userId, items: [{ productId, quantity }] });
      console.log("Creating a new cart:", cart); // Log the new cart creation
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity = quantity;
        console.log("Updated quantity for existing item:", cart.items[itemIndex]); // Log the updated item
      } else {
        cart.items.push({ productId, quantity });
        console.log("Added new item to cart:", cart.items); // Log new item addition
      }
    }

    await cart.save();
    console.log("Cart saved:", cart); // Log the saved cart
    return res.status(200).json(cart);
  } catch (error) {
    console.error("Error in adding to cart:", error); // Log the error
    return res.status(400).json({ error: error.message });
  }
};
  
//get items from cart
// exports.getCartItemsController = async(req,res)=>{
//     const {  userId } = req.params

//     try {
//         const cart = await carts.findOne({userId}).populate('items.productId')  // .populate() is used to automatically fill in data from related collections, instead of just showing their ObjectId.
//         res.status(200).json(cart)
//         console.log(cart);
        
        
        
//     } catch (error) {
//         res.status(401).json(error)
//     }
// }

//get items from cart


exports.getCartItemsController = async (req, res) => {
  const { id } = req.params; 
  const { quantity } = req.body; // Product ID and new quantity from the request body


  try {
    const objectId = new mongoose.Types.ObjectId(id); // Use 'new' keyword

    // Fetch the cart for the user and populate the product details
    const userCart = await carts.findOne({ userId: objectId }).populate('items.productId');
      
    if (!userCart) {
      return res.status(404).json({ message: 'Cart not found for this user' });
    }
    
    res.status(200).json(userCart);

    console.log(userCart); // Logging cart details for debugging
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

//remove item from cart

 exports.removeFromCartController = async(req,res)=>{
    const { userId, productId }= req.params
    try {
        const cart = await carts.findOne({userId})
        if(!cart) {
            res.status(404).json("Cart not found")
        }
        cart.items = cart.items.filter(item=> item.productId.toString() !== productId)
        await cart.save()
        res.status(200).json(carts)
    } catch (error) {
        res.status(402).json(error)
        
    }
 }