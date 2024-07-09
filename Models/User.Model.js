const { default: mongoose } = require("mongoose");
const bcryptjs = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    firstName: { type: String, trim: true, required: true },
    lastName: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true, unique: true },
    password: { type: String, trim: true, required: true },
    isAdmin: { type: Boolean, default: false },
    image: { type: String,trim : true },
    tokens: [
        { type: String, expires: "2d", trim: true, },
    ],
  // role : { type : String , enum : ['user' , 'admin'] }
});

// Hashed Password
UserSchema.pre("save", async function (next) {
    try {
        let User = this;
        if (!User.isModified("password")) {
        return next();
        }
        User.password = await bcryptjs.hash(User.password, 8);
        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
