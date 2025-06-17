import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./src/router/authRouter.js";
import userRoutes from "./src/router/userRouter.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",  // Adjust to your React frontend URL
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));  // serve public/uploads

 mongoose.connect(process.env.MONGO_URI)
   .then(() => console.log("🗄️ MongoDB connected"))
   .catch(console.error);

app.use("/auth", authRoutes);
app.use("/user", userRoutes);

app.listen(process.env.PORT, () => console.log(`🚀 Server running on port ${process.env.PORT}`));
