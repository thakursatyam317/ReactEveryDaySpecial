import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SaveAddress = () => {
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: "",
    mobile: "",
    pincode: "",
    city: "",
    state: "",
    addressLine: "",
  });

  useEffect(() => {
    // Load from localStorage if exists
    const saved = JSON.parse(localStorage.getItem("eds-address"));
    if (saved) setAddress(saved);
  }, []);

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { fullName, mobile, pincode, city, state, addressLine } = address;

    if (!fullName || !mobile || !pincode || !city || !state || !addressLine) {
      toast.error("Please fill in all fields.");
      return;
    }

    localStorage.setItem("eds-address", JSON.stringify(address));
    toast.success("Address saved successfully!");
    navigate("/"); // redirect to home page
  };

  return (
    <div className="max-w-xl mx-auto mt-30 p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-semibold mb-6 text-center">Save Delivery Address</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
       
         <textarea
          name="addressLine"
          placeholder="Full Address"
          value={address.addressLine}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-2 border rounded-md"
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={address.city}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={address.state}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
        />
        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          value={address.pincode}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
        />
        
        
       
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md"
        >
          Save Address
        </button>
      </form>
    </div>
  );
};

export default SaveAddress;
