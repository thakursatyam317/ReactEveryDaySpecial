import User from "../models/userModels.js";
import bcrypt from "bcrypt";
import generateToken from "../config/jwtAuth.js";

// ✅ Register User
export const userRegister = async (req, res) => {
  try {
    const { fullName, email, phone, dob, gender, password } = req.body;

    // Check all fields
    if (!fullName || !email || !phone || !dob || !gender || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate placeholder profile image
    const profilePic = `https://placehold.co/600x400?text=${fullName
      .charAt(0)
      .toUpperCase()}`;

    // Create user
    const newUser = await User.create({
      fullName,
      email,
      phone,
      dob,
      gender,
      password: hashedPassword,
      profilePic,
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        fullName: newUser.fullName,
        email: newUser.email,
        phone: newUser.phone,
        dob: newUser.dob,
        gender: newUser.gender,
        profilePic: newUser.profilePic,
        role: newUser.role,
        status: newUser.status,
      },
    });
  } catch (error) {
    console.error("Register Error:", error.message);
    res.status(500).json({ message: "Server error during registration" });
  }
};

// ✅ Login User
export const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate token in cookie
    generateToken(user._id, res);

    res.status(200).json({
      message: "User logged in successfully",
      user: {
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        dob: user.dob,
        gender: user.gender,
        profilePic: user.profilePic,
        role: user.role,
        status: user.status,
      },
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ message: "Server error during login" });
  }
};

// ✅ Logout User
export const userLogout = (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error during logout" });
  }
};
