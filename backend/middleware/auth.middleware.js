import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if token is present
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user ID to request object for downstream use
    // Jo user is request ko bhej raha hai, uska data req.user me rakh lo."
    req.user = decoded;

    next(); // Continue to the next middleware or controller
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    return res.status(401).json({ message: "Unauthorized or invalid token" });
  }
};

// 🔹 4. Protected routes pe token bhejna padta hai
// Ab agar user dashboard pe jaata hai, ya profile fetch karta hai,
// to backend ko batana padta hai:

// "Main Vaishali hoon, ye raha mera token"

// Yeh hum bhejte hain headers me:

// const token = localStorage.getItem("token");

// axios.get("http://localhost:3000/api/auth/me", {
//   headers: {
//     Authorization: `Bearer ${token}`
//   }
// });
// ✅ Yahan likhte hain:
// "Authorization: Bearer <token>"
