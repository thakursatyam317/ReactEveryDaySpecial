import React from 'react';
import { NavLink } from 'react-router-dom';

const ProductManagement = () => {
  const navItemStyle =
    'block px-4 py-3 rounded-md hover:bg-gray-700 transition-all';

  return (
    <div className="flex mt-25">
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
      <div className="ml-64 w-full px-6 py-12">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold mb-4">Product Management</h1>
          <p className="text-lg text-center">Add, update, and manage your vegetarian food items efficiently.</p>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            ➕ Add New Product
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            👀 View All Products
          </button>
          <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
            ✏️ Edit Product
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            ❌ Delete Product
          </button>
          <button className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600">
            📦 Update Stock
          </button>
          <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
            ⭐ Feature Product
          </button>
          <button className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">
            📄 Export Products
          </button>
          <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
            📁 Import Products
          </button>
          <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
            🧾 View Inventory
          </button>
        </div>

        <div className="flex justify-center mt-8">
          <p className="text-sm text-gray-500">© 2025 Everyday Special. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;
