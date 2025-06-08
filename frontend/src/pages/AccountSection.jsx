// AccountSection.js
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaBoxOpen,
  FaUser,
  FaHeart,
  FaTags,
  FaQuestionCircle,
  FaSignOutAlt,
} from "react-icons/fa";

const AccountSection = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logged out");
  };

  const goToWishlist = () => {
    navigate("/whishlist");
  };

  const goToOrders = () => {
    navigate("/order");
  };

  return (
    <div className="w-[50%] mx-auto mt-40 p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-xl font-bold mb-6 text-center">My Account</h2>

      <div className="space-y-4 grid">
        <div className="grid grid-cols-2">
          <AccountButton icon={<FaBoxOpen />} text="Order" onClick={goToOrders} />
          <AccountButton icon={<FaHeart />} text="Wishlist" onClick={goToWishlist} />
          <AccountButton icon={<FaTags />} text="Coupons" />
          <AccountButton icon={<FaQuestionCircle />} text="Help Center" />
        </div>

        <AccountButton icon={<FaUser />} text="Profile"  onClick={() => navigate("/profile")}/>
        <AccountButton icon={<FaMapMarkerAlt />} text="Saved Addresses" />
        <AccountButton text="🌐 Select Language" />
        <AccountButton icon={<FaSignOutAlt />} text="Logout" onClick={handleLogout} />
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
