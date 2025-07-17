import Order from '../models/orderModels.js';
import  cloudinary  from '../config/cloudinary.js'; // Ensure you have cloudinary configured
import { get } from 'mongoose';


export const createOrder = async (req, res) => {
  const { orderItems, totalPrice, shippingAddress, paymentMethod } = req.body;
  // const photo = req.file;


  if (!orderItems || orderItems.length === 0) {
    return res.status(400).json({ error: "No order items provided." });
  }
  if (!shippingAddress || !totalPrice || !paymentMethod) {
    return res.status(400).json({ error: "Missing required order fields." });
  }

  // let profilePicUrl = req.order.profilePic;
  // console.log("Profile Pic URL:", profilePicUrl);
  // if (photo) {
  //   const base64Image = photo.buffer.toString("base64");
  //   const dataUri = `data:${photo.mimetype};base64,${base64Image}`;
  //   try {
  //     const result = await cloudinary.uploader.upload(dataUri, {
  //       folder: "everydayspecial",
  //       width: 300,
  //       height: 300,
  //       crop: "fill",
  //     });
  //     if (!result?.secure_url) {
  //       return res.status(500).json({ message: "Failed to upload image" });
  //     }
  //     // profilePicUrl = get(result, 'secure_url', '') || profilePicUrl; // Fallback to existing URL if upload fails
  //     // console.log("✅ Image uploaded successfully:", profilePicUrl);
  //   } catch (cloudErr) {
  //     console.error("❌ Cloudinary Error:", cloudErr);
  //     return res.status(500).json({ message: "Image upload failed" });
  //   }
  // }

  try {
    const newOrder = await Order.create({
      user: req.user._id,
      orderItems,
      totalPrice,
      shippingAddress,
      paymentMethod,
      // profilePic: profilePicUrl,
    });
    // console.log(profilePicUrl)

    const savedOrder = await newOrder.save();
    res.status(201).json({
      message: "Order created successfully",
      order: savedOrder,
    });
  } catch (err) {
    res.status(500).json({ error: err.message || "Failed to create order" });
  }
};

// ✅ Admin: Fetch all orders
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("_id" ) // Optional: populate user info
      .sort({ createdAt: -1 });

    console.log("Fetched all orders for user:", req.user._id);
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message || "Failed to fetch all orders" });
  }
};


export const UpdateOrderStatus = async (req, res) => {
  const { _id, status, paymentStatus, paymentConfirmed, orderConfirmed } = req.body;

  if (!_id) {
    return res.status(400).json({ error: "Order ID is required" });
  }

  try {
    const order = await Order.findById(_id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    if (status) order.status = status;
    if (paymentStatus) order.paymentStatus = paymentStatus;
    if (typeof paymentConfirmed === "boolean") order.paymentConfirmed = paymentConfirmed;
    if (typeof orderConfirmed === "boolean") order.orderConfirmed = orderConfirmed;

    await order.save();

    res.status(200).json({
      message: "Order updated successfully",
      order,
    });
  } catch (err) {
    res.status(500).json({ error: err.message || "Failed to update order" });
  }
};
