import express from "express"
import { sendMessage, getMessage , deleteMessage } from "../controllers/message.controller.js"
const router = express.Router()

router.post("/send", sendMessage)

router.get("/:userId", getMessage)

router.delete("/:id", deleteMessage)

export default router