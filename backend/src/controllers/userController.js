import bcrypt from "bcrypt";
import User from "../models/userModels.js";

export const getProfile = async (req, res) => {
  res.json(req.user);
};


export const updateProfile = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findById(req.user._id);

  user.name = name || user.name;
  user.email = email || user.email;
  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }
    await user.save();
  res.json(user);
};