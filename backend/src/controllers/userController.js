import User from "../models/userModels.js";
import cloudinary from "../config/cloudinary.js";

// ==================
// GET USER PROFILE
// ==================
export const userProfile = async (req, res) => {
  try {
    if (!req.user?.id && !req.user?._id) {
      return res.status(401).json({ message: "Unauthorized: No user info" });
    }

    const user = await User.findById(req.user._id || req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found in database" });
    }

    return res.status(200).json({
      message: "User profile fetched successfully",
      user,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return res.status(500).json({ message: "Server error while fetching profile" });
  }
};

// ==================
// UPDATE USER PROFILE
// ==================
export const updateUserProfile = async (req, res) => {
  try {
    const { fullName, email, phone, dob, gender } = req.body;
    const photo = req.file;

    if (!req.user?._id) {
      return res.status(401).json({ message: "Unauthorized: No user token" });
    }
    console.log(email);

    if (!fullName || !email) {
      return res.status(400).json({ message: "Full name and email are required" });
    }

    let profilePicUrl = req.user.profilePic;
    console.log(profilePicUrl);

    if (photo) {
      try {
        const base64Image = photo.buffer.toString("base64");
        const dataUri = `data:${photo.mimetype};base64,${base64Image}`;

        const result = await cloudinary.uploader.upload(dataUri, {
          folder: "everydayspecial",
          width: 300,
          height: 300,
          crop: "fill",
        });

        if (!result?.secure_url) {
          return res.status(500).json({ message: "Failed to upload image" });
        }

        profilePicUrl = result.secure_url;
      } catch (cloudErr) {
        console.error("Cloudinary Upload Error:", cloudErr);
        return res.status(500).json({ message: "Image upload failed" });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        fullName,
        email,
        phone,
        dob,
        gender,
        profilePic: profilePicUrl,
      },
      { new: true }
    ).select("-password");

    console.log("Updated User:", req.user.fullName, updatedUser.fullName);
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found during update" });
    }

    return res.status(200).json({
      message: "User updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    return res.status(500).json({ message: "Server error while updating profile" });
  }
};
