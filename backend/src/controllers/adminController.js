import User from "../models/userModels.js";

// 🧾 Get All Users (admin only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // don't send password
    res.status(200).json({ users });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Server error while fetching users" });
  }
};

// 🔁 Toggle Role (user <-> admin)
export const toggleUserRole = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = user.role === "admin" ? "user" : "admin";
    await user.save();

    res.status(200).json({ message: "User role updated", role: user.role });
  } catch (err) {
    console.error("Error updating role:", err);
    res.status(500).json({ message: "Error updating role" });
  }
};

// 🚫 Toggle Status (active <-> blocked)
export const toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.status = user.status === "active" ? "blocked" : "active";
    await user.save();

    res.status(200).json({ message: "User status updated", status: user.status });
  } catch (err) {
    console.error("Error updating status:", err);
    res.status(500).json({ message: "Error updating status" });
  }
};
