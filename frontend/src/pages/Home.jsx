import React from "react";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import Footer from "../components/Footer";
import BestSeller from "./BestSeller";
import ScrollNavbar from "../components/ScrollNavbar";
import { motion } from "framer-motion";
import ManWalking from "../assets/ManWalking.mp4"; // Ensure this path is correct

const Home = () => {
  return (
    <>
      <motion.div
        className="p-6 space-y-10 mt-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Search Bar */}
        <motion.div
          className="max-w-lg h-14 border-2 rounded-full mx-auto w-[95%] flex items-center px-4 shadow-sm hover:shadow-md transition"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Link to="/menu" className="flex items-center w-full">
            <CiSearch className="text-2xl text-gray-500" />
            <input
              type="text"
              placeholder="Search our Foods"
              className="w-full h-full border-none outline-none text-lg pl-3"
            />
          </Link>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          className="relative bg-gradient-to-r from-orange-100 to-yellow-50 rounded-3xl shadow-xl p-10 text-center overflow-hidden"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {/* Decorative Circles */}
          <div className="absolute top-[-40px] left-[-40px] w-40 h-40 bg-amber-300 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-[-40px] right-[-40px] w-40 h-40 bg-orange-400 rounded-full opacity-10 animate-pulse"></div>

          <h1 className="text-5xl font-extrabold text-amber-600 mb-4 drop-shadow-md">
            Welcome to <span className="text-orange-500">EveryDaySpecial</span>
          </h1>
          <p className="text-gray-700 text-lg md:text-xl mb-6 max-w-2xl mx-auto">
            Discover mouth-watering vegetarian meals, snacks & drinks — all in one place. Save big on your everyday cravings!
          </p>

          {/* Updated Video Tag */}
          {/* <video
            src={ManWalking}
            autoPlay
            loop
            muted
            playsInline
            className="mx-auto w-full max-w-md rounded-xl shadow-lg mb-6"
          /> */}

          <Link
            to="/menu"
            className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-full text-lg transition duration-300 shadow-md"
          >
            Explore Menu 🍽️
          </Link>
        </motion.div>

        {/* Shop by Category */}
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Shop by Category</h2>
          <ScrollNavbar />
        </motion.div>
      </motion.div>

      {/* Best Seller with animation */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <BestSeller />
      </motion.div>

      <Footer />
    </>
  );
};

export default Home;
