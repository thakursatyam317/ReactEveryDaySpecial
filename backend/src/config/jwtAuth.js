// ✅ UPDATED FIXED CODE:
import jwt from "jsonwebtoken";

const genAuthToken = (userId, res) => {
  try {
    const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
console.log("Generated Token:", token); // Debugging line to check token generation
    res.cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
  } catch (error) {
    console.log(error);
  }
};

export default genAuthToken;
