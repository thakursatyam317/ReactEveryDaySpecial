import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { IoArrowBack } from "react-icons/io5";

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan",
  "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
  "Uttarakhand", "West Bengal"
];

const ConfirmAddress = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    pincode: "",
    city: "",
    state: "",
    addressLine: "",
  });

  const [errors, setErrors] = useState({});
  const [selectedOption, setSelectedOption] = useState("new");
  const [savedAddress, setSavedAddress] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("eds-address");
    if (saved) {
      const parsed = JSON.parse(saved);
      setSavedAddress(parsed);
      setSelectedOption("saved");
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    const { fullName, mobile, pincode, city, state, addressLine } = formData;

    if (!fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!mobile.trim()) newErrors.mobile = "Mobile number is required.";
    if (!pincode.trim()) newErrors.pincode = "Pincode is required.";
    if (!city.trim()) newErrors.city = "City is required.";
    if (!state.trim()) newErrors.state = "State is required.";
    if (!addressLine.trim()) newErrors.addressLine = "Address line is required.";

    return newErrors;
  };

  const handleConfirm = () => {
    if (selectedOption === "saved") {
      localStorage.setItem("deliveryAddress", JSON.stringify(savedAddress));
      navigate("/payment");
      return;
    }

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    localStorage.setItem("deliveryAddress", JSON.stringify(formData));
    localStorage.setItem("eds-address", JSON.stringify(formData)); // Save for future use
    navigate("/payment");
  };

  return (
    <div className="p-6 max-w-xl mx-auto mt-28 bg-white rounded-xl shadow">
      <button onClick={() => navigate(-1)} className="mb-4 text-orange-600"><IoArrowBack /></button>

      <h2 className="text-2xl font-bold text-orange-600 mb-4">Confirm Delivery Address</h2>

      {savedAddress && (
        <div className="mb-4">
          <label className="flex gap-2 items-center mb-2">
            <input
              type="radio"
              checked={selectedOption === "saved"}
              onChange={() => setSelectedOption("saved")}
            />
            Use Saved Address
          </label>
          <div className="ml-6 text-sm text-gray-700">{savedAddress.addressLine}, {savedAddress.city}, {savedAddress.state} - {savedAddress.pincode}</div>
          <label className="flex gap-2 items-center mt-4">
            <input
              type="radio"
              checked={selectedOption === "new"}
              onChange={() => setSelectedOption("new")}
            />
            Enter New Address
          </label>
        </div>
      )}

      {selectedOption === "new" && (
        <div className="grid gap-3">
          {["fullName", "mobile", "pincode", "city", "addressLine"].map((field) => (
            <div key={field}>
              <input
                name={field}
                placeholder={field.replace(/([A-Z])/g, " $1")}
                value={formData[field]}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              {errors[field] && <p className="text-sm text-red-500">{errors[field]}</p>}
            </div>
          ))}
          <select name="state" value={formData.state} onChange={handleChange} className="p-2 border rounded">
            <option value="">Select State</option>
            {indianStates.map((s) => <option key={s}>{s}</option>)}
          </select>
          {errors.state && <p className="text-sm text-red-500">{errors.state}</p>}
        </div>
      )}

      <button onClick={handleConfirm} className="mt-5 w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600">
        Confirm Address
      </button>
    </div>
  );
};

export default ConfirmAddress;
