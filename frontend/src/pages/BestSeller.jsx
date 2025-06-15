import React, { useState, useEffect } from "react";
import ProductApi from "../assets/FootApi";
import { FaShoppingCart } from "react-icons/fa";
import { PiHeartFill, PiHeart } from "react-icons/pi";

const BestSeller = () => {
  const bestSellers = ProductApi.filter((item) => item.rating >= 4.3);
  const [successMessage, setSuccessMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const showMessage = (msg, success = true) => {
    setIsSuccess(success);
    setSuccessMessage(msg);
  };

  const handleAddToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const isAlreadyAdded = existingCart.some((item) => item.id === product.id);

    if (!isAlreadyAdded) {
      const updatedCart = [...existingCart, product];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      showMessage(`${product.name} added to cart`, true);
    } else {
      showMessage(`${product.name} is already in cart`, false);
    }
  };

  const handleAddToWishlist = (product) => {
    const existingWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const isAlreadyAdded = existingWishlist.some((item) => item.id === product.id);

    if (!isAlreadyAdded) {
      const updatedWishlist = [...existingWishlist, product];
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      showMessage(`${product.name} added to wishlist`, true);
    } else {
      showMessage(`${product.name} is already in wishlist`, false);
    }
  };

  return (
    <>
      {/* Toast */}
      {successMessage && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded shadow-lg text-lg font-semibold w-fit transition duration-300 ${
            isSuccess ? "bg-white text-green-600" : "bg-white text-red-500"
          }`}
        >
          {successMessage}
        </div>
      )}

      <div className="p-6">
        <h2 className="text-5xl font-bold mb-6 text-center text-amber-500">
          Best <span className="text-amber-800">Sellers</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow rounded-2xl p-4 hover:shadow-lg transition flex flex-col justify-between"
            >
              <img
                src={product.image[0]}
                alt={product.name}
                className="w-full h-64 object-cover rounded-xl mb-4"
              />
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-gray-600">
                {product.category} - {product.type}
              </p>
              <p className="text-yellow-600 font-bold">₹{product.price}</p>
              <p className="text-sm text-green-700 mb-3">⭐ {product.rating}</p>

              <div className="flex items-center justify-between mt-auto pt-4">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <FaShoppingCart /> Add to Cart
                </button>

                <div
                  onClick={() => handleAddToWishlist(product)}
                  className="cursor-pointer text-2xl"
                >
                  <PiHeart className="text-gray-500 hover:text-red-500" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BestSeller;
