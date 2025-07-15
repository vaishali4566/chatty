import User from "../models/auth.model.js";
import bcryptjs from "bcryptjs";
import { generateToken } from "../utils/jwt.js";
import { generateProfilePicUploadUrl } from "../utils/wasabi.js";

export const signup = async (req, res) => {
    
    try {
        const { email, username, password } = req.body;

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "Email already exist" });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        const token = generateToken({ userId: newUser._id });

        return res.status(201).json({
            message: "signup successful",
            user: {
                id: newUser._id,
                name: newUser.username,
                email: newUser.email,
            },
            token,
        });
    } catch (error) {
        console.log("signup error", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const login = async (req, res) => {
    try {
        const {email , password} = req.body

        const userExist = await User.findOne({email})
        if(!userExist){
            return res.status(400).json({message : "Invalid email or password"})
        }

        const isPassword = await bcryptjs.compare(password, userExist.password)
        if(!isPassword){
            return res.status(400).json({message : "Invalid email or password"})
        }

        const token = generateToken({userId : userExist._id})

        return res.status(200).json({
            message : "login successful",
            user : {
                id : userExist._id,
                email : userExist.email
            },
            token
        })

    } catch (error) {
        console.log("login error", error)
        return res.status(500).json({message :"internal server error"})
    }
};

export const logout = (req, res) => {
  // Since JWT is stored on the client (e.g., localStorage), just tell client to remove it
  res.status(200).json({ message: "Logout successful. Please remove token on client." });
};

export const getProfilePicUploadUrl = async (req, res) => {
  try {
    const { fileType, userId } = req.body;

    if (!fileType || !userId) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const { signedUrl, fileKey } = await generateProfilePicUploadUrl(userId, fileType);

    const imageUrl = `https://${process.env.WASABI_BUCKET_NAME}.${process.env.WASABI_ENDPOINT.replace('https://', '')}/${fileKey}`;

    return res.status(200).json({ signedUrl, imageUrl, fileKey });
  } catch (error) {
    return res.status(500).json({ message: "Error generating upload URL", error: error.message });
  }
};


// signedUrl: to upload the file
// imageUrl: to later save in MongoDB and display as the profile pic
// fileKey: optional, for tracking or deletion later