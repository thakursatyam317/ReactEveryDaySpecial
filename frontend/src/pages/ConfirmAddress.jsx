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
    houseNumber: "",
    colony: "",
    landmark: "",
    city: "",
    district: "",
    state: "",
    mapLink: "",
  });

  const [errors, setErrors] = useState({});
  const [selectedOption, setSelectedOption] = useState("new");
  const [savedAddress, setSavedAddress] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("eds-address"));
    if (saved) {
      const fullAddress = `${saved.addressLine}, ${saved.city}, ${saved.state} - ${saved.pincode}`;
      const formatted = {
        label: "Home",
        address: fullAddress,
        name: saved.fullName,
        mobile: saved.mobile,
      };
      setSavedAddress(formatted);
      setSelectedOption("saved");
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleConfirm = () => {
    if (selectedOption === "saved") {
      navigate("/payment");
      return;
    }

    const { houseNumber, colony, city, district, state } = formData;
    const newErrors = {};

    if (!houseNumber.trim()) newErrors.houseNumber = "House number is required.";
    if (!colony.trim()) newErrors.colony = "Colony name is required.";
    if (!city.trim()) newErrors.city = "City is required.";
    if (!district.trim()) newErrors.district = "District is required.";
    if (!state.trim()) newErrors.state = "Please select a state.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const { landmark, mapLink } = formData;
    const fullAddress = `${houseNumber}, ${colony}, ${landmark ? landmark + ", " : ""}${city}, ${district}, ${state}${mapLink ? " (Map: " + mapLink + ")" : ""}`;

    localStorage.setItem("deliveryAddress", fullAddress);
    navigate("/payment");
  };

  return (
    <>
      <button
        onClick={() => navigate(-1)}
        className="fixed top-21.5 left-0.5 h-10 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-full text-lg transition duration-300 shadow-md z-50"
      >
        <IoArrowBack />
      </button>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl mx-auto p-6 mt-28 bg-white rounded-xl shadow-lg border border-orange-100"
      >
        <motion.h2
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="text-3xl font-bold mb-6 text-center text-orange-600"
        >
          🍱 Confirm Delivery Address
        </motion.h2>

        {savedAddress && (
          <div className="mb-6 space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="saved"
                value="saved"
                checked={selectedOption === "saved"}
                onChange={() => setSelectedOption("saved")}
                className="accent-orange-500"
              />
              <label htmlFor="saved" className="font-medium">
                Use Saved Address
              </label>
            </div>

            <div className="ml-6 text-gray-600 text-sm bg-gray-50 p-3 rounded border">
              {/* <p><strong>{savedAddress.name}</strong> ({savedAddress.mobile})</p> */}
              <p>{savedAddress.address}</p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="new"
                value="new"
                checked={selectedOption === "new"}
                onChange={() => setSelectedOption("new")}
                className="accent-orange-500"
              />
              <label htmlFor="new" className="font-medium">
                Enter New Address
              </label>
            </div>
          </div>
        )}

        {selectedOption === "new" && (
          <div className="grid gap-4">
            {[{ name: "houseNumber", label: "🏠 House Number" },
              { name: "colony", label: "🏘️ Colony Name" },
              { name: "landmark", label: "📍 Landmark (Optional)" },
              { name: "city", label: "🏙️ City" },
              { name: "district", label: "📌 District" },
            ].map((field) => (
              <div key={field.name}>
                <input
                  name={field.name}
                  type="text"
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.label}
                  className="p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                />
                {errors[field.name] && (
                  <p className="text-red-500 text-sm">{errors[field.name]}</p>
                )}
              </div>
            ))}

            <div>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="p-3 border rounded w-full bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="">🌐 Select State</option>
                {indianStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              {errors.state && (
                <p className="text-red-500 text-sm">{errors.state}</p>
              )}
            </div>

            <div>
              <input
                name="mapLink"
                type="text"
                value={formData.mapLink}
                onChange={handleChange}
                placeholder="🗺️ Google Map Link (Optional)"
                className="p-3 border rounded w-full focus:outline-none"
              />
              {formData.city && formData.state && (
                <button
                  type="button"
                  onClick={() => {
                    const query = encodeURIComponent(
                      `${formData.houseNumber}, ${formData.colony}, ${formData.city}, ${formData.district}, ${formData.state}`
                    );
                    window.open(
                      `https://www.google.com/maps/search/?api=1&query=${query}`,
                      "_blank"
                    );
                  }}
                  className="mt-2 text-sm text-blue-600 hover:underline"
                >
                  📍 Preview on Google Maps
                </button>
              )}
            </div>
          </div>
        )}

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleConfirm}
          className="mt-6 bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 w-full transition"
        >
          ✅ Confirm Address
        </motion.button>
      </motion.div>
    </>
  );
};

export default ConfirmAddress;