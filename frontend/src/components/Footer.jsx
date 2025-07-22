import React from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#1e1e1e] text-white pt-12 px-6 mt-[0px] mb-[-25px]">
      <div className="max-w-screen-xl mx-auto">
        {/* Top Cities */}
        <h1 className="text-lg font-bold ml-28 mb-6">Our Top Cities</h1>
        <div className="space-y-2 text-base ml-28">
          {[
            [
              "San Francisco",
              "Los Angeles",
              "New York City",
              "Chicago",
              "Columbus",
            ],
            [
              "Miami",
              "Washington DC",
              "Orange County",
              "Phoenix",
              "New Mexico",
            ],
            ["San Diego", "Seattle", "Atlanta", "Las Vegas", "Albuquerque"],
            ["East Bay", "Portland", "Charlotte", "Sacramento", "Sacramento"],
            [
              "Long Beach",
              "Nashville",
              "Denver",
              "Oklahoma City",
              "New Orleans",
            ],
          ].map((row, idx) => (
            <div key={idx} className="flex gap-6">
              {row.map((city) => (
                <span key={city} className="w-36 text-start">
                  {city}
                </span>
              ))}
            </div>
          ))}
        </div>

        <hr className="my-6 ml-28 w-[83%] border-gray-600" />

        {/* About Us Section */}
        <div className="text-base ml-28">
          {[
            ["COMPANY", "CONTACT", "LEGAL", "LEGAL"],
            [
              "About Us",
              "Help & Support",
              "Terms & Conditions",
              "Terms & Conditions",
            ],
            [
              "Team",
              "Partner with us",
              "Refund & Cancellation",
              "Refund & Cancellation",
            ],
            ["Careers", "Ride with us", "Privacy Policy", "Privacy Policy"],
            ["blog", "Ride with us", "Cookie Policy", ""],
          ].map((row, idx) => (
            <div key={idx} className="flex gap-10 mb-4">
              {row.map((item, i) => (
                <span
                  key={i}
                  className={`w-44 text-start ${idx === 0 ? "font-bold" : ""}`}
                >
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>

        {/* Social Media Icons */}
        <h1 className="text-lg font-bold ml-40 mt-8">FOLLOW US</h1>
        <div className="flex gap-6 ml-40 mt-2 text-2xl">
          <a
            href="https://www.instagram.com/thakursatyam317/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-orange-500"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=100049060613734"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-orange-500"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://www.twitter.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-orange-500"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.linkedin.com/in/thakursatyam2005/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-orange-500"
          >
            <FaLinkedinIn />
          </a>
        </div>

        {/* Subscription Input */}
        <h1 className="text-xl font-bold ml-40 mt-6 mb-4">
          Receive exclusive offers and <br /> discounts in your mailbox
        </h1>
        <div className="flex items-center ml-40">
          <div className="flex items-center bg-[#eef2f3] text-black px-3 py-2 rounded-md w-[287px]">
            <FaEnvelope className="mr-2" />
            <input
              type="email"
              placeholder="Enter Email"
              className="bg-[#eef2f3] w-full focus:outline-none"
            />
          </div>
          <button className="ml-3 px-4 py-2 bg-orange-500 text-white font-bold rounded w-[100px]">
            Subscribe
          </button>
        </div>

        <hr className="my-6 ml-40 w-[83%] border-gray-600" />
      </div>
    </footer>
  );
};

export default Footer;
