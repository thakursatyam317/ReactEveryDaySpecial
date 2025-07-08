import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);

  const dummyProducts = [
    {
      _id: "prod1",
      title: "Veggie Pizza",
      price: 299,
      category: "Pizza",
    },
    {
      _id: "prod2",
      title: "Classic Burger",
      price: 149,
      category: "Burger",
    },
    {
      _id: "prod3",
      title: "French Fries",
      price: 99,
      category: "Snacks",
    },
    {
      _id: "prod4",
      title: "Pasta Alfredo",
      price: 229,
      category: "Pasta",
    },
  ];

  const fetchProducts = async () => {
    try {
      // In real case, replace with your API call
      setProducts(dummyProducts);
      toast.success("Loaded dummy products");
    } catch (err) {
      toast.error("Failed to load products");
    }
  };

  const handleEdit = (id) => {
    toast.success(`Edit clicked for product ID: ${id}`);
    // Navigate or open modal to edit product
  };

  const handleDelete = (id) => {
    const updated = products.filter((prod) => prod._id !== id);
    setProducts(updated);
    toast.success("Product deleted (dummy)");
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const navItemStyle =
    "block px-4 py-2 rounded hover:bg-gray-700 transition duration-200";

  return (
    <div className="flex mt-20">
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
      <div className="ml-64 p-6 w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">🛍️ Product Management</h2>

        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-md rounded-xl p-6 mb-6 border"
          >
            <p className="text-sm text-gray-500">
              <strong>ID:</strong> #{product._id}
            </p>
            <p className="text-lg font-semibold text-gray-800">
              {product.title}
            </p>
            <p className="text-sm text-gray-600">Category: {product.category}</p>
            <p className="text-sm text-gray-600 mb-4">Price: ₹{product.price}</p>

            <div className="flex gap-4">
              <button
                onClick={() => handleEdit(product._id)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductManagement;
