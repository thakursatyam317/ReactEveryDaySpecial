import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderPlaceOrNot = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('');

  // Set baseURL if not already
  axios.defaults.baseURL = 'http://localhost:5000'; // change to your backend url

  const fetchOrders = async () => {
    const token = localStorage.getItem('token');
    console.log("Admin token:", token); // ✅ Debug

    if (!token) return alert("Please login as admin.");

    try {
      const res = await axios.get('/admin/orders', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  const handleStatusChange = async (id, status) => {
    const token = localStorage.getItem('token');
    try {
      await axios.patch(`/admin/orders/${id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchOrders(); // refetch orders
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = filter
    ? orders.filter(order => order.status === filter)
    : orders;

  return (
    <div className="p-4 mt-20">
      <h2 className="text-2xl font-semibold mb-4">Order Management</h2>

      <select
        value={filter}
        onChange={e => setFilter(e.target.value)}
        className="mb-4 border px-3 py-1 rounded"
      >
        <option value="">All</option>
        <option value="Pending">Pending</option>
        <option value="Shipped">Shipped</option>
        <option value="Delivered">Delivered</option>
      </select>

      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">User</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Change Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map(order => (
            <tr key={order._id}>
              <td className="border p-2">{order.user?.name || 'No Name'}</td>
              <td className="border p-2">₹{order.totalPrice}</td>
              <td className="border p-2">{order.status}</td>
              <td className="border p-2">
                <select
                  value={order.status}
                  onChange={e => handleStatusChange(order._id, e.target.value)}
                  className="border px-2 py-1"
                >
                  <option>Pending</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderPlaceOrNot;
