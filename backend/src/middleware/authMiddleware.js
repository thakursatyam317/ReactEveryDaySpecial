import jwt from "jsonwebtoken";

export const userProtect = (req, res, next) => {
  const token = req.cookies.token;

  console.log("Cookies:", req.cookies); // Already working

  if (!token) {
    console.log("No token found in cookie");
    return res.status(401).json({ message: "Token Not Found" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // ✅ Make sure JWT_SECRET is set
    req.user = decoded; // ✅ Add user info to request
    next(); // ✅ Proceed
  } catch (err) {
    console.log("Invalid Token", err);
    return res.status(403).json({ message: "Invalid Token" });
  }
};
