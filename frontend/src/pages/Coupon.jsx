import React, { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Coupon = () => {
  const navigate = useNavigate();
  const [coupons, setCoupons] = useState([]);

  // Fetch all coupons from backend
  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const res = await axios.get("http://localhost:4500/api/coupons/all");
        setCoupons(res.data);
      } catch (err) {
        console.error("Failed to fetch coupons", err);
      }
    };

    fetchCoupons();
  }, []);

  // Save selected coupon to localStorage
  const handleApply = (coupon) => {
    localStorage.setItem("appliedCoupon", JSON.stringify(coupon));
    alert(`Coupon "${coupon.code}" applied!`);
    navigate(-1); // go back to previous page
  };

  return (
    <>
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-5 left-3 h-10 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-full text-lg transition duration-300 shadow-md z-50"
      >
        <IoArrowBack />
      </button>

      {/* Coupon List */}
      <div className="p-4 mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {coupons.length === 0 ? (
          <p className="text-center col-span-full text-gray-600">No coupons available.</p>
        ) : (
          coupons.map((coupon) => (
            <div
              key={coupon._id}
              className="bg-white rounded-xl shadow-md p-5 border border-dashed border-green-400"
            >
              <h2 className="text-lg font-bold text-green-600 uppercase">{coupon.code}</h2>
              <p className="text-sm text-gray-600 mt-1">{coupon.description || "No description"}</p>
              <p className="mt-2 font-medium text-gray-800">Discount: {coupon.discount}</p>
              <p className="text-xs text-gray-500 mt-1">
                Valid until:{" "}
                {coupon.validTill
                  ? new Date(coupon.validTill).toLocaleDateString()
                  : "No expiry"}
              </p>
              <button
                className="mt-3 px-4 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
                onClick={() => handleApply(coupon)}
              >
                Apply Coupon
              </button>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Coupon;
