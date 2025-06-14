import React from "react";
import { useNavigate } from "react-router-dom";
import QRImage from "../assets/QR_Code.jpg";

const PaymentPage = () => {
  const navigate = useNavigate();
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const appliedCoupon = JSON.parse(localStorage.getItem("appliedCoupon"));

  const totalAmount = cartItems.reduce((acc, item) => acc + parseFloat(item.price), 0);

  const finalAmount = (() => {
    if (!appliedCoupon) return totalAmount;
    if (appliedCoupon.discountType === "percentage") {
      return totalAmount - (totalAmount * appliedCoupon.discountValue) / 100;
    } else if (appliedCoupon.discountType === "flat") {
      return totalAmount - appliedCoupon.value;
    }
    return totalAmount;
  })();

  const handlePlaceOrder = (paymentMethod) => {
    const address = localStorage.getItem("deliveryAddress");

    if (!address) {
      alert("Address not found! Please enter your address.");
      navigate("/confirm-address");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      navigate("/cart");
      return;
    }

    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];

    const newOrder = {
      id: "ORD" + Date.now(),
      date: new Date().toISOString().split("T")[0],
      items: cartItems,
      total: finalAmount,
      address,
      payment: paymentMethod,
      status: "Confirmed",
    };

    const updatedOrders = [...existingOrders, newOrder];
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    localStorage.removeItem("cart");
    localStorage.removeItem("deliveryAddress");
    localStorage.removeItem("appliedCoupon");

    navigate("/order");
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-30 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Choose Payment Method</h2>

      <div className="space-y-6">
        <div className="border p-4 rounded">
          <h3 className="text-xl font-semibold mb-2">QR Code Payment</h3>
          <img src={QRImage} alt="QR Code" className="w-64 h-64 mb-2" />
          <button
            onClick={() => handlePlaceOrder("QR Code")}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Done & Place Order (₹{finalAmount.toFixed(2)})
          </button>
        </div>

        <div className="border p-4 rounded">
          <h3 className="text-xl font-semibold mb-2">Cash on Delivery</h3>
          <button
            onClick={() => handlePlaceOrder("Cash on Delivery")}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Place Order (₹{finalAmount.toFixed(2)})
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
