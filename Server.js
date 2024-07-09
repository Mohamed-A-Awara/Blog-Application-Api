// Require Package
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const routes = require('./Routes/index.routes')

const app = express()
const port = process.env.PORT || 3000

// Connect To DB
require('./DB/mongoose')

// USE PACKAGES
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}))
app.use('/api', routes)
app.use(morgan('dev'))

// PUBLIC DIRCTORY
app.use("/api/blog" , express.static('./Uploads'))




// LISTEN 
app.listen(port ,()=>{
    console.log(`App Is Running On Port : ${port}`);
} )