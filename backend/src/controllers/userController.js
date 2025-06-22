import User from "../models/userModels.js";
import  cloudinary  from "../config/cloudinary.js";

export const userProfile = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      return next(error);
    }
  

    res.status(200).json({
      message: "User profile fetched successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        dob: user.dob,
        gender: user.gender,
        profilePic: user.profilePic,
      },
    });
  } catch (error) {
    next(error);
  }
};



export const updateUserProfile = async (req, res, next) => {
  try {
    const { fullName, email, phone, dob, gender } = req.body;
    const photo = req.file;

    console.log("Debug: Incoming body", req.body);
    console.log("Debug: Current user", req.user);

    if (!fullName || !email) {
      return res.status(400).json({ message: "Full name and email are required" });
    }

    let profilePictureURL = req.user.profilePic;

    if (photo) {
      const b64 = Buffer.from(photo.buffer).toString("base64");
      const dataURI = `data:${photo.mimetype};base64,${b64}`;

      const result = await cloudinary.uploader.upload(dataURI, {
        folder: "everydayspecial",
        width: 300,
        height: 300,
        crop: "fill",
      });

      console.log("Cloudinary upload result:", result);

      if (!result?.secure_url) {
        return res.status(500).json({ message: "Failed to upload image to Cloudinary" });
      }

      profilePictureURL = result.secure_url;
    }

    console.log("Final profile URL to be saved:", profilePictureURL);

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        fullName,
        email,
        phone,
        dob,
        gender,
        profilePic: profilePictureURL,
      },
      { new: true }
    ).select("-password");

    console.log("Updated user response:", updatedUser);

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

