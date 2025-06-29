import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

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
    <div className="max-w-4xl mx-auto mt-30 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Your Orders</h2>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="space-y-6">
          {[...orders].reverse().map((order) => (
            <div key={order.id} className="border p-4 rounded-md shadow-sm bg-gray-50">
              <h3 className="font-bold text-lg mb-2">Order ID: {order.id}</h3>
              <p>Date: {order.date}</p>
              <p>Payment: {order.payment}</p>
              <p>Total Amount: ₹{order.total.toFixed(2)}</p>
              <p>Status: {order.status}</p>
              <p className="mt-2 font-semibold">Items:</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="border rounded p-2 bg-white shadow-sm flex flex-col items-center"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-32 object-cover rounded mb-2"
                    />
                    <h4 className="font-semibold">{item.name}</h4>
                    <p>₹{item.price}</p>
                  </div>
                ))}
              </div>

              <p className="mt-2">Address: {order.address}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderPage;
