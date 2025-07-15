import Message from "../models/message.model.js"

export const sendMessage = async(req , res)=>{
    try {
        const {senderId , receiverId , content} = req.body

        if(!senderId || !receiverId || !content){
            return res.status(400).json({message : "Missing fields are required"})
        }

        const newMessage = new Message.create({
            senderId,
            receiverId,
            content
        })

        return res.status(201).json({
            message : "Message sent successfully",
            data : newMessage
        })
    } catch (error) {
        console.log("sendMessage error", error);
        return res.status(500).json({message : "Internal server error"})
    }
}

export const getMessage = async(req , res)=>{
    try {
        const {userId} = req.params
        const currentUserId = req.user.userId;

        if(!userId || !currentUserId){
            return res.status(400).json({message : "User ids are required"})
        }

        const message = await Message.find({
            $or : [
                {senderId : currentUserId, receiverId : userId},
                {senderId : userId, receiverId : currentUserId}
            ]
        }).sort({createdAt : 1})

        return res.status(200).json(message)
    } catch (error) {
        console.log("getMessage error", error);
        return res.status(500).json({message : "Internal server error"})
    }
}

export const deleteMessage = async(req , res)=>{
    try {
        const {id} = req.params

        const deleteMessage = await Message.findByIdAndDelete(id)

        if(!deleteMessage){
            return res.status(400).json({message : 'Message not found'})
        }

        return req.status(200).json({message : "Message deleted", data : deleteMessage})
    } catch (error) {
        
        console.log("deleteMessage error", error);
        return res.status(500).json({message : "Internal server error"})
    }
}