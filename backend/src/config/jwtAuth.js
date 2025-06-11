import jwt from "jsonwebtoken";


export const genAuthToken = (userId, res)=>{
  const token = jwt.sign({Id: userId},process.env.JWT_SECRET, {
    expiresIn : "24h",
  });

  //cookie ko sdend kiya hai
  res.cookie("token", token , {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });

} 





