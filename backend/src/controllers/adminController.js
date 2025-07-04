import User from "../models/userModels.js";
import Order from "../models/orderModels.js";

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




// 📊 Order Summary (admin only
// ✅ Get Order Summary (Admin Only)
export const orderSummary = async (req, res) => {
  try {
    const orders = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalAmount: { $sum: "$totalPrice" },
        },
      },
    ]);

    res.status(200).json({
      totalOrders: orders[0]?.totalOrders || 0,
      totalAmount: orders[0]?.totalAmount || 0,
    });
  } catch (err) {
    console.error("Error fetching order summary:", err);
    res.status(500).json({ message: "Server error while fetching order summary" });
  }
};



// ✅ Update Order Status (admin only)
// ✅ Update Order Status (Admin Only)
export const orderUpdate = async (req, res) => {
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: "Status is required" });
  }

  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.orderStatus = status; // ✅ match with your schema field name
    await order.save();

    res.status(200).json({
      message: "Order status updated successfully",
      order,
    });
  } catch (err) {
    console.error("Error updating order status:", err);
    res.status(500).json({ message: "Server error while updating order status" });
  }
};



