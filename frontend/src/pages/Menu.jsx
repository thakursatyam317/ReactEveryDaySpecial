import React, { useEffect, useState } from "react";
import FoodApi from "../assets/FootApi.js";
import { PiHeartFill } from "react-icons/pi";
import { FaShoppingCart } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Manu = () => {
  const [foods, setFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setFoods(FoodApi);
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setCartItems(storedCart);
    setWishlist(storedWishlist);
  }, []);

  const showMessage = (msg) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(""), 2000); // Hide after 2s
  };

  const handleAddToCart = (item) => {
    const isAlreadyInCart = cartItems.some((i) => i.id === item.id);
    if (isAlreadyInCart) {
      showMessage("🛒 Already in cart");
      return;
    }

    const updatedCart = [...cartItems, { ...item, quantity: 1 }];
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
    showMessage("✅ Added to cart");
  };

  const handleAddToWishlist = (item) => {
    const isAlreadyInWishlist = wishlist.some((i) => i.id === item.id);
    if (isAlreadyInWishlist) {
      showMessage("❤️ Already in watchlist");
      return;
    }

    const updatedWishlist = [...wishlist, item];
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    showMessage("💖 Added to watchlist");
  };

  const uniqueFoods = [];
  const seen = new Set();
  for (const item of foods) {
    const key = `${item.name?.trim().toLowerCase()}||${item.image}`;
    if (!seen.has(key)) {
      seen.add(key);
      uniqueFoods.push(item);
    }
  }

  const filteredFoods = uniqueFoods.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <button
        onClick={() => navigate(-1)} // 👈 go back to previous page
        className="fixed top-21.5 left-0.5 h-10 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-full text-lg transition duration-300 shadow-md z-50"
      >
        <IoArrowBack />
      </button>
      <div className="px-4 md:px-10 mt-26 relative">
        {/* Success Message */}
        {successMessage && (
          <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-amber-50 text-yellow-600 text-xl px-6 py-2 rounded-2xl font-semibold shadow-lg z-50 transition-all duration-300">
            {successMessage}
          </div>
        )}

        {/* Search Box */}
        <div className=" max-w-xl h-14 border-2 rounded-full mx-auto flex items-center px-4 my-8 shadow-md">
          <CiSearch className="text-2xl text-gray-500" />
          <input
            type="text"
            placeholder="Search our Foods"
            className="w-full h-full border-none outline-none text-lg pl-3 "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Grid Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredFoods.map((item, index) => (
            <div
              key={index}
              className="rounded-xl shadow-lg p-4 hover:scale-105 transform transition duration-300 bg-white"
            >
              <img
                src={item.image}
                alt={item.name}
                className="rounded-xl w-full h-60 object-cover mb-4"
              />
              <h2 className="text-xl font-semibold mb-1">{item.name}</h2>
              <p className="text-sm text-gray-500 mb-1">{item.category}</p>
              <p className="text-orange-500 font-semibold mb-1">
                ₹{item.price.toFixed(2)}
              </p>
              <p className="text-yellow-500 flex items-center mb-2">
                <FaStar className="text-yellow-500 mr-2" /> {item.rating}
              </p>

              {/* Nutritional Info on Hover */}
              <div className="relative group">
                <button className="text-yellow-500 font-semibold hover:underline">
                  Nutritional Facts
                </button>
                <div className="absolute top-full left-0 mt-2 w-72 bg-white border rounded-xl p-4 text-sm shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 z-40">
                  <p>
                    <strong>Weight:</strong>{" "}
                    {item.nutritionalfacts?.weight || "0"}g
                  </p>
                  <p>
                    <strong>Calories:</strong>{" "}
                    {item.nutritionalfacts?.calories || "0"} kcal
                  </p>
                  <p>
                    <strong>Protein:</strong>{" "}
                    {item.nutritionalfacts?.protein || "0"}g
                  </p>
                  <p>
                    <strong>Carbs:</strong>{" "}
                    {item.nutritionalfacts?.carbohydrate || "0"}g
                  </p>
                  <p>
                    <strong>Fat:</strong> {item.nutritionalfacts?.fats || "0"}g
                  </p>
                  <p>
                    <strong>Sugar:</strong>{" "}
                    {item.nutritionalfacts?.sugar || "0"}g
                  </p>
                  <p>
                    <strong>Fiber:</strong>{" "}
                    {item.nutritionalfacts?.fiber || "0"}g
                  </p>
                  <p className="mt-3 text-gray-600">
                    *Average values for display only.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between mt-4 gap-2">
                <button
                  onClick={() => handleAddToCart(item)}
                  className="bg-amber-500 hover:bg-amber-600 px-4 py-2 text-white rounded-xl flex items-center justify-center w-full"
                >
                  <FaShoppingCart className="mr-2" /> Add
                </button>
                <button
                  onClick={() => handleAddToWishlist(item)}
                  className="bg-amber-500 hover:bg-amber-600 px-4 py-2 text-white rounded-xl flex items-center justify-center w-full"
                >
                  <PiHeartFill className="mr-2" /> Watchlist
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Manu;
