import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ScrollAwareGrid = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY && currentScrollY > 100) {
        setIsSticky(true); // scroll up → fix
      } else {
        setIsSticky(false); // scroll down → release
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <div
        className={`transition-all duration-300 ease-in-out ${
          isSticky ? "fixed top-16 left-0 right-0 z-40 bg-white shadow-md" : "relative"
        }`}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto px-4 py-3">
          {["Offer", "Category", "Account", "Drink"].map((name) => (
            <Link
              key={name}
              to={`/${name.toLowerCase()}`}
              className="p-4 bg-gray-100 rounded-xl text-center shadow hover:bg-gray-200"
            >
              {name}
            </Link>
          ))}
        </div>
      </div>

      {/* Add space below so content doesn't jump */}
      <div className="h-24" />
    </>
  );
};

export default ScrollAwareGrid;
