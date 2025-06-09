import React from "react";
import { useNavigate } from "react-router-dom";
import QRImage from "../assets/QR_Code.jpg"; // Your QR code image

const PaymentPage = () => {
  const navigate = useNavigate();
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

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

    // Save full cartItems here, not just names
    const newOrder = {
      id: "ORD" + Date.now(),
      date: new Date().toISOString().split("T")[0],
      items: cartItems, // Save entire item objects (with image, price, etc)
      total: cartItems.reduce((acc, item) => acc + item.price, 0),
      address,
      payment: paymentMethod,
      status: "Confirmed",
    };

    const updatedOrders = [...existingOrders, newOrder];
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    localStorage.removeItem("cart");
    localStorage.removeItem("deliveryAddress");

    navigate("/order");
  };

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price, 0);

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
            Done & Place Order (₹{totalAmount})
          </button>
        </div>

        <div className="border p-4 rounded">
          <h3 className="text-xl font-semibold mb-2">Cash on Delivery</h3>
          <button
            onClick={() => handlePlaceOrder("Cash on Delivery")}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Place Order (₹{totalAmount})
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
