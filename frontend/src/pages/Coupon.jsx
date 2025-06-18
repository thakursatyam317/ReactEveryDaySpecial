import React from "react";
import coupons from "../assets/Coupon"; // Array of coupon objects

const Coupon = () => {
  const userDOB = "2000-06-18"; // <-- Replace with dynamic user DOB later

  const today = new Date();
  const birthDate = new Date(userDOB);

  const isBirthday = today.getDate() === birthDate.getDate() && today.getMonth() === birthDate.getMonth();

  return (
    <div className="p-4 mt-30 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {coupons.map((coupon) => {
        const isBirthdayCoupon = coupon.code.toLowerCase().includes("birthday");

        const disabled = isBirthdayCoupon && !isBirthday;

        return (
          <div
            key={coupon.id}
            className={`bg-white rounded-xl shadow-md p-5 border ${
              isBirthdayCoupon ? "border-yellow-400" : "border-green-400"
            } border-dashed`}
          >
            <h2 className="text-lg font-bold text-green-600">{coupon.code}</h2>
            <p className="text-sm text-gray-600 mt-1">{coupon.description}</p>
            <p className="mt-2 font-medium text-gray-800">Discount: {coupon.discount}</p>
            <p className="text-xs text-gray-500 mt-1">Valid until: {coupon.expiry}</p>
            <button
              disabled={disabled}
              className={`mt-3 px-4 py-1 text-sm rounded text-white ${
                disabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {disabled ? "Only on Birthday" : "Apply Coupon"}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Coupon;
