import React from "react";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import Footer from "../components/Footer";
import BestSeller from "./BestSeller";
import ScrollNavbar from "../components/ScrollNavbar";

const home = () => {
  return (
    <>
      <div className="p-6 space-y-10 mt-20">

         <div className="max-w-lg h-14 border-2 rounded-full mx-auto w-[95%] flex items-center px-4 shadow-sm hover:shadow-md transition">
          <Link to="/menu" className="flex items-center w-full">
            <CiSearch className="text-2xl text-gray-500" />
            <input
              type="text"
              placeholder="Search our Foods"
              className="w-full h-full border-none outline-none text-lg pl-3"
            />
          </Link>
        </div>

        
        {/* Hero Section */}
        <div className="bg-gray-100 rounded-2xl shadow-lg p-10 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to EveryDaySpecial
          </h1>
          <p className="text-gray-600 mb-6">
            Find the best deals on your favorite Foods
          </p>
          
        </div>

      
        <div>
          <h2 className="text-2xl font-semibold mb-4">Shop by Category</h2>
          {/* 🔒 Fixed Grid Under Navbar */}
         <ScrollNavbar />
        </div>

       
      </div>
      <BestSeller />

      <Footer />
    </>
  );
};

export default home;
