import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

import {
  FaBoxOpen,
  FaUser,
  FaHeart,
  FaTags,
  FaQuestionCircle,
  FaSignOutAlt,
} from "react-icons/fa";

const AccountSection = () => {
  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logged out");
  };

  return (
    <div className="w-[50%] mx-auto mt-30 p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-xl font-bold mb-6 text-center">My Account</h2>

      <div className="space-y-4 grid">
        <div className="grid grid-cols-2 ">
          <AccountButton icon={<FaBoxOpen />} text="Order" />
          <AccountButton icon={<FaHeart />} text="Wishlist" />
          <AccountButton icon={<FaTags />} text="Coupons" />
          <AccountButton icon={<FaQuestionCircle />} text="Help Center" />
        </div>

        <AccountButton icon={<FaUser />} text="Profile" />
        <button className="w-[90%] flex items-center gap-2 p-3 border rounded-lg hover:bg-gray-100 transition text-left">
          <FaMapMarkerAlt className="text-lg text-gray-700" />
          <span className="text-base font-medium">Saved Addresses</span>
        </button>

        <button

          className="w-[90%] flex items-center gap-2 p-3 border rounded-lg hover:bg-gray-100 transition text-left"
        >
          🌐 Select Language
        </button>

        <div>
          <AccountButton
            icon={<FaSignOutAlt />}
            text="Logout"
            onClick={handleLogout}
          />
        </div>
      </div>
    </div>
  );
};

const AccountButton = ({ icon, text, onClick }) => (
  <button
    onClick={onClick}
    className="w-[90%] my-2 flex items-center gap-3 p-3 text-left border rounded-lg hover:bg-gray-100 transition"
  >
    <span className="text-lg">{icon}</span>
    <span className="text-base font-medium">{text}</span>
  </button>
);

export default AccountSection;
