const express = require('express')
const router = express.Router()
const authRoutes = require('./auth.route')
const userRoutes = require('./user.route')
const blogRoutes = require('./blog.route')

// USE ROUTES
router.use('/auth' ,authRoutes)
router.use('/user' ,userRoutes)
router.use('/blog' ,blogRoutes)

module.exports = router