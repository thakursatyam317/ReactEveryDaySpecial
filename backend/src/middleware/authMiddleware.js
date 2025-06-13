import jwt from "jsonwebtoken";
import User from "../models/userModels.js";

export const userProtect =async (req, res, next) => {
  const token = req.cookies.token;

  console.log("Cookies:", req.cookies);

  if (!token) {
    console.log("❌ No token found in cookie");
    return res.status(401).json({ message: "Token Not Found" });
  }

  try {
    console.log("🔍 Verifying Token:", token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // verifies and decodes token
    console.log("✅ Token Decoded:", decoded);

    const verifiedUser = await User.findById(decoded.key);
    req.user = verifiedUser; // decoded = { userId, email, iat, exp }
    next();
  } catch (err) {
    console.error("❌ Invalid Token:", err.message);
    return res.status(403).json({ message: "Invalid or Expired Token" });
  }
};
