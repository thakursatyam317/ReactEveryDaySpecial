import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:4500/api/admin";

const UserManagement = () => {
  const navItemStyle = "block px-4 py-3 rounded-md hover:bg-gray-700 transition-all";
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔄 Fetch all users
  const fetchUsers = async () => {
    setLoading(true); // Set loading to true before fetching
    try {
      const res = await axios.get(`${BASE_URL}/user`);
      setUsers(res.data.users); // Set users to state
      console.log(res.data.users); // ✅ check users
    } catch (error) {
      console.error("❌ Fetch error:", error);
      toast.error("❌ Failed to fetch users");
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  // 🔁 Toggle Role: user <-> admin
  const toggleRole = async (id) => {
    try {
      await axios.put(`${BASE_URL}/user/role/${id}`, {}, {
        withCredentials: true,
      });
      toast.success("✅ Role updated");
      fetchUsers();
    } catch (err) {
      toast.error("❌ Failed to update role");
    }
  };

  // 🔁 Toggle Status: active <-> blocked
  const toggleStatus = async (id) => {
    try {
      await axios.put(`${BASE_URL}/user/status/${id}`, {}, {
        withCredentials: true,
      });
      toast.success("✅ Status updated");
      fetchUsers();
    } catch (err) {
      toast.error("❌ Failed to update status");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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
        <h1 className="text-3xl font-bold mb-6 text-center">User  Management</h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading users...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border text-center bg-white shadow-md rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 border-b">Profile</th>
                  <th className="py-3 px-4 border-b">Email</th>
                  <th className="py-3 px-4 border-b">Role</th>
                  <th className="py-3 px-4 border-b">Status</th>
                  <th className="py-3 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b flex items-center gap-2 justify-center">
                      <img
                        src={user.profilePic || "https://via.placeholder.com/40"}
                        alt={user.fullName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <span>{user.fullName}</span>
                    </td>
                    <td className="py-2 px-4 border-b">{user.email}</td>
                    <td className="py-2 px-4 border-b">{user.role}</td>
                    <td
                      className={`py-2 px-4 border-b ${
                        user.status === "active" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {user.status}
                    </td>
                    <td className="py-2 px-4 border-b space-x-2">
                      <button
                        onClick={() => toggleRole(user._id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Make {user.role === "admin" ? "User " : "Admin"}
                      </button>
                      <button
                        onClick={() => toggleStatus(user._id)}
                        className={`${
                          user.status === "active" ? "bg-red-500" : "bg-green-500"
                        } text-white px-3 py-1 rounded hover:opacity-90`}
                      >
                        {user.status === "active" ? "Block" : "Unblock"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex justify-center mt-6">
          <p className="text-sm text-gray-500">© 2025 Everyday Special. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
