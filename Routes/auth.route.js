const express = require('express')
const router = express.Router()
const authControllers = require('../Controllers/auth.control')

// Require Middlewares
const {RegisterValidation , LoginValidation} = require('../Middlewares/Validation.middleware')

router.post('/signup'  , RegisterValidation ,  authControllers.register)
router.post('/login' , LoginValidation , authControllers.login )

module.exports = router