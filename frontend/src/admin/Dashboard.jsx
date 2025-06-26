import React from 'react';
import { NavLink } from 'react-router-dom';

const Dashboard = () => {
  const navItemStyle =
    'block px-4 py-3 rounded-md hover:bg-gray-700 transition-all';

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 h-screen bg-gray-600 text-white p-6 fixed top-0 left-0 shadow-xl">
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
      <div className="ml-64 flex flex-col items-center justify-center w-full px-4 py-12">
        <h1 className="text-4xl font-bold mb-4">Admin Dashboard</h1>
        <p className="text-lg">Welcome to the admin dashboard!</p>
        <p className="text-lg">You can manage orders, products, and users from here.</p>
        <p className="text-lg">Use the navigation menu to access different sections.</p>

        <div className="flex justify-center mt-8 w-full">
          <img
            src="/images/admin-dashboard.png"
            alt="Admin Dashboard"
            className="w-1/2 h-auto rounded-lg shadow-lg"
          />
        </div>

        <div className="flex justify-center mt-4 w-full">
          <p className="text-sm text-gray-500">
            © 2025 Everyday Special. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
