//import cart modal

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
          cart.items[itemIndex].quantity += quantity;
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
  
//get items in cart
exports.getCartItemsController = async(req,res)=>{
    const {  userId } = req.params

    try {
        const carts = await carts.findOne({userId}).populate('items.productId')  // .populate() is used to automatically fill in data from related collections, instead of just showing their ObjectId.
        res.status(200).json(carts)
        
        
    } catch (error) {
        res.status(401).json(error)
    }
}

//remove item from cart

 exports.removeFromCartController = async(req,res)=>{
    const { userId, productId }= req.params
    try { 
        const carts = await carts.findOne({userId})
        if(!carts) {
            res.status(404).json("Cart not found")
        }
        carts.items = carts.items.filter(item=> item.productId.toString() !== productId)
        await carts.save()
        res.status(200).json(carts)
    } catch (error) {
        res.status(402).json(error)
        
    }
 }
