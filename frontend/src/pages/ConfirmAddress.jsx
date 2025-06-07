import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ConfirmAddress = () => {
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleConfirm = () => {
    if (!address.trim()) {
      alert("Please enter your address.");
      return;
    }
    localStorage.setItem("deliveryAddress", address);
    navigate("/payment");
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-30 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Confirm Delivery Address</h2>
      <textarea
        className="w-full p-3 border rounded mb-4"
        rows={5}
        placeholder="Enter your full delivery address here..."
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button
        onClick={handleConfirm}
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Confirm Address
      </button>
    </div>
  );
};

export default ConfirmAddress;
