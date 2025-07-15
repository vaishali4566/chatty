import Message from "../../models/message.model";

const chatHandler = async(ws , data , wss)=>{
    try {
        const parsed = JSON.parse(data)
        const {senderId , receiverId , content} = parsed
    
        if(!senderId || !receiverId || !content){
            return ws.send(JSON.stringify({error : "Missing fields are required"}))
        }
    
        const savedMessage = await Message.create({
            senderId,
            receiverId,
            content
        })
    
        wss.clients.forEach((client)=>{
            if(client.readyState === ws.OPEN){
                client.send(JSON.stringify(savedMessage))
            }
        })
    } catch (error) {
        console.log("websocket error", error);
        ws.send(JSON.stringify({error : "Something went wrong"}))
        
    }
}

export default chatHandler