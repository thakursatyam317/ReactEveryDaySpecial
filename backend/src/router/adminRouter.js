import express from "express";
import {
  getAllUsers,
  toggleUserRole,
  toggleUserStatus,
} from "../controllers/adminController.js";

import Order from "../models/orderModels.js";

const router = express.Router();

// /api/admin/user (GET all users)
router.get("/user", getAllUsers);

// /api/admin/user/role/:id (PUT toggle role)
router.put("/user/role/:id", toggleUserRole);

// /api/admin/user/status/:id (PUT toggle status)
router.put("/user/status/:id", toggleUserStatus);

router.get("/orders-summary", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "fullName email") // populate user info
      .populate("items.product", "title"); // optionally populate product titles

    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders summary:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

// ✅ PATCH: Admin updates order status
router.patch("/orders/:id",  async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Status updated", order: updatedOrder });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Failed to update order status" });
  }
});
export default router;
