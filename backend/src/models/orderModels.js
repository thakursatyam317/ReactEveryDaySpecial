import mongoose from "mongoose";
import Order from "../models/orderModels.js";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
    },
  ],
  total: Number,
  status: {
    type: String,
    enum: ["Pending", "Processing", "Shipped", "Delivered", "Pickup", "Cancelled", "Paid"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Order = mongoose.model("Order", orderSchema);
export default Order;
