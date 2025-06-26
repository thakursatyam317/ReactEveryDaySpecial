import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const UserManagement = () => {
  const navItemStyle =
    'block px-4 py-3 rounded-md hover:bg-gray-700 transition-all';

  // Sample user data
  const [users, setUsers] = useState([
    { id: 1, name: 'Satyam Thakur', email: 'satyam@example.com', role: 'user', status: 'active' },
    { id: 2, name: 'Amit Kumar', email: 'amit@example.com', role: 'admin', status: 'active' },
    { id: 3, name: 'Neha Singh', email: 'neha@example.com', role: 'user', status: 'blocked' }
  ]);

  // Handlers
  const toggleRole = (id) => {
    setUsers(prev =>
      prev.map(user =>
        user.id === id
          ? { ...user, role: user.role === 'admin' ? 'user' : 'admin' }
          : user
      )
    );
  };

  const toggleStatus = (id) => {
    setUsers(prev =>
      prev.map(user =>
        user.id === id
          ? { ...user, status: user.status === 'active' ? 'blocked' : 'active' }
          : user
      )
    );
  };

  return (
    <div className="flex">
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
      <div className="ml-64 w-full px-6 py-10">
        <h1 className="text-3xl font-bold mb-6 text-center">User Management</h1>

        <div className="overflow-x-auto">
          <table className="min-w-full border text-center bg-white shadow-md rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 border-b">Name</th>
                <th className="py-3 px-4 border-b">Email</th>
                <th className="py-3 px-4 border-b">Role</th>
                <th className="py-3 px-4 border-b">Status</th>
                <th className="py-3 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{user.name}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b">{user.role}</td>
                  <td className={`py-2 px-4 border-b ${user.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                    {user.status}
                  </td>
                  <td className="py-2 px-4 border-b space-x-2">
                    <button
                      onClick={() => toggleRole(user.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Toggle Role
                    </button>
                    <button
                      onClick={() => toggleStatus(user.id)}
                      className={`${
                        user.status === 'active' ? 'bg-red-500' : 'bg-green-500'
                      } text-white px-3 py-1 rounded hover:opacity-90`}
                    >
                      {user.status === 'active' ? 'Block' : 'Unblock'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center mt-6">
          <p className="text-sm text-gray-500">© 2025 Everyday Special. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
