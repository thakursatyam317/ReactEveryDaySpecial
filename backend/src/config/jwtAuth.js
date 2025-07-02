import jwt from "jsonwebtoken";

const genAuthToken = (userId, res) => {
  const token = jwt.sign({userId : userId}, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  // Optionally set token in cookie (for server-side use)
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return token; // ✅ Important: return the token to use in res.json
};

export default genAuthToken;
