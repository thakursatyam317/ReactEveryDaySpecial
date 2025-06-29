import User from "../models/userModels.js";
import cloudinary from "../config/cloudinary.js";

// ==================
// GET USER PROFILE
// ==================
export const userProfile = async (req, res, next) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found in DB" });
    }

    res.status(200).json({
      message: "User profile fetched successfully",
      user,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Internal server error while fetching profile" });
  }
};

// ==================
// UPDATE USER PROFILE
// ==================
export const updateUserProfile = async (req, res, next) => {
  try {
    const { fullName, email, phone, dob, gender } = req.body;
    const photo = req.file;

    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!fullName || !email) {
      return res.status(400).json({ message: "Full name and email are required" });
    }

    let profilePictureURL = req.user.profilePic;

    // Upload to Cloudinary if photo exists
    if (photo) {
      const b64 = Buffer.from(photo.buffer).toString("base64");
      const dataURI = `data:${photo.mimetype};base64,${b64}`;

      const result = await cloudinary.uploader.upload(dataURI, {
        folder: "everydayspecial",
        width: 300,
        height: 300,
        crop: "fill",
      });

      if (!result?.secure_url) {
        return res.status(500).json({ message: "Image upload failed" });
      }

      profilePictureURL = result.secure_url;
    }

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

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found during update" });
    }

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error while updating profile" });
  }
};
