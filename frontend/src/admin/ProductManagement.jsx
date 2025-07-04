import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ProductManagement = () => {
  const [orders, setOrders] = useState([]);
  const token = sessionStorage.getItem("token");

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:4500/admin/orders-summary", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (err) {
      toast.error("Failed to load orders");
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      await axios.put(
        `http://localhost:4500/admin/orders-status/${orderId}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Order status updated");
      fetchOrders();
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Admin Orders</h2>
      {orders.map((order) => (
        <div
          key={order._id}
          className="bg-white shadow-md rounded-xl p-4 mb-4 border"
        >
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>User:</strong> {order.user?.fullName}</p>
          <p><strong>Total:</strong> ₹{order.totalPrice}</p>
          <p><strong>Status:</strong> {order.orderStatus}</p>

          <select
            className="mt-2 p-2 border rounded"
            value={order.orderStatus}
            onChange={(e) => updateStatus(order._id, e.target.value)}
          >
            <option>Pending</option>
            <option>Confirmed</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default ProductManagement;
