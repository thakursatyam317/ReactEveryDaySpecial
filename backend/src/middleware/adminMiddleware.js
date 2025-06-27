import jwt from "jsonwebtoken";
import User from "../models/userModels.js";

export const userProtect = async (req, res, next) => {
  const token = req.cookies.token;

  console.log("Cookies:", req.cookies);

  if (!token) {
    console.log("❌ No token found in cookie");
    return res.status(401).json({ message: "Token Not Found" });
  }

  try {
    console.log("🔍 Verifying Token:", token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // should contain userId
    console.log("✅ Token Decoded:", decoded);

    const verifiedUser = await User.findById(decoded.userId); // ✅ fixed this line
    if (!verifiedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = verifiedUser;
    next();
  } catch (err) {
    console.error("❌ Invalid Token:", err.message);
    return res.status(403).json({ message: "Invalid or Expired Token" });
  }
};

// ✅ Optional: Middleware for Admin-Only Routes
export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Admin access only" });
  }
};
