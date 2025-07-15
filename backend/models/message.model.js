import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    receiverId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    content : {
        type :String,
        required : true
    },
    timeStamp : {
        type : Date,
        default : Date.now()
    },
})

const Message = new mongoose.model("Message", messageSchema)

export default Message;