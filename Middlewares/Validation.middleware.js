const {RegisterSchema , LoginSchema} = require('../Services/userValidation.service')
const loggerEvent = require('../Services/logger.services')
const logger = loggerEvent('user')

function RegisterValidation (req , res , next){
    try {
        // let data = RegisterSchema.validate(req.body)
        // console.log(data);
        let {error} = RegisterSchema.validate(req.body)
        // console.log(error.details[0].message);
        if(error){
            let errMsg = error.details[0].message
            logger.warn(errMsg)
            return res.status(403).json({message : errMsg})
        } 
        next()
        // return res.send()
    }catch(error){
        logger.error(error.message)
        res.status(500).json({
            message : error.message
        })
    }

}

function LoginValidation (req , res , next){
    try {
        // let data = RegisterSchema.validate(req.body)
        // console.log(data);
        let {error} = LoginSchema.validate(req.body)
        // console.log(error.details[0].message);
        if(error){
            let errMsg = error.details[0].message
            logger.warn(errMsg)
            return res.status(403).json({message : errMsg})
        } 
        next()
        // return res.send()
    }
    catch (error){
        res.status(500).json({
            message : error.message
        })
    }
}

module.exports = {
    RegisterValidation , LoginValidation
}