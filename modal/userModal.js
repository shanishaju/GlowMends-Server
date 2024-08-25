//1 import mongoose
const mongoose = require('mongoose')
//3
const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }

})

//2
const users = mongoose.model("users",userSchema)

//4
module.exports = users