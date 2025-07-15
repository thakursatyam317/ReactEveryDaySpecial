import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from "recharts";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";

const STATUS_OPTIONS = ["Pending", "Processing", "Shipped", "Delivered", "Pickup", "Cancelled", "Paid"];

const growthData = [
  { month: "Jan", sales: 4000 },
  { month: "Feb", sales: 7000 },
  { month: "Mar", sales: 9500 },
  { month: "Apr", sales: 11000 },
  { month: "May", sales: 13500 },
  { month: "Jun", sales: 16000 },
  { month: "Jul", sales: 19000 },
];

const Dashboard = () => {
  const [orders, setOrders] = useState([]);

  const navItemStyle =
    'block px-4 py-3 rounded-md hover:bg-gray-700 transition-all';

  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:4500/admin/orders-summary", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      toast.error("Failed to fetch orders");
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      await fetch(`http://localhost:4500/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status }),
      });
      toast.success("✅ Status Updated");
      fetchOrders();
    } catch (err) {
      toast.error("❌ Failed to update status");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Total Revenue and Profit
  const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
  const totalProfit = totalRevenue * 0.2;

  const profitPie = [
    { name: "Profit", value: totalProfit },
    { name: "Cost", value: totalRevenue - totalProfit },
  ];

  const salesData = orders.map((order) => ({
    name: order.user?.fullName || "Unknown",
    total: order.total || 0,
  }));

  return (
    <>
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
          <NavLink to="/admin/orders" className={navItemStyle}>
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
      <div className="ml-64 p-6">
        <h1 className="text-3xl font-bold mb-4">📊 Admin Dashboard</h1>

        {/* Summary Widgets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-green-100 text-green-800 p-4 rounded-xl shadow-sm">
            <h3 className="text-lg font-medium">Total Orders</h3>
            <p className="text-2xl font-bold">{orders.length}</p>
          </div>
          <div className="bg-blue-100 text-blue-800 p-4 rounded-xl shadow-sm">
            <h3 className="text-lg font-medium">Total Revenue</h3>
            <p className="text-2xl font-bold">₹{totalRevenue}</p>
          </div>
          <div className="bg-yellow-100 text-yellow-800 p-4 rounded-xl shadow-sm">
            <h3 className="text-lg font-medium">Estimated Profit</h3>
            <p className="text-2xl font-bold">₹{totalProfit}</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {/* Sales Chart */}
          <div className="bg-white shadow-md p-4 rounded-xl">
            <h2 className="text-xl font-semibold mb-2">💰 Sales by Customer</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={salesData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Profit Pie Chart */}
          <div className="bg-white shadow-md p-4 rounded-xl">
            <h2 className="text-xl font-semibold mb-2">📊 Profit Distribution</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={profitPie}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  <Cell fill="#10b981" />
                  <Cell fill="#f97316" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Growth Chart */}
          <div className="bg-white shadow-md p-4 rounded-xl">
            <h2 className="text-xl font-semibold mb-2">📈 Company Product Growth</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={growthData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#6366f1"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Order Table */}
        <div className="bg-white shadow-md p-4 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-2">Customer</th>
                  <th className="p-2">Items</th>
                  <th className="p-2">Amount</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Update</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center p-4 text-gray-500">
                      No orders found.
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order._id} className="border-b">
                      <td className="p-2">{order.user?.fullName || "Unknown"}</td>
                      <td className="p-2">
                        {Array.isArray(order.items) ? order.items.length : 0} items
                      </td>
                      <td className="p-2">₹{order.total || 0}</td>
                      <td className="p-2">
                        <span className="font-semibold text-blue-600">
                          {order.status || "Pending"}
                        </span>
                      </td>
                      <td className="p-2">
                        <select
                          className="border p-1 rounded"
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                        >
                          {STATUS_OPTIONS.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
