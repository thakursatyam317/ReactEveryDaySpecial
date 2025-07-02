import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import toast from "react-hot-toast";

const STATUS_OPTIONS = ["Pending", "Processing", "Shipped", "Delivered", "Pickup", "Cancelled", "Paid"];

const Dashboard = () => {
  const [orders, setOrders] = useState([]);

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
      const res = await fetch(`http://localhost:4500/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      toast.success("✅ Status Updated");
      fetchOrders(); // refresh
    } catch (err) {
      toast.error("❌ Failed to update status");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const salesData = orders.map((order) => ({
    name: order.user?.fullName || "Unknown",
    total: order.total || 0,
  }));

  const profitPie = [
    { name: "Profit", value: orders.reduce((acc, o) => acc + o.total * 0.2, 0) },
    { name: "Cost", value: orders.reduce((acc, o) => acc + o.total * 0.8, 0) },
  ];

  return (
    <div className="ml-64 p-6">
      <h1 className="text-3xl font-bold mb-4">📊 Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white shadow-md p-4 rounded-xl">
          <h2 className="text-xl font-semibold mb-2">Sales Chart</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={salesData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white shadow-md p-4 rounded-xl">
          <h2 className="text-xl font-semibold mb-2">Profit Distribution</h2>
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
      </div>

      {/* Order Status Management */}
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
              {orders.map((order) => (
                <tr key={order._id} className="border-b">
                  <td className="p-2">{order.user?.fullName}</td>
                  <td className="p-2">{order.items?.length} items</td>
                  <td className="p-2">₹{order.total}</td>
                  <td className="p-2">
                    <span className="font-semibold text-blue-600">{order.status}</span>
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
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center p-4 text-gray-500">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
