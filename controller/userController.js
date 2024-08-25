


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