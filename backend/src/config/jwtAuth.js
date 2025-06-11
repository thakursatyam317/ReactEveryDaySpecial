import jwt from "jsonwebtoken";

export const genAuthToken = (userId, res) => {
  try {
    const token = jwt.sign({ key: userId }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    
    res.cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: false
    });
  } catch (error) {
    console.log(error);
  }
};
export default genAuthToken;