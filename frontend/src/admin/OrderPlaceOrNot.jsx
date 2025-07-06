import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const OrderPlaceOrNot = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const navItemStyle =
    'block px-4 py-3 rounded-md hover:bg-gray-700 transition-all';

  const statusOptions = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

  // 🔄 Handle Status Change
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );

      // Send status update to backend
      const res = await fetch(`http://localhost:4500/admin/orders/${orderId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");

      console.log("Status updated");
    } catch (err) {
      console.error("Failed to update status:", err.message);
    }
  };

  // 🔃 Fetch Orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:4500/admin/orders", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await res.json();
        if (res.ok) {
          setOrders(data.orders || []);
        } else {
          throw new Error(data.message || "Error fetching orders");
        }
      } catch (err) {
        console.error("Fetch orders error:", err);
        // Dummy data fallback
        setOrders([
          {
            _id: "dummy1",
            user: { fullName: "Satyam Thakur" },
            totalAmount: 499,
            status: "Pending",
            createdAt: new Date().toISOString(),
          },
          {
            _id: "dummy2",
            user: { fullName: "Priya Singh" },
            totalAmount: 899,
            status: "Shipped",
            createdAt: new Date().toISOString(),
          },
          {
            _id: "dummy3",
            user: { fullName: "Ankit Rao" },
            totalAmount: 1200,
            status: "Delivered",
            createdAt: new Date().toISOString(),
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

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

      {/* Main Content */}
      <div className="ml-64 px-6 py-12 w-full">
        <h1 className="text-4xl font-bold mb-6">📦 Order Status</h1>

        {loading ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-600">No orders placed yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border border-gray-200 shadow-md">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 border">Order ID</th>
                  <th className="p-3 border">Customer</th>
                  <th className="p-3 border">Amount</th>
                  <th className="p-3 border">Status</th>
                  <th className="p-3 border">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="text-center">
                    <td className="p-3 border">
                      {order._id?.slice(-6)?.toUpperCase() || "DUMMY"}
                    </td>
                    <td className="p-3 border">
                      {order.user?.fullName || "N/A"}
                    </td>
                    <td className="p-3 border">₹{order.totalAmount}</td>
                    <td className="p-3 border">
                      <div className="flex items-center justify-center gap-2">
                        <span
                          className={`inline-block w-3 h-3 rounded-full ${
                            order.status === "Pending"
                              ? "bg-yellow-500"
                              : order.status === "Processing"
                              ? "bg-blue-500"
                              : order.status === "Shipped"
                              ? "bg-purple-500"
                              : order.status === "Delivered"
                              ? "bg-green-600"
                              : "bg-red-500"
                          }`}
                        ></span>
                        <select
                          value={order.status}
                          onChange={(e) =>
                            handleStatusChange(order._id, e.target.value)
                          }
                          className="px-2 py-1 rounded text-sm border focus:outline-none focus:ring"
                        >
                          {statusOptions.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>
                    <td className="p-3 border">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex justify-center mt-12 w-full">
          <p className="text-sm text-gray-500">
            © 2025 Everyday Special. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderPlaceOrNot;
