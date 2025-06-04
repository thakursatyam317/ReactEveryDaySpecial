import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="bg-[#1e1e1e] text-white pt-12 px-6 mt-[0px]">
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
                    className={`w-44 text-start ${
                      idx === 0 ? "font-bold" : ""
                    }`}
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
            <i className="bi bi-instagram"></i>
            <i className="bi bi-facebook"></i>
            <i className="bi bi-twitter"></i>
          </div>

          {/* Subscription Input */}
          <h1 className="text-xl font-bold ml-40 mt-6 mb-4">
            Receive exclusive offers and <br /> discounts in your mailbox
          </h1>
          <div className="flex items-center ml-40">
            <div className="flex items-center bg-[#eef2f3] text-black px-3 py-2 rounded-md w-[287px]">
              <i className="bi bi-envelope mr-2"></i>
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
    </>
  );
};

export default Footer;
