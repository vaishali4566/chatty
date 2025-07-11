import mongoose from "mongoose";

const UserSchema  = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        trim : true
    },
    password : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        lowercase: true,
        trim : true,
        unique : true,
        required : true
    },
    profilePic : {
        type : String,
        default: null
    },
    isVerified : {
        type: Boolean,
        default : false
    }
}, {timestamps : true})

const User = new mongoose.model("User", UserSchema)

export default User;