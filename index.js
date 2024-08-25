// 1.import dotenv (not using) to load environment variable
require('dotenv').config()

//2. import express
const express = require('express')

//3.import cors
const cors = require('cors')

//9. import router the use it under step6
const router = require('./routes')

//11 import connection.js after creating db and connection.js created
require('./connection')

//4.create express server
const pfServer = express()

//5.use cores to communicate view
pfServer.use(cors())

//6.  use json method -Returns middleware that can parses json
pfServer.use(express.json())

//10 use router
pfServer.use(router)
 
//7.set port number
PORT = 4000 || process.env.PORT

//8.listen to the port  - to resolve the request
pfServer.listen(PORT,()=>{
    console.log(`Server running successfully at port number : ${PORT}`);
    
})

//get  request
// pfServer.get('/',(req,res)=>{
//     res.send('Hello from express server')
// })