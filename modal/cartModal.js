const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
items: [
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products',
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
            min : [1, 'Quantity must be at least 1'],
            default:1
          },
    }
]

  
}, {timestamps:true})

const carts = mongoose.model("carts",cartSchema)

module.exports = carts