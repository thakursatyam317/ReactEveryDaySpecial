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
import toast from "react-hot-toast";
import { IoArrowBack } from "react-icons/io5";

const AccountSection = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");

    window.dispatchEvent(new Event("authChange"));

    // ✅ Show toast first
    toast.success("Saved!", {
      duration: 2000,
      style: {
        background: "#333",
        color: "#fff",
      },
    });

    // ⏳ Wait before navigating
    setTimeout(() => {
      navigate("/login");
    }, 1800); // match toast duration
  };

  return (
    <>
      <button
        onClick={() => navigate(-1)} // 👈 go back to previous page
        className="fixed top-21.5 left-0.5 h-10 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-full text-lg transition duration-300 shadow-md z-50"
      >
        <IoArrowBack />
      </button>
      <div className="w-[90%] md:w-[50%] mx-auto mt-40 p-6 bg-white shadow-lg rounded-2xl">
        <h2 className="text-xl font-bold mb-6 text-center">My Account</h2>

        <div className="space-y-4 grid">
          <div className="grid grid-cols-2 gap-2">
            <AccountButton
              icon={<FaBoxOpen />}
              text="Order"
              onClick={() => navigate("/order")}
            />
            <AccountButton
              icon={<FaHeart />}
              text="Wishlist"
              onClick={() => navigate("/wishlist")}
            />
            <AccountButton
              icon={<FaTags />}
              text="Coupon"
              onClick={() => navigate("/coupon")}
            />
            <AccountButton icon={<FaQuestionCircle />} text="Help Center" />
          </div>

          <AccountButton
            icon={<FaUser />}
            text="Profile"
            onClick={() => navigate("/user/profile")}
          />
          <AccountButton
            icon={<FaMapMarkerAlt />}
            text="Saved Addresses"
            onClick={() => navigate("/checkout/save-address")}
          />
          <AccountButton text="🌐 Select Language" />
          <AccountButton
            icon={<FaSignOutAlt />}
            text="Logout"
            onClick={handleLogout}
          />
        </div>
      </div>
    </>
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
