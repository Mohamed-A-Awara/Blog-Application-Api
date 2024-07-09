const multer = require('multer')
const path = require('path')

let blogStorage = multer.diskStorage({
    destination : function (req ,file , callback) {
        callback(null , "Uploads/")
    },
    filename : function (req , file , callback){
        let extention = path.extname(file.originalname)
        callback(null , Date.now() + extention)
    }
})

let blogUpload = multer({
    storage  : blogStorage,
    limits : {fileSize : 1024 * 1024 * 5 },
    fileFilter : (req , file , cb )=>{
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"){
            cb(null , true)
        }else {
            cb(null , false)
        }
    }

})

module.exports = blogUpload