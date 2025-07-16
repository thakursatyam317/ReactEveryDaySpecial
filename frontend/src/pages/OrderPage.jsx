import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  axios.defaults.baseURL = "http://localhost:4500";

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please log in first.");
        return;
      }

      try {
        const res = await axios.get("/order/myorders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
        toast.success("🟢 Orders loaded successfully");
      } catch (error) {
        toast.error("Failed to fetch orders");
        console.error("Fetch orders error:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      <button
        onClick={() => navigate(-1)}
        className="fixed top-21.5 left-0.5 h-10 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-full text-lg transition duration-300 shadow-md z-50"
      >
        <IoArrowBack />
      </button>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto mt-28 p-6 bg-white rounded-lg shadow-lg border border-orange-100"
      >
        <motion.h2
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="text-3xl font-bold mb-6 text-center text-orange-600"
        >
          🧾 Your Orders
        </motion.h2>

        {orders.length === 0 ? (
          <p className="text-gray-500 text-center">No orders yet.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border p-5 rounded-lg shadow-md bg-orange-50"
              >
                <div className="mb-3">
                  <h3 className="font-bold text-xl text-orange-700">
                    🆔 Order ID: {order._id}
                  </h3>
                  <p className="text-sm text-gray-600">
                    💳 Payment: {order.paymentMethod}
                  </p>
                  <p className="text-sm text-gray-600">
                    📦 Status: {order.status}
                  </p>
                  <p className="text-sm text-gray-600">
                    📍 Address: {order.shippingAddress?.fullName},{" "}
                    {order.shippingAddress?.addressLine},{" "}
                    {order.shippingAddress?.city} -{" "}
                    {order.shippingAddress?.pincode},{" "}
                    {order.shippingAddress?.state}
                  </p>
                </div>

                <p className="font-semibold mb-2 text-orange-700">🛒 Items:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {order.orderItems?.map((item, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      className="border rounded-lg p-3 bg-white shadow-sm flex flex-col items-center transition"
                    >
                      <img
                        src={item.image || "https://via.placeholder.com/150"}
                        alt={item.name}
                        className="w-full h-32 object-cover rounded mb-2"
                      />
                      <h4 className="font-semibold text-center">{item.name}</h4>
                      <p className="text-sm text-gray-600">₹{item.price}</p>
                    </motion.div>
                  ))}
                </div>

                <p className="text-right mt-4 font-bold text-lg text-green-700">
                  Total: ₹{order.totalPrice.toFixed(2)}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </>
  );
};

export default OrderPage;
