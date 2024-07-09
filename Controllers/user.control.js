const User = require('../Models/User.Model')
const loggerEvent = require('../Services/logger.services')
const logger = loggerEvent('user')
const jwt = require('jsonwebtoken')
const {compare , hash} = require('bcryptjs')

const UserControllers = {
    // Delete user
    deleteUser : async (req , res )=>{
        try {
            logger.info(req.body)
            let {id} = req.params
            await User.findByIdAndDelete(id)

            res.send({message : "Account Deleted !"})
        } catch (error) {
            logger.error(error.message)
            res.status(500).json({
                message : error.message
            })
        }
    },
    updateUser : async(req , res)=>{
        try {
            if (req.file){
                var imagePath = `/api/user/${req.file.filename}`

            }
            let user  = await User.findByIdAndUpdate(req.user._id ,{...req.body , image : imagePath}  , {new : true})
            res.send(user)

        } catch (error) {
            logger.error(error.message)
            res.status(500).json({
                message : error.message
            })
        }
    },
    updatePassword : async (req ,res )=>{
        try {
            let {newPassword , oldPassword} = req.body
            // console.log(req.body_id);
            let user = await User.findById(req.user._id)
            let validPassword = await compare(oldPassword , user.password)
            if (! validPassword){
                return res.status(401).json({message : "Invalid Password"})
            }
            user.password = newPassword
            await user.save()
            res.status(200).json({message : "Password Changed Successfully !"})
        } catch (error) {
            logger.error(error.message)
            res.status(500).json({
                message : error.message
            })
        }
    }, 
    getUser: async (req , res )=> {
        try {
            let user = await User.findById(req.user._id)
            res.status(200).json({message : user})
        } catch (error) {
            logger.error(error.message)
            res.status(500).json({
                message : error.message
            })
        }
    },
    logOut : async (req , res )=>{
        try {
            let user = await User.findById(req.user._id)
            user.tokens = user.tokens.filter((item)=> item !== req.token)
            await user.save()
            
            res.cookie('access_token' , "" , {
                httpOnly : true,
                maxAge : 1000 * 60 * 60 * 24 * 2
            })
        } catch (error) {
            logger.error(error.message)
            res.status(500).json({
                message : error.message
            })
        }
    }
}
module.exports = UserControllers