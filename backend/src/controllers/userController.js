import User from "../models/userModels.js";

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
    console.log(req.body);
  } catch (error) {
    next(error);
  }
};