import express from "express"
import {getAllImages , uploadImage} from "../controllers/image.controller.js"

const router = express.Router()

router.post("/upload", uploadImage)
router.post("/",getAllImages)

export default router
