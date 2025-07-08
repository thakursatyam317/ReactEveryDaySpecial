import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";

const OrderPlaceOrNot = () => {
  const [orders, setOrders] = useState([]);

  const dummyOrders = [
    {
      _id: "order1",
      user: { fullName: "John Doe" },
      totalPrice: 299.99,
      orderStatus: "Pending",
    },
    {
      _id: "order2",
      user: { fullName: "Jane Smith" },
      totalPrice: 549.0,
      orderStatus: "Shipped",
    },
    {
      _id: "order3",
      user: { fullName: "Rahul Sharma" },
      totalPrice: 1200.5,
      orderStatus: "Delivered",
    },
    {
      _id: "order4",
      user: { fullName: "Priya Mehta" },
      totalPrice: 450.75,
      orderStatus: "Confirmed",
    },
  ];

  const fetchOrders = async () => {
    try {
      setOrders(dummyOrders);
      toast.success("Loaded dummy orders");
    } catch (err) {
      toast.error("Failed to load orders");
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      const updated = orders.map((order) =>
        order._id === orderId ? { ...order, orderStatus: status } : order
      );
      setOrders(updated);
      toast.success("Order status updated (dummy)");
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Confirmed":
        return "bg-blue-100 text-blue-800";
      case "Shipped":
        return "bg-purple-100 text-purple-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const navItemStyle =
    "block px-4 py-2 rounded hover:bg-gray-700 transition duration-200";

  return (
    <div className="flex mt-20">
      {/* Sidebar */}
      <div className="w-64 h-screen bg-gray-900 text-white p-6 fixed top-0 left-0 shadow-xl">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
        <nav className="space-y-2">
          <NavLink to="/admin/dashboard" className={navItemStyle}>
            📊 Dashboard
          </NavLink>
          <NavLink to="/admin/product-management" className={navItemStyle}>
            🛍️ Products
          </NavLink>
          <NavLink to="/admin/order-status" className={navItemStyle}>
            📦 Orders
          </NavLink>
          <NavLink to="/admin/users" className={navItemStyle}>
            👥 Users
          </NavLink>
          <NavLink to="/admin/coupons" className={navItemStyle}>
            💸 Coupons
          </NavLink>
        </nav>
      </div>

      {/* Main content */}
      <div className="ml-64 p-6 w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">📦 Order Management</h2>

        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow-md rounded-xl p-6 mb-6 border"
          >
            <div className="mb-3">
              <p className="text-sm text-gray-500">
                <strong>Order ID:</strong> #{order._id}
              </p>
              <p className="text-sm text-gray-700">
                <strong>User:</strong> {order.user?.fullName}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Total:</strong> ₹{order.totalPrice.toFixed(2)}
              </p>
            </div>

            <div className="flex items-center justify-between mt-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.orderStatus)}`}
              >
                {order.orderStatus}
              </span>

              <select
                className="ml-4 p-2 text-sm border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderPlaceOrNot;
