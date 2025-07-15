import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

const OrderPlaceOrNot = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("");

  axios.defaults.baseURL = "http://localhost:4500";

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login as admin.");

    try {
      const res = await axios.get("/order/myorders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (err) {
      console.error("❌ Error fetching orders:", err);
    }
  };

  const handleStatusChange = async (_id, newStatus = null, paymentStatus = null, paymentConfirmed = null, orderConfirmed = null) => {
    const token = localStorage.getItem("token");
    try {
      const updateData = { _id };
      if (newStatus !== null) updateData.status = newStatus;
      if (paymentStatus !== null) updateData.paymentStatus = paymentStatus;
      if (typeof paymentConfirmed === "boolean") updateData.paymentConfirmed = paymentConfirmed;
      if (typeof orderConfirmed === "boolean") updateData.orderConfirmed = orderConfirmed;

      await axios.put("/order/OrderStatus", updateData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchOrders();
    } catch (err) {
      console.error("❌ Error updating order:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = filter
    ? orders.filter((order) => order.status === filter)
    : orders;

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 h-screen bg-gray-900 text-white p-6 fixed top-0 left-0 shadow-lg">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
        <nav className="space-y-2">
          <NavLink to="/admin/dashboard" className="block py-2 px-4 hover:bg-gray-700 rounded">📊 Dashboard</NavLink>
          <NavLink to="/admin/product-management" className="block py-2 px-4 hover:bg-gray-700 rounded">🛍️ Products</NavLink>
          <NavLink to="/admin/orders" className="block py-2 px-4 hover:bg-gray-700 rounded">📦 Orders</NavLink>
          <NavLink to="/admin/users" className="block py-2 px-4 hover:bg-gray-700 rounded">👥 Users</NavLink>
          <NavLink to="/admin/coupons" className="block py-2 px-4 hover:bg-gray-700 rounded">💸 Coupons</NavLink>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-4 mt-20 w-full">
        <h2 className="text-2xl font-semibold mb-4">Order Management</h2>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="mb-4 border px-3 py-1 rounded"
        >
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
        </select>

        <table className="w-full table-auto border text-sm">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border p-2">Name</th>
              <th className="border p-2">User ID</th>
              <th className="border p-2">Order ID</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Change Status</th>
              <th className="border p-2">Payment Status</th>
              <th className="border p-2">Payment Confirmed</th>
              <th className="border p-2">Order Confirmed</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order._id}>
                  <td className="border p-2">{order.shippingAddress?.fullName || "Unknown"}</td>
                  <td className="border p-2">{order.user}</td>
                  <td className="border p-2">{order._id}</td>
                  <td className="border p-2">₹{order.totalPrice}</td>
                  <td className="border p-2">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className="border px-2 py-1 rounded"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                  <td className="border p-2">
                    <select
                      value={order.paymentStatus || "Pending"}
                      onChange={(e) => handleStatusChange(order._id, null, e.target.value)}
                      className="border px-2 py-1 rounded"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Paid">Paid</option>
                      <option value="Failed">Failed</option>
                    </select>
                  </td>
                  <td className="border p-2 text-center">
                    <input
                      type="checkbox"
                      checked={order.paymentConfirmed || false}
                      onChange={(e) => handleStatusChange(order._id, null, null, e.target.checked)}
                    />
                  </td>
                  <td className="border p-2 text-center">
                    <input
                      type="checkbox"
                      checked={order.orderConfirmed || false}
                      onChange={(e) => handleStatusChange(order._id, null, null, null, e.target.checked)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="border p-4 text-center" colSpan="8">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderPlaceOrNot;
