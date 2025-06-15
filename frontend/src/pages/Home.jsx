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
        <div className="h-[60px] w-[400px] border-2 rounded mx-auto flex ">
          <Link to="/menu" className="  my-auto flex border-none ">
            <CiSearch className="my-auto mx-0.5 text-2xl" />
            <input
              type="text"
              placeholder="Search our Foods"
              className="h-[60px] w-[400px] border-none outline-none text-2xl"
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
