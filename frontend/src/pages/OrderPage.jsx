// OrdersPage.js
import React, { useEffect, useState } from "react";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-30 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Your Orders</h2>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border p-4 rounded-md shadow-sm bg-gray-50"
            >
              <h3 className="font-bold text-lg mb-2">Order ID: {order.id}</h3>
              <p>Date: {order.date}</p>
              <p>Payment: {order.payment}</p>
              <p>Total Amount: ₹{order.total}</p>
              <p>Status: {order.status}</p>
              <p className="mt-2 font-semibold">Items:</p>
              <ul className="list-disc list-inside">
                {order.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              <p className="mt-2">Address: {order.address}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
