import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import Logo from "../assets/logo.png"; // Your logo path

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  // Check login status & cart count on mount
  useEffect(() => {
    checkLoginStatus();
    updateCartCount();
  }, []);

  // Update cart count & login status on storage changes and focus
  useEffect(() => {
    const updateState = () => {
      checkLoginStatus();
      updateCartCount();
    };

    window.addEventListener("storage", updateState);
    window.addEventListener("focus", updateState);

    return () => {
      window.removeEventListener("storage", updateState);
      window.removeEventListener("focus", updateState);
    };
  }, []);

  const checkLoginStatus = () => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  };

  const updateCartCount = () => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cartItems.length);
  };

  const showSuccessMessage = (message, success = true) => {
    setIsSuccess(success);
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    showSuccessMessage("Logged out successfully", true);
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <>
      {/* Success Message */}
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
          <div>
            <img src={Logo} alt="Logo" className="h-[60px]" />
          </div>

          {/* Navigation Links */}
          <div className="space-x-5 flex items-center">
            <Link to="/" className="hover:text-gray-300">
              Home
            </Link>
            <Link to="/about" className="hover:text-gray-300">
              About
            </Link>
            <Link to="/contactus" className="hover:text-gray-300">
              Contact Us
            </Link>

            {!isLoggedIn ? (
              <>
                <Link to="/login" className="hover:text-gray-300">
                  Login
                </Link>
                <Link to="/register" className="hover:text-gray-300">
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="hover:text-gray-300 focus:outline-none"
              >
                Logout
              </button>
            )}

            {/* Cart Icon with Badge */}
            <div
              className="relative cursor-pointer"
              onClick={() => navigate("/cart")}
              aria-label="Go to cart"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && navigate("/cart")}
            >
              <FaShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-[1px]">
                  {cartCount}
                </span>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
