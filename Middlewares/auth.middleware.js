const User = require('../Models/User.Model')
const loggerEvent = require('../Services/logger.services')
const logger = loggerEvent('user')
const jwt = require('jsonwebtoken')

const authentication = async (req , res , next) => {
    try {
        if (! req.cookies){
            return res.status(401).json({message : "Unauthorized  User"})
        }
        let token = req?.cookies?.access_token?.split(' ')[1]
        // console.log(token);

        let validToken =await jwt.verify(token  , process.env.SECERTKEY)
        // console.log(validToken);

        if (! validToken){
            return res.status(401).json({message : "Unauthorized  User"})
        }

        let user = await User.findById(validToken.id)

        if (! user ){
            return res.status(401).json({message : "Unauthorized  User"})
        }
        if (! user.tokens.includes(token)){
            return res.status(401).json({message : "Unauthorized  User"})
        }

        // handle data from server to Client
        delete user.tokens 
        delete user.password
        req.user = user
        // Handle Token
        req.token = token
        next()
    } catch (error) {
        logger.error(error.message)
            res.status(401).json({
                message : error.message
            })
    }
}


const AdminAuthorization = async (req, res , next)=>{
    try {
        authentication(req , res , ()=>{
            if (! req.user.isAdmin){
                return res.status(403).json({message : "Unauthorized  Admin"})
            }else {
                next()
            }
        })
    } catch (error) {
        logger.error(error.message)
            res.status(401).json({
                message : error.message
        })
    }
}
module.exports = {
    authentication , AdminAuthorization
}