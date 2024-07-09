const User = require('../Models/User.Model')
const loggerEvent = require('../Services/logger.services')
const logger = loggerEvent('auth')
const {compare} = require('bcryptjs')
const jwt = require('jsonwebtoken')


const userControllers = {
    // Register Function 
    register : async (req , res) =>{
        try {
            logger.info(req.body.firstName)
            let data = req.body
            let duplicateEmail = await User.findOne({email : data.email})
            if (duplicateEmail){
                return res.status(403).json({message : "Email Is Taken !"})
            }
            let newuser = new User(req.body)
            await newuser.save() // Must await before save
            res.status(201).json({message : "Account Created !"})
        }
        catch (error){
            logger.error(error.message)
            res.status(500).json({
                message : error.message
            })
        }
    },

    // Login Function
    login : async (req , res )=>{
        try {
            logger.info(req.body.email)
            let {email , password} = req.body
            let user = await User.findOne({email})
            if (! user){
                return res.status(404).json({message:'Invalid Email Or Password'})
            }

            const validpassword = await compare(password , user.password)
            if ( ! validpassword){
                return res.status(404).json({message : "Invalid Email Or Password"})
            }

            // Create Token 
            let token = await jwt.sign({id : user._id} , process.env.SECERTKEY )
            console.log(token);
            res.cookie('access_token' , `Barear ${token}` , {
                httpOnly : true,
                maxAge : 1000 * 60 * 60 * 24 * 2
            })
            user.tokens.push(token)
            await user.save()
            res.json()
            
            
        } catch (error) {
            logger.error(error.message)
            res.status(500).json({
                message : error.message
            })
        }
    }
}
module.exports = userControllers