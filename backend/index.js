import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js"
import { connectDb } from "./utils/db.js";
import cors from "cors"
dotenv.config();

const app = express();

app.use(cors({
  origin : 'http://localhost:5173',
  credentials : true
}))
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => {
  res.send("success");
});

connectDb().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`server is listening at port ${process.env.PORT} and connected to mongodb`);
  });
});














// CORS = Cross-Origin Resource Sharing

// Jab tumhara frontend (React: localhost:5173)
// aur backend (Node.js: localhost:3000)
// alag ports pe ya alag domains pe chal rahe hote hain,
// to browser security ke liye request block kar deta hai.

// ✅ Is problem ko solve karne ke liye hum CORS middleware lagate hain.

// 🧪 Example Without CORS:
// React se request bheji:

// axios.post("http://localhost:3000/api/auth/login", {...})
// Browser bolega ❌:

// Access to fetch at 'http://localhost:3000/...' from origin 'http://localhost:5173'
// has been blocked by CORS policy.
// ✅ Solution: Use CORS in Express

// import cors from 'cors';

// app.use(cors({
//   origin: 'http://localhost:5173',  // ✅ allow React app to talk to backend
//   credentials: true                 // ✅ allow cookies or headers like Authorization
// }));
// 🔍 Explanation of Options:
// Option	Meaning
// origin	✅ Sirf isi domain se request allow karni hai (React dev server)
// credentials	✅ Agar tum cookies, Authorization headers ya session bhejna chahte ho

// ⚠️ Important: Agar credentials: true lagate ho...
// To tumhe React me bhi axios me withCredentials: true lagana padta hai:

// axios.post("http://localhost:3000/api/auth/login", data, {
//   withCredentials: true
// });
// Ye tab zaroori hota hai jab:

// Tum cookies bhej rahe ho (JWT in cookie)

// Ya server me res.cookie(...) use ho raha hai

