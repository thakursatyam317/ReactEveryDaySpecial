
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const StickyScroll = () => {
  const headerRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const header = headerRef.current;
    const stickyOffset = header.offsetTop;

    const handleScroll = () => {
      if (window.pageYOffset > stickyOffset) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="font-sans">
      <div
        ref={headerRef}
        className={` text-yellow-500 text-sm  ${
          isSticky ? "fixed top-0 w-[1570px] z-50 mt-22 -ml-7" : ""
        }`}
      >
        <div className="flex justify-center h-20 -mt-1  bg-white shadow-md">
          <div className="flex gap-30">
            <div className="h-[50px] w-[220px] bg-white shadow rounded-xl flex items-center justify-center hover:bg-gray-100 transition">
              <Link
                to={"/category"}
                className="text-lg font-medium text-center"
              >
                Category
              </Link>
            </div>
            <div className="h-[50px] w-[220px] bg-white shadow rounded-xl flex items-center justify-center hover:bg-gray-100 transition">
              <Link to={"/drink"} className="text-lg font-medium text-center">
                Drink
              </Link>
            </div>
            <div className="h-[50px] w-[220px] bg-white shadow rounded-xl flex items-center justify-center hover:bg-gray-100 transition">
              <Link className="text-lg font-medium text-center">Offer</Link>
            </div>
            <div className="h-[50px] w-[220px] bg-white shadow rounded-xl flex items-center justify-center hover:bg-gray-100 transition">
              <Link to={"/account"} className="text-lg font-medium text-center">
                Account
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className={`p-4 ${isSticky ? "pt-24" : ""}`}></div>
    </div>
  );
};

export default StickyScroll;
