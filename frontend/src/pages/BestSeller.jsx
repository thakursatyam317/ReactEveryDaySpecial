import React, { useState } from "react";
import ProductApi from "../assets/FootApi"; // renamed import
import { FaShoppingCart } from "react-icons/fa";
import { PiHeartFill, PiHeart } from "react-icons/pi";

const BestSeller = () => {
  const bestSellers = ProductApi.filter((item) => item.rating >= 4.3);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  const addToCart = (product) => {
    if (!cartItems.includes(product.id)) {
      setCartItems([...cartItems, product.id]);
      alert(`${product.name} added to cart`);
    }
  };

  const toggleWishlist = (product) => {
    const alreadyInWishlist = wishlistItems.some((item) => item.id === product.id);
    if (alreadyInWishlist) {
      setWishlistItems(wishlistItems.filter((item) => item.id !== product.id));
    } else {
      setWishlistItems([...wishlistItems, product]);
      alert(`${product.name} added to wishlist`);
    }

    // Optional: Save to localStorage
    // localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
  };

  return (
    <div className="p-6">
      <h2 className="text-5xl font-bold mb-6 text-center text-amber-500">
        Best <span className="text-amber-800">Sellers</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {bestSellers.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow rounded-2xl p-4 hover:shadow-lg transition relative"
          >
            <button
              onClick={() => toggleWishlist(product)}
              className="absolute top-3 right-3 text-red-500 text-xl"
            >
              {wishlistItems.some((item) => item.id === product.id) ? (
                <PiHeartFill />
              ) : (
                <PiHeart />
              )}
            </button>

            <img
              src={product.image[0]}
              alt={product.name}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="text-gray-600">
              {product.category} - {product.type}
            </p>
            <p className="text-yellow-600 font-bold">₹{product.price}</p>
            <p className="text-sm text-green-700 mb-3">⭐ {product.rating}</p>

            <button
              onClick={() => addToCart(product)}
              className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg w-full flex items-center justify-center gap-2"
            >
              <FaShoppingCart /> Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
