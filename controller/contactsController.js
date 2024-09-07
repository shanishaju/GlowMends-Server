const jwt  = require('jsonwebtoken')

//contact
 const contacts = require("../modal/contactModal")

 exports.contactController = async(req,res)=>{
    const {username,email,number,comment} = req.body
    console.log(username,email,number,comment);
    try {
        const newContact = new contacts({
            username,email,number,comment
        })
        await newContact.save()
        res.status(201).json(newContact)
        
    } catch (error) {
        res.status(401).json(error)
        
    }
    
 }
 // all conatct
 exports.getAllContactController = async(ewq,res)=>{
    try {
        const allconnect = await contacts.find()
        if(allconnect){
            res.status(200).json(allconnect)
        }
        else{
            res.status(404).json("No Comments")
        }
        
    } catch (error) {
        res.status(402).json(error)
        
    }
 }



