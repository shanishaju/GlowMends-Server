//multer- to control req res cycle//

// 1) import multer
const multer = require("multer")


// 2) store
const storage = multer.diskStorage({
  //where the file is stored
  destination: (req, file, callback) => {
    callback(null, "./uploads") // path in which the file is stored.
  },
  //by which name the file should be stored
  filename: (req, file, callback) => {
    const filename = `image-${Date.now()}-${file.originalname}`//format of storing the file
    callback(null, filename)//setting the name
  }
})


//3)fileFilter --Set this to a function to control which files should be uploaded and which should be skipped. 
const fileFilter=(req,file,callback)=>{
     //logic
     if(file.mimetype=="image/jpeg" || file.mimetype=="image/png" || file.mimetype=="image/jpg"){
        callback(null,true)
     }
     else{
        callback(null,false)
        return callback(new Error('only png,jpeg,jpg files are accepted'))
     }
}