const jwt = require('jsonwebtoken')


//register

const users = require("../modal/userModal");

exports.registerController = async(req, res)=>{
  
      const {firstname, lastname, email, password} =req.body
      console.log(firstname,lastname,email,password);
      //   after creating modal. check the datas in mongo db if no add to db\
    try {
        //mongo db operations // first email from the model. here both are same
        const existingUser = await users.findOne({email})
      if(existingUser){
         res.status(406).json('Account Already Exist')
      }
      else{
        const newUser = new users({
          firstname,lastname,email,password
      })
      //save() - store the data in mongodb
      await newUser.save()
      res.status(200).json(newUser)
      }

    } catch (error) {
      res.status(401).json(`registration failed due to ${error}`)
    }
    
}

//login
exports.loginController = async(req,res)=>{
  const {email,password} = req.body

  try {
    const existingUser = await users.findOne({email,password})
    if(existingUser){

      //token for authentication and send token to frontend
      const token = jwt.sign({userId:existingUser._id},'secretKey')
      res.status(200).json({existingUser,token})
    }
    else{
      res.status(406).json('Invalid emailId or Password')
    }
    
  } catch (error) {
    res.status(401).json(`Login failed due to ${error}`)
     
  }

  //toekn used for generatig tokens for authorization
}

