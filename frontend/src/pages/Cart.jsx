import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Coupons from "../assets/Coupon";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const handleRemoveFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleOrderNow = () => {
    if (cartItems.length === 0) {
      alert("Cart is empty!");
      return;
    }
    navigate("/confirm-address");
  };

  const getTotalAmount = () => {
    return cartItems.reduce((acc, item) => {
      const price = parseFloat(item.price);
      return acc + (isNaN(price) ?  price: price);
    }, 0);
  };

  const calculateDiscountedAmount = () => {
    const total = getTotalAmount();
    if (!appliedCoupon) return total;

    if (appliedCoupon.discountType === "percentage") {
      return total - (total * appliedCoupon.value) / 100;
    } else if (appliedCoupon.discountType === "flat") {
      return total - appliedCoupon.value;
    }
    return total;
  };

  const handleApplyCoupon = () => {
    if (!selectedCoupon) return;
    const total = getTotalAmount();
    if (selectedCoupon.minAmount && total < selectedCoupon.minAmount) {
      alert(`Minimum ₹${selectedCoupon.minAmount} required to use this coupon`);
      return;
    }
    setAppliedCoupon(selectedCoupon);
  };

  const totalAmount = getTotalAmount();
  const finalAmount = calculateDiscountedAmount();
  const discountAmount = totalAmount - finalAmount;

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

          {/* Coupon Section */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Apply Coupon</h3>
            <div className="flex gap-4 flex-wrap">
              {Coupons.map((coupon) => (
                <div
                  key={coupon.id}
                  onClick={() => setSelectedCoupon(coupon)}
                  className={`p-4 rounded-lg border cursor-pointer shadow w-[200px] ${
                    selectedCoupon?.code === coupon.code
                      ? "border-green-500 bg-green-50"
                      : "hover:border-gray-300"
                  }`}
                >
                  <p className="font-bold">{coupon.code}</p>
                  <p className="text-sm">{coupon.description}</p>
                </div>
              ))}
            </div>
            <button
              onClick={handleApplyCoupon}
              className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
              Apply Coupon
            </button>

            {appliedCoupon && (
              <p className="mt-2 text-green-600">
                Coupon <b>{appliedCoupon.code}</b> applied! You saved ₹
                {discountAmount.toFixed(2)}
              </p>
            )}
          </div>

          <div className="mt-8 flex justify-between items-center">
            <h3 className="text-2xl font-semibold">
              Total: ₹{finalAmount.toFixed(2)}{" "}
              {appliedCoupon && (
                <span className="line-through text-gray-500 ml-2 text-lg">
                  ₹{totalAmount.toFixed(2)}
                </span>
              )}
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
