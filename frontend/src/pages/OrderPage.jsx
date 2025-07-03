import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);

    if (storedOrders.length > 0) {
      toast.success("🟢 Orders loaded successfully");
    }
  }, []);

  return (
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
          {[...orders].reverse().map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border p-5 rounded-lg shadow-md bg-orange-50"
            >
              <div className="mb-3">
                <h3 className="font-bold text-xl text-orange-700">🆔 Order ID: {order.id}</h3>
                <p className="text-sm text-gray-600">📅 {order.date}</p>
                <p className="text-sm text-gray-600">💳 Payment: {order.payment}</p>
                <p className="text-sm text-gray-600">📦 Status: {order.status}</p>
                <p className="text-sm text-gray-600">📍 Address: {order.address}</p>
              </div>

              <p className="font-semibold mb-2 text-orange-700">🛒 Items:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {order.items.map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    className="border rounded-lg p-3 bg-white shadow-sm flex flex-col items-center transition"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-32 object-cover rounded mb-2"
                    />
                    <h4 className="font-semibold text-center">{item.name}</h4>
                    <p className="text-sm text-gray-600">₹{item.price}</p>
                  </motion.div>
                ))}
              </div>

              <p className="text-right mt-4 font-bold text-lg text-green-700">
                Total: ₹{order.total.toFixed(2)}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default OrderPage;
