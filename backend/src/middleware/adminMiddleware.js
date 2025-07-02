import jwt from "jsonwebtoken";
import User from "../models/userModels.js";

// ✅ Middleware for protected routes (token in cookies)
export const userProtect = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Token Not Found in cookies" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user; // attach user object to request
    next();
  } catch (err) {
    console.error("❌ Invalid Token:", err.message);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

// ✅ Middleware to allow only admin users after userProtect
export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Admin access only" });
  }
};

// ✅ Middleware for admin token in headers (Bearer Token method)
export const adminAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No Bearer token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id || decoded.userId); // support both keys

    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden: Admins only" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("adminAuth error:", err.message);
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
