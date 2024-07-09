const Blog = require('../Models/Blog.Model')
const loggerEvent = require('../Services/logger.services')
const logger = loggerEvent('blog')

const fs = require('fs')

const BlogControllers = {
    createBlog : async (req , res) =>{
        try {
            // console.log(req.file);
            const date = new Date().toISOString()
            let newBlog = new Blog({...req.body , owner : req.user._id , date})

            if (req.file){
                newBlog.image = `/api/blog/${req.file.filename}`
            }
            await newBlog.save()
            res.send()
        } catch (error) {
            logger.error(error.message)
            res.status(500).json({
                message : error.message
            })
        }
    },
    getBlog : async (req , res) => {
        try {
            let blogs =await Blog.find({owner : req.user._id})
            res.send(blogs)
        } catch (error) {
            logger.error(error.message)
            res.status(500).json({
                message : error.message
            })
        }
    },
    updateBlog : async (req ,res)=>{
        try {   
            // Update file 
            // console.log(req.file);
            let blogData = await Blog.findById(req.body._id)
            console.log(blogData)
            if (req.file){
                let imageName =blogData.image?.split('/')[3] 
                // To Delete Old File 
                let deleteOldFile = `./Uploads/${imageName}`
                fs.unlinkSync(deleteOldFile)
                
                var imagePath = `/api/blog/${req.file.filename}`
            }
            // we must pass _id in the form data to run of the user
            console.log(req.body._id );
            let blog = await Blog.findByIdAndUpdate(req.body._id , {...req.body , image : imagePath} , {new : true})
            // console.log(blog);
            // await blog.save()
            res.send()

        } catch (error) {
            logger.error(error.message)
            res.status(500).json({
                message : error.message
            })
        }
    },
    deleteBlog : async (req , res )=>{
        try {
            let {id} = req.params
            await Blog.findByIdAndDelete(id)
            res.send()
        } catch (error) {
            logger.error(error.message)
            res.status(500).json({
                message : error.message
            })
        }
    },
    getAllBlogs : async(req , res )=>{
        try {
            logger.info(req.user?.filename)
            let blogs =await Blog.find({}).populate('owner')

            res.json(blogs)
        } catch (error) {
            logger.error(error.message)
            res.status(500).json({
                message : error.message
            })
        }
    }
}
module.exports = BlogControllers