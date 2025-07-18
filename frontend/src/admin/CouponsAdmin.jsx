import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const CouponsAdmin = () => {
  const navItemStyle = 'block px-4 py-3 rounded-md hover:bg-gray-700 transition-all';

  const [coupons, setCoupons] = useState([]);
  const [newCoupon, setNewCoupon] = useState({
    name: '',
    code: '',
    description: '',
    discount: '',
    validTill: '',
  });

  const fetchCoupons = async () => {
    const res = await axios.get('http://localhost:4500/api/coupons/all');
    setCoupons(res.data);
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleAddCoupon = async () => {
    try {
      const { name, code, description, discount, validTill } = newCoupon;
      if (!code || !discount) return alert("Code and discount are required!");

      const res = await axios.post('http://localhost:4500/api/coupons/create', {
        name, code, description, discount, validTill
      });

      setCoupons([...coupons, res.data]);
      setNewCoupon({ name: '', code: '', description: '', discount: '', validTill: '' });
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add coupon");
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:4500/api/coupons/delete/${id}`);
    setCoupons(coupons.filter(c => c._id !== id));
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 h-screen bg-gray-900 text-white p-6 fixed top-0 left-0 shadow-xl">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
        <nav className="space-y-2">
          <NavLink to="/admin/dashboard" className={navItemStyle}>📊 Dashboard</NavLink>
          <NavLink to="/admin/product-management" className={navItemStyle}>🛍️ Products</NavLink>
          <NavLink to="/admin/orders" className={navItemStyle}>📦 Orders</NavLink>
          <NavLink to="/admin/users" className={navItemStyle}>👥 Users</NavLink>
          <NavLink to="/admin/coupons" className={`${navItemStyle} bg-gray-800`}>💸 Coupons</NavLink>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 w-full px-6 py-10">
        <h1 className="text-3xl font-bold mb-6 text-center">Coupon Management</h1>

        {/* Add Coupon */}
        <div className="bg-white shadow p-6 rounded-lg max-w-md mx-auto mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Coupon</h2>

          {['name', 'code', 'description', 'discount', 'validTill'].map((field, i) => (
            <input
              key={i}
              type={field === 'validTill' ? 'date' : 'text'}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={newCoupon[field]}
              onChange={(e) => setNewCoupon({ ...newCoupon, [field]: e.target.value })}
              className="border w-full px-4 py-2 mb-2 rounded"
            />
          ))}

          <button
            onClick={handleAddCoupon}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          >
            Add Coupon
          </button>
        </div>

        {/* Coupon List */}
        <div className="bg-white shadow rounded-lg p-4 max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">All Coupons</h2>
          {coupons.length === 0 ? (
            <p className="text-gray-600 text-center">No coupons available.</p>
          ) : (
            <table className="min-w-full text-center border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 border">Code</th>
                  <th className="py-2 px-4 border">Name</th>
                  <th className="py-2 px-4 border">Description</th>
                  <th className="py-2 px-4 border">Discount</th>
                  <th className="py-2 px-4 border">Valid Till</th>
                  <th className="py-2 px-4 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {coupons.map((coupon) => (
                  <tr key={coupon._id}>
                    <td className="py-2 px-4 border">{coupon.code}</td>
                    <td className="py-2 px-4 border">{coupon.name}</td>
                    <td className="py-2 px-4 border">{coupon.description}</td>
                    <td className="py-2 px-4 border">{coupon.discount}</td>
                    <td className="py-2 px-4 border">
                      {coupon.validTill ? new Date(coupon.validTill).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="py-2 px-4 border">
                      <button
                        onClick={() => handleDelete(coupon._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="flex justify-center mt-8">
          <p className="text-sm text-gray-500">© 2025 Everyday Special. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default CouponsAdmin;
