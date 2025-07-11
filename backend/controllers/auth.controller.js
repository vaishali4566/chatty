import User from "../models/auth.model.js";
import bcryptjs from "bcryptjs";
import { generateToken } from "../utils/jwt.js";

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
                name: newUser.name,
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

