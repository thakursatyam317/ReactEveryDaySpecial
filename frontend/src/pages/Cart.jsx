import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // ✅ Fetch cart from backend
  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:4500/api/cart"); // Replace with actual user ID
      setCartItems(res.data.cart || []);
    } catch (err) {
      console.error("Failed to fetch cart", err);
      setMessage("Error fetching cart");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // ✅ Remove item from cart
  const removeFromCart = async (productId) => {
    try {
      const res = await axios.delete(`/api/cart/${productId}`);
      setCartItems(res.data.cart || []);
      setMessage("Item removed from cart");
    } catch (err) {
      console.error("Error removing item", err);
      setMessage("Failed to remove item");
    }
  };

  // ✅ Total price
  const getTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  return (
    <div className="p-6">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded flex items-center"
      >
        <IoArrowBack className="mr-2" />
        Back
      </button>

      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {/* Message */}
      {message && (
        <div className="mb-4 bg-green-100 text-green-700 px-4 py-2 rounded">
          {message}
        </div>
      )}

      {/* Cart Items */}
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center bg-white shadow p-4 rounded"
            >
              <div className="flex items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded mr-4"
                />
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p>₹{item.price} × {item.quantity}</p>
                  <p className="text-sm text-gray-500">{item.category}</p>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Total */}
      {cartItems.length > 0 && (
        <div className="mt-6 text-right">
          <h2 className="text-xl font-bold">Total: ₹{getTotal()}</h2>
          <button
            onClick={() => navigate("/checkout")}
            className="mt-4 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
