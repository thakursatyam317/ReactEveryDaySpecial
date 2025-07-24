import React, { useState } from "react";
import QRcode from "react-qr-code";
import { useNavigate } from "react-router-dom";
import QRImage from "../assets/QR_Code.jpg";
import { SiPhonepe, SiPaytm, SiGooglepay } from "react-icons/si";
import { IoArrowBack } from "react-icons/io5";
import axios from "axios";
import QRCode from "react-qr-code";

// ✅ Utility to safely parse localStorage JSON
const getParsedLocalStorage = (key) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw.trim());
  } catch (err) {
    console.warn(`❌ Failed to parse localStorage "${key}":`, err.message);
    return null;
  }
};

const PaymentPage = () => {
  const navigate = useNavigate();
  const cartItems = getParsedLocalStorage("cart") || [];
  const address = getParsedLocalStorage("deliveryAddress");
  const appliedCoupon = getParsedLocalStorage("appliedCoupon");

  const [profile, setProfile] = useState(""); // image base64 if needed
  const [selectedUPI, setSelectedUPI] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + parseFloat(item.price) * (item.quantity || 1),
    0
  );

  // ✅ Fix NaN issue by using correct appliedCoupon.discount
  const finalAmount = appliedCoupon
    ? appliedCoupon.discountType === "percentage"
      ? totalAmount - (totalAmount * appliedCoupon.discount) / 100
      : totalAmount - appliedCoupon.discount
    : totalAmount;

  const handlePlaceOrder = async (paymentMethod) => {
    if (!address) {
      alert("Address not found! Please confirm your address.");
      navigate("/confirm-address");
      return;
    }

    if (cartItems.length === 0) {
      alert("Cart is empty!");
      navigate("/cart");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://127.0.0.1:4500/order/create",
        {
          orderItems: cartItems,
          totalPrice: finalAmount,
          shippingAddress: address,
          paymentMethod,
          // image: profile, // optional
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Clear localStorage after success
      localStorage.removeItem("cart");
      localStorage.removeItem("deliveryAddress");
      localStorage.removeItem("appliedCoupon");

      setSuccessMessage(`✅ Order placed using ${paymentMethod}!`);
      setTimeout(() => navigate("/order"), 1000);
    } catch (err) {
      console.error("❌ Order failed:", err);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <>
      <button
        onClick={() => navigate(-1)}
        className="ml-2 mt-10 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-full flex items-center"
      >
        <IoArrowBack className="mr-1" /> Back
      </button>

      <div className="max-w-xl mx-auto p-6 mt-4 bg-white rounded shadow">
        {successMessage && (
          <div className="bg-green-100 text-green-800 text-center py-2 rounded mb-4 font-semibold">
            {successMessage}
          </div>
        )}

        <h2 className="text-2xl font-bold text-center mb-6">💳 Choose Payment Method</h2>

        {/* QR Payment */}
        {/* <div className="border p-4 rounded mb-6">
          <h3 className="text-xl font-semibold mb-2">Scan & Pay via QR</h3>
          <img src={QRImage} alt="QR Code" className="w-64 h-64 mx-auto mb-4" />
          <button
            onClick={() => handlePlaceOrder("QR Code")}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
          >
            Done & Place Order (₹{finalAmount.toFixed(2)})
          </button>
        </div> */}
        {/* <QRCode
          size ={400}
          value="https://www.instagram.com/thakursatyam317/"
          className="m-5"
        /> */}



        {/* UPI Apps */}
        <div className="border p-4 rounded mb-6">
          <h3 className="text-xl font-semibold mb-4">Pay using UPI Apps</h3>
          <div className="flex justify-around text-5xl mb-4">
            <button
              onClick={() => setSelectedUPI("PhonePe")}
              className={selectedUPI === "PhonePe" ? "text-purple-700" : "text-gray-400"}
            >
              <SiPhonepe />
            </button>
            <button
              onClick={() => setSelectedUPI("Paytm")}
              className={selectedUPI === "Paytm" ? "text-blue-600" : "text-gray-400"}
            >
              <SiPaytm />
            </button>
            <button
              onClick={() => setSelectedUPI("Google Pay")}
              className={selectedUPI === "Google Pay" ? "text-green-600" : "text-gray-400"}
            >
              <SiGooglepay />
            </button>
          </div>
          <button
            disabled={!selectedUPI}
            onClick={() => handlePlaceOrder(selectedUPI)}
            className={`w-full py-2 rounded text-white font-semibold ${
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
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded"
          >
            Place Order (₹{finalAmount.toFixed(2)})
          </button>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
