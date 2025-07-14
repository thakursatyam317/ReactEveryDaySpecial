import Order from '../models/orderModels.js';



export const createOrder = async (req, res) => {
  const { orderItems, totalPrice, shippingAddress, paymentMethod } = req.body;
  const photo = req.file;
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

  let profilePicUrl = req.user.profilePic;
  if (photo) {
        const base64Image = photo.buffer.toString("base64");
        const dataUri = `data:${photo.mimetype};base64,${base64Image}`;
  
        try {
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
          console.error("❌ Cloudinary Error:", cloudErr);
          return res.status(500).json({ message: "Image upload failed" });
        }
      }
      console.log("Profile Pic URL:", profilePicUrl);

  try {
    const newOrder = await Order.create({
      user: req.user._id, // Link to logged-in user
      orderItems,
      totalPrice,
      shippingAddress,
      paymentMethod,
      profilePic: profilePicUrl,
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




// ✅ User: Get logged-in user's orders in admin dashboard

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
  const { _id,  paymentStatus, paymentConfirmed } = req.body;

  // console.log("Update Order Status:", { _id, paymentStatus, paymentConfirmed });

  console.log(_id);
  if (!_id) {
    return res.status(400).json({ error: "Order ID is required" });
  }

  console.log("Updating order with ID:", _id);
  try {
    const order = await Order.findById(_id);
    console.log("Order found:", order);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    console.log("Order found:", order);

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
