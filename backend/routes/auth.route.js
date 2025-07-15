import express from "express"
import {signup ,login , logout, getProfilePicUploadUrl} from "../controllers/auth.controller.js"

const router = express.Router()

router.post("/login",login)

router.post("/signup", signup)

router.post("/logout",logout)

router.post("/profile-pic-url", getProfilePicUploadUrl)

export default router