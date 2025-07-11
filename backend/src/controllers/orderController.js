import Order from '../models/orderModels.js';



export const createOrder = async (req, res) => {
  const { orderItems, totalPrice, shippingAddress, paymentMethod } = req.body;

  // ✅ Validate required fields
  if (!orderItems || orderItems.length === 0) {
    return res.status(400).json({ error: "No order items provided." });
  }
  if (!shippingAddress || !totalPrice || !paymentMethod) {
    return res.status(400).json({ error: "Missing required order fields." });
  }

  try {
    const newOrder = new Order({
      
      orderItems,
      totalPrice,
      shippingAddress,
      paymentMethod,
      
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({
      message: "Order created successfully",
      order: savedOrder,
    });
  } catch (err) {
    res.status(500).json({ error: err.message || "Failed to create order" });
  }
};


export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message || "Failed to fetch orders" });
  }
};
