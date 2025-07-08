import React from "react";
import coupons from "../assets/Coupon"; // Adjust path as needed
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Coupon = () => {
  const navigate = useNavigate();
  return (
   <>
    <button
        onClick={() => navigate(-1)} // 👈 go back to previous page
        className="fixed top-21.5 left-0.5 h-10 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-full text-lg transition duration-300 shadow-md z-50"
      >
        <IoArrowBack />
      </button>
       <div className="p-4 mt-30 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {coupons.map((coupon) => (
        <div key={coupon.id} className="bg-white rounded-xl shadow-md p-5 border border-dashed border-green-400">
          <h2 className="text-lg font-bold text-green-600">{coupon.code}</h2>
          <p className="text-sm text-gray-600 mt-1">{coupon.description}</p>
          <p className="mt-2 font-medium text-gray-800">Discount: {coupon.discount}</p>
          <p className="text-xs text-gray-500 mt-1">Valid until: {coupon.expiry}</p>
          <button className="mt-3 px-4 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600">
            Apply Coupon
          </button>
        </div>
      ))}
    </div>
   </>
  );
};

export default Coupon;  