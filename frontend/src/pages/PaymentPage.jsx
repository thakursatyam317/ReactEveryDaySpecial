import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import QRImage from "../assets/QR_Code.jpg";
import { SiPhonepe, SiPaytm, SiGooglepay } from "react-icons/si";
import { IoArrowBack } from "react-icons/io5";

const PaymentPage = () => {
  const navigate = useNavigate();
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const appliedCoupon = JSON.parse(localStorage.getItem("appliedCoupon"));
  const [selectedUPI, setSelectedUPI] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Calculate totals
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + parseFloat(item.price) * (item.quantity || 1),
    0
  );

  const finalAmount = appliedCoupon
    ? appliedCoupon.discountType === "percentage"
      ? totalAmount - (totalAmount * appliedCoupon.discountValue) / 100
      : totalAmount - appliedCoupon.value
    : totalAmount;

  const handlePlaceOrder = (paymentMethod) => {
    const address =
      localStorage.getItem("deliveryAddress") ||
      JSON.stringify(localStorage.getItem("eds-address"));

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

    localStorage.setItem("orders", JSON.stringify([...existingOrders, newOrder]));
    localStorage.removeItem("cart");
    localStorage.removeItem("deliveryAddress");
    localStorage.removeItem("appliedCoupon");

    setSuccessMessage(`✅ Order placed successfully using ${paymentMethod}!`);

    setTimeout(() => {
      navigate("/order");
    }, 800);
  };

  return (
    <>
      <button
        onClick={() => navigate(-1)}
        className="ml-0.5 mt-22 inline-block h-10 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-full text-lg transition duration-300 shadow-md"
      >
        <IoArrowBack />
      </button>

      <div className="max-w-xl mx-auto p-6 -mt-10 bg-white rounded shadow relative">
        {successMessage && (
          <div className="absolute top-0 left-0 w-full bg-green-100 text-green-800 font-medium text-center py-2 rounded-t">
            {successMessage}
          </div>
        )}

        <h2 className="text-2xl font-bold mb-6 text-center mt-8">
          💳 Choose Payment Method
        </h2>

        <div className="space-y-6">
          {/* QR Code */}
          <div className="border p-4 rounded">
            <h3 className="text-xl font-semibold mb-2">Scan & Pay via QR</h3>
            <img
              src={QRImage}
              alt="QR Code"
              className="w-64 h-64 mb-4 mx-auto"
            />
            <button
              onClick={() => handlePlaceOrder("QR Code")}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
            >
              Done & Place Order (₹{finalAmount.toFixed(2)})
            </button>
          </div>

          {/* UPI Payment */}
          <div className="border p-4 rounded">
            <h3 className="text-xl font-semibold mb-4">Pay using UPI Apps</h3>
            <div className="flex justify-around items-center mb-4 text-5xl">
              <button
                onClick={() => setSelectedUPI("PhonePe")}
                className={`${
                  selectedUPI === "PhonePe"
                    ? "text-purple-700"
                    : "text-gray-400"
                }`}
              >
                <SiPhonepe />
              </button>
              <button
                onClick={() => setSelectedUPI("Paytm")}
                className={`${
                  selectedUPI === "Paytm" ? "text-blue-600" : "text-gray-400"
                }`}
              >
                <SiPaytm />
              </button>
              <button
                onClick={() => setSelectedUPI("Google Pay")}
                className={`${
                  selectedUPI === "Google Pay"
                    ? "text-green-600"
                    : "text-gray-400"
                }`}
              >
                <SiGooglepay />
              </button>
            </div>
            <button
              disabled={!selectedUPI}
              onClick={() => handlePlaceOrder(selectedUPI)}
              className={`w-full px-4 py-2 rounded text-white ${
                selectedUPI
                  ? "bg-purple-600 hover:bg-purple-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Pay with {selectedUPI || "UPI App"} (₹{finalAmount.toFixed(2)})
            </button>
          </div>

          {/* Cash on Delivery */}
          <div className="border p-4 rounded">
            <h3 className="text-xl font-semibold mb-2">Cash on Delivery</h3>
            <button
              onClick={() => handlePlaceOrder("Cash on Delivery")}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 w-full"
            >
              Place Order (₹{finalAmount.toFixed(2)})
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
