const { default: mongoose } = require("mongoose");
const bcryptjs = require("bcryptjs");

const BlogSchema = new mongoose.Schema({
    title : {type : String , trim : true , required : true ,},
    content : {type : String , trim : true , required : true ,},
    image : {type : String , trim : true , required : true ,},
    date : {type : String , trim : true , required : true ,},
    owner : {type : mongoose.Types.ObjectId , ref : 'User' , required :true},

});



const Blog = mongoose.model("Blog", BlogSchema);
module.exports = Blog;
