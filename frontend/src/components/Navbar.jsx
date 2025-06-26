import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

import Logo from "../assets/logo.png";
import axios from "axios";
import { useAuth } from "../context/authContext";

const Navbar = () => {
  const { authUser, setAuthUser } = useAuth();
  const [successMessage, setSuccessMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setAuthUser(userData); // ✅ Ensure user is synced on reload
    updateCartCount();
  }, []);

  useEffect(() => {
    const updateState = () => {
      updateCartCount();
      const userData = JSON.parse(localStorage.getItem("user"));
      setAuthUser(userData); // ✅ Sync on focus or storage change
    };
    window.addEventListener("storage", updateState);
    window.addEventListener("focus", updateState);
    return () => {
      window.removeEventListener("storage", updateState);
      window.removeEventListener("focus", updateState);
    };
  }, []);

  const updateCartCount = () => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cartItems.length);
  };

  const showSuccessMessage = (message, success = true) => {
    setIsSuccess(success);
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem("user");
      localStorage.setItem("isLoggedIn", "false");

      const res = await axios.post("http://127.0.0.1:4500/auth/logout");
      if (res.data.message) {
        showSuccessMessage(res.data.message, true);
      } else {
        showSuccessMessage("✅ Logged out successfully", true);
      }

      setAuthUser(null);
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      console.error("Error during logout:", error);
      showSuccessMessage("❌ Logout failed. Please try again.", false);
    }
  };

  return (
    <>
      {successMessage && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded shadow-lg text-lg font-semibold text-center w-fit transition duration-300 ${
            isSuccess ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {successMessage}
        </div>
      )}

      <nav className="bg-yellow-400 text-white shadow fixed top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <Link to="/">
            <img src={Logo} alt="Logo" className="h-[60px]" />
          </Link>

          {/* Nav Links */}
          <div className="space-x-5 flex items-center">
            <Link to="/" className="navAnimation hover:text-gray-300">
              Home
            </Link>
            <Link to="/about" className="navAnimation hover:text-gray-300">
              About
            </Link>
            <Link to="/contactus" className="navAnimation hover:text-gray-300">
              Contact Us
            </Link>

            {/* ✅ Admin Dashboard */}
            {authUser?.role === "admin" && (
              <Link
                to="/admin/dashboard"
                className="navAnimation hover:text-gray-300 flex items-center gap-1"
              >
              
                Dashboard
              </Link>
            )}

            {/* ✅ Auth Links */}
            {!authUser ? (
              <>
                <Link to="/login" className="navAnimation hover:text-gray-300">
                  Login
                </Link>
                <Link to="/register" className="navAnimation hover:text-gray-300">
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="navAnimation hover:text-gray-300 focus:outline-none"
              >
                Logout
              </button>
            )}

            {/* Cart Icon */}
            <div
              className="relative cursor-pointer"
              onClick={() => navigate("/cart")}
              aria-label="Go to cart"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && navigate("/cart")}
            >
              <FaShoppingCart size={24} />
              {/* Optional cart count */}
              {/* {cartCount > 0 && (
                <span className="navAnimation absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-[1px]">
                  {cartCount}
                </span>
              )} */}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
