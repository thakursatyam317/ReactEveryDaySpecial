import Order from '../models/orderModels.js';



export const createOrder = async (req, res) => {
  const { orderItems, totalPrice, shippingAddress, paymentMethod } = req.body;
  console.log("Order Iteam:", orderItems);//object
  // console.log("orderItems:", typeof(orderItems) );
  console.log("Total price:", totalPrice);//Number
  // console.log("Total price:", typeof(totalPrice) );
  console.log("Shipping address:", shippingAddress); //object
  // console.log("Shipping address:", typeof(shippingAddress) );
  console.log("Payment method:", paymentMethod);//string
  // console.log("Payment method:", typeof(paymentMethod) );
  console.log(typeof(image));

  // ✅ Validate required fields
  if (!orderItems || orderItems.length === 0) {
    return res.status(400).json({ error: "No order items provided." });
  }
  if (!shippingAddress || !totalPrice || !paymentMethod) {
    return res.status(400).json({ error: "Missing required order fields." });
  }
  
// const image = `https://placehold.co/600x400?text=${fullName.charAt(0).toUpperCase()}`;
// console.log("image : ", image)
  try {
    const newOrder = await Order.create({
      orderItems,
      totalPrice,
      shippingAddress,
      paymentMethod,
      // image
      
      
    });
    // console.log("✅ Order created:", newOrder);


    const savedOrder = await newOrder.save();
    console.log("✅ Order created:", savedOrder);
    res.status(201).json({
      message: "Order created successfully",
      order: savedOrder,
    });
  } catch (err) {
    console.error("❌ Order creation failed:", err);
    res.status(500).json({ error: err.message || "Failed to create order" });
  }
  console.log("Order creation process completed.");
};




// ✅ User: Get logged-in user's orders
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    console.log("User Orders:", orders);
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message || "Failed to fetch orders" });
  }
};

// ✅ Admin: Update order status/payment info
export const UpdateOrderStatus = async (req, res) => {
  const { orderId, orderStatus, paymentStatus, paymentConfirmed } = req.body;
  console.log("Update Order Status:", { orderId, orderStatus, paymentStatus, paymentConfirmed });

  if (!orderId) {
    return res.status(400).json({ error: "Order ID is required" });
  }

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    console.log("Order found:", order);

    if (orderStatus) order.orderStatus = orderStatus;
    if (paymentStatus) order.paymentStatus = paymentStatus;
    if (typeof paymentConfirmed === "boolean") order.paymentConfirmed = paymentConfirmed;

    await order.save();

    res.status(200).json({
      message: "Order updated successfully",
      order,
    });
  } catch (err) {
    console.error("❌ Error updating order:", err);
    res.status(500).json({ error: err.message || "Failed to update order" });
  }
};
