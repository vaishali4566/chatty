import mongoose from "mongoose";

const imageSchema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    imageUrl : {
        type: String,
        required : true
    },
    uploadedBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    createdAt : {
        type : Date,
        default : Date.now()
    }
})

const Image = mongoose.model("Image", imageSchema)

export default Image