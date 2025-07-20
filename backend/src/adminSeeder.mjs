// src/adminSeeder.mjs
import mongoose from "mongoose";
import bcrypt from "bcrypt"; // use "bcryptjs" if you installed that instead
import dotenv from "dotenv";
import User from "./models/userModels.js"; //  Make sure this path is correct

dotenv.config(); //  Load environment variables

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/hrdb";

const createAdmin = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const adminExists = await User.findOne({ email: "admin@gmail.com" });

    if (adminExists) {
      console.log("⚠️ Admin already exists");
    } else {
      const hashedPassword = await bcrypt.hash("admin123", 10);

      const adminUser = new User({
        fullName: "Admin",
        email: "admin@gmail.com",
        password: hashedPassword,
        role: "admin",
        phone: "0000000000", // Required by schema
        gender: "Male",       //  Required by schema
        dob: "2000-01-01",    //  Required by schema
      });

      await adminUser.save();
      console.log("✅ Admin user created successfully");
    }
  } catch (err) {
    console.error("❌ Seeder Error:", err.message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 MongoDB disconnected");
  }
};

createAdmin();
