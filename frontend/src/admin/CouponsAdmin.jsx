import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const CouponsAdmin = () => {
  const navItemStyle = 'block px-4 py-3 rounded-md hover:bg-gray-700 transition-all';

  // Dummy Coupons
  const [coupons, setCoupons] = useState([
    { id: 1, code: 'SAVE10', discount: '10%' },
    { id: 2, code: 'FREESHIP', discount: 'Free Shipping' },
  ]);

  const [newCoupon, setNewCoupon] = useState({ code: '', discount: '' });

  const handleAddCoupon = () => {
    if (newCoupon.code && newCoupon.discount) {
      const newId = coupons.length + 1;
      setCoupons([...coupons, { id: newId, ...newCoupon }]);
      setNewCoupon({ code: '', discount: '' });
    }
  };

  const handleDelete = (id) => {
    setCoupons(coupons.filter(c => c.id !== id));
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 h-screen bg-gray-900 text-white p-6 fixed top-0 left-0 shadow-xl">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
        <nav className="space-y-2">
          <NavLink to="/admin/dashboard" className={navItemStyle}>📊 Dashboard</NavLink>
          <NavLink to="/admin/product-management" className={navItemStyle}>🛍️ Products</NavLink>
          <NavLink to="/admin/order-status" className={navItemStyle}>📦 Orders</NavLink>
          <NavLink to="/admin/users" className={navItemStyle}>👥 Users</NavLink>
          <NavLink to="/admin/coupons" className={navItemStyle}>💸 Coupons</NavLink>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 w-full px-6 py-10">
        <h1 className="text-3xl font-bold mb-6 text-center">Coupon Management</h1>

        {/* Add Coupon */}
        <div className="bg-white shadow p-6 rounded-lg max-w-md mx-auto mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Coupon</h2>
          <input
            type="text"
            placeholder="Coupon Code"
            value={newCoupon.code}
            onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
            className="border w-full px-4 py-2 mb-2 rounded"
          />
          <input
            type="text"
            placeholder="Discount (e.g., 10% or Free Shipping)"
            value={newCoupon.discount}
            onChange={(e) => setNewCoupon({ ...newCoupon, discount: e.target.value })}
            className="border w-full px-4 py-2 mb-4 rounded"
          />
          <button
            onClick={handleAddCoupon}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          >
            Add Coupon
          </button>
        </div>

        {/* Coupon List */}
        <div className="bg-white shadow rounded-lg p-4 max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">All Coupons</h2>
          {coupons.length === 0 ? (
            <p className="text-gray-600 text-center">No coupons available.</p>
          ) : (
            <table className="min-w-full text-center border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 border">ID</th>
                  <th className="py-2 px-4 border">Code</th>
                  <th className="py-2 px-4 border">Discount</th>
                  <th className="py-2 px-4 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {coupons.map(coupon => (
                  <tr key={coupon.id}>
                    <td className="py-2 px-4 border">{coupon.id}</td>
                    <td className="py-2 px-4 border">{coupon.code}</td>
                    <td className="py-2 px-4 border">{coupon.discount}</td>
                    <td className="py-2 px-4 border">
                      <button
                        onClick={() => handleDelete(coupon.id)}
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
