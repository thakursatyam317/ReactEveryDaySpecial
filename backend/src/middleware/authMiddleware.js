import jwt from "jsonwebtoken";
import User from "../models/userModels.js";

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
// This middleware checks for a valid JWT token in the Authorization header, and if valid, it attaches the user information to the request object.      