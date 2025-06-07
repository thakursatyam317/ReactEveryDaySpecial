import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const handleRemoveFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleOrderNow = () => {
    if (cartItems.length === 0) {
      alert("Cart is empty!");
      return;
    }
    navigate("/confirm-address");
  };

  // Calculate total price
  const totalAmount = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="p-6 mt-6 w-full max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 shadow rounded-lg flex flex-col md:flex-row items-center space-x-10"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-[300px] h-[300px] object-cover rounded"
                />
                <div>
                  <h3 className="text-3xl font-bold mt-2">{item.name}</h3>
                  <p className="text-xl font-semibold mt-2">{item.category}</p>
                  <p className="text-xl font-semibold mt-2">₹{item.price}</p>
                  <p className="text-xl font-semibold mt-2">{item.rating}</p>

                  <div className="flex items-center justify-start mt-6 space-x-4">
                    <button
                      onClick={() => handleRemoveFromCart(item.id)}
                      className="bg-red-400 text-white px-6 py-2 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Total amount and single Order button */}
          <div className="mt-8 flex justify-between items-center">
            <h3 className="text-2xl font-semibold">
              Total Amount: ₹{totalAmount.toFixed(2)}
            </h3>
            <button
              onClick={handleOrderNow}
              className="bg-yellow-400 text-white px-8 py-3 rounded hover:bg-green-600"
            >
              Order Now
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
