import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import foodData from "../assets/FootApi.js"; // Static data

const ProductManagement = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(foodData);
  }, []);

  const navItemStyle = ({ isActive }) =>
    `block py-2 px-4 rounded hover:bg-gray-700 transition ${
      isActive ? "bg-gray-800 font-semibold" : ""
    }`;

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 h-screen bg-gray-900 text-white p-6 fixed top-0 left-0 shadow-lg">
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
      <div className="flex-1 ml-64 p-4 mt-20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-orange-600">🛒 Product Management</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border text-left text-sm">
            <thead className="bg-orange-100">
              <tr>
                <th className="p-2">Image</th>
                <th className="p-2">ID</th>
                <th className="p-2">Name</th>
                <th className="p-2">Price</th>
                <th className="p-2">Category</th>
                <th className="p-2">Calories</th>
                <th className="p-2">Protein (g)</th>
                <th className="p-2">Fat (g)</th>
                <th className="p-2">Carbs (g)</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product._id} className="border-t hover:bg-orange-50">
                    <td className="p-2">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="p-2">{product.id}</td>
                    <td className="p-2 font-medium">{product.name}</td>
                    <td className="p-2">₹{product.price}</td>
                    <td className="p-2">{product.category}</td>
                    <td className="p-2">{product?.nutritionalfacts?.calories || "—"}</td>
                    <td className="p-2">{product?.nutritionalfacts?.protein || "—"}</td>
                    <td className="p-2">{product?.nutritionalfacts?.fats || "—"}</td>
                    <td className="p-2">{product?.nutritionalfacts?.carbohydrate || "—"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-gray-500">
                    No products found.
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

export default ProductManagement;
