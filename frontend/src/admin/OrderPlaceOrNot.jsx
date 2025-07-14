import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const navItemStyle = 'block py-2 px-4 hover:bg-gray-700 rounded transition';

const OrderPlaceOrNot = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('');
  

  axios.defaults.baseURL = 'http://localhost:4500';

  const fetchOrders = async () => {
    const token = localStorage.getItem('token');
    if (!token) return alert("Please login as admin.");
    console.log("Fetching orders with token:", token); // ✅ Debug
    try {
      console.log("Fetching orders..."); // ✅ Debug
      const res = await axios.get('/order/myorders', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
      console.log("Fetched orders:", res.data); // ✅ Debug
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  const handleStatusChange = async (_id, newStatus = null, paymentStatus = null, paymentConfirmed = null) => {
    const token = localStorage.getItem('token');
    try {
      const updateData = {};
      if (newStatus !== null) updateData.status = newStatus;
      if (paymentStatus !== null) updateData.paymentStatus = paymentStatus;
      if (paymentConfirmed !== null) updateData.paymentConfirmed = paymentConfirmed;

      await axios.put(`/order/OrderStatus`, updateData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchOrders();
    } catch (err) {
      console.error('Error updating order:', err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = filter
    ? orders.filter(order => order.status === filter)
    : orders;

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 h-screen bg-gray-900 text-white p-6 fixed top-0 left-0 shadow-lg">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
        <nav className="space-y-2">
          <NavLink to="/admin/dashboard" className={navItemStyle}>📊 Dashboard</NavLink>
          <NavLink to="/admin/product-management" className={navItemStyle}>🛍️ Products</NavLink>
          <NavLink to="/admin/orders" className={navItemStyle}>📦 Orders</NavLink>
          <NavLink to="/admin/users" className={navItemStyle}>👥 Users</NavLink>
          <NavLink to="/admin/coupons" className={navItemStyle}>💸 Coupons</NavLink>
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
              <th className="border p-2">UserID</th>
              <th className="border p-2">OrderID</th>
              <th className="border p-2">Amount</th>
              {/* <th className="border p-2">Status</th> */}
              <th className="border p-2">Change Status</th>
              <th className="border p-2">Payment Status</th>
              <th className="border p-2">Confirm Payment</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order._id}>
                  <td className="border p-2">{order.shippingAddress.fullName || 'Unknown'}</td>
                  <td className="border p-2">{order.user || 'Unknown'}</td>
                  <td className="border p-2">{order._id}</td>
                  <td className="border p-2">₹{order.totalPrice}</td>
                  {/* <td className="border p-2">{order.status}</td> */}
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
                      value={order.paymentStatus || 'Pending'}
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
                </tr>
              ))
            ) : (
              <tr>
                <td className="border p-4 text-center" colSpan="6">
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
