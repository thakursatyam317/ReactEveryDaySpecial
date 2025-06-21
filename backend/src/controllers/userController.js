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
    const { fullName, email, phone, dob } = req.body;
    const photo = req.file;

    console.log("Received fields:", { fullName, email, phone, dob });

    if (!fullName || !email) {
      const error = new Error("Full name and email are required");
      error.statusCode = 400;
      return next(error);
    }

    let profilePictureURL = req.user.profilePic;

    // Upload to cloudinary if photo exists
    if (photo) {
      const b64 = Buffer.from(photo.buffer).toString("base64");
      const dataURI = `data:${photo.mimetype};base64,${b64}`;

      const result = await cloudinary.uploader.upload(dataURI, {
        folder: "everydayspecial",
        width: 300,
        height: 300,
        crop: "fill",
      });

      if (!result || !result.secure_url) {
        const error = new Error("Failed to upload image to Cloudinary");
        error.statusCode = 500;
        return next(error);
      }

      profilePictureURL = result.secure_url;
      console.log("Uploaded image URL:", profilePictureURL);
    }

    // Update user in DB
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        fullName,
        email,
        phone,
        dob,
        profilePic:  result.secure_url || req.user.profilePic,
      },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      const error = new Error("User not found");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    next(error);
  }
};
