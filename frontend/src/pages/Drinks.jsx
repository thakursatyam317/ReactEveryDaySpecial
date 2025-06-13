import React, { useState, useEffect } from "react";
import DrinkApi from "../assets/DrinkApi"; // Replace with actual path to DrinkApi
import { PiHeartFill } from "react-icons/pi";
import { FaShoppingCart } from "react-icons/fa";

const categories = ["Juice", "Soda", "Tea", "Coffee"];
const types = ["Hot", "Cold"];
const subTypes = ["Tea", "Coffee", "Cola", "Soda", "Juice"];

const Drinks = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedSubTypes, setSelectedSubTypes] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [filteredDrinks, setFilteredDrinks] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setDrinks(DrinkApi);
    setFilteredDrinks(DrinkApi);
  }, []);

  const handleCheckboxChange = (value, selected, setSelected) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((item) => item !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  useEffect(() => {
    const filtered = drinks.filter((item) => {
      const matchCategory =
        selectedCategories.length === 0 || selectedCategories.includes(item.category);
      const matchType =
        selectedTypes.length === 0 || selectedTypes.includes(item.type);
      const matchSubType =
        selectedSubTypes.length === 0 || selectedSubTypes.includes(item.subtype);
      return matchCategory && matchType && matchSubType;
    });

    setFilteredDrinks(filtered);
  }, [selectedCategories, selectedTypes, selectedSubTypes, drinks]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const showSuccessMessage = (message, success = true) => {
    setIsSuccess(success);
    setSuccessMessage(message);
  };

  const handleAddToCart = (drink) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const isAlreadyAdded = existingCart.find((item) => item.id === drink.id);

    if (!isAlreadyAdded) {
      const updatedCart = [...existingCart, drink];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      showSuccessMessage(`${drink.name} added to Cart`, true);
    } else {
      showSuccessMessage(`${drink.name} is already in Cart`, false);
    }
  };

  const handleAddToWishlist = (drink) => {
    const existingWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const isAlreadyAdded = existingWishlist.find((item) => item.id === drink.id);

    if (!isAlreadyAdded) {
      const updatedWishlist = [...existingWishlist, drink];
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      showSuccessMessage(`${drink.name} added to Wishlist`, true);
    } else {
      showSuccessMessage(`${drink.name} is already in Wishlist`, false);
    }
  };

  return (
    <>
      {successMessage && (
        <div
          className={`absolute top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded shadow-lg text-lg font-semibold text-center w-fit transition duration-300 ${
            isSuccess ? "bg-white text-green-600" : "bg-white text-red-500"
          }`}
        >
          {successMessage}
        </div>
      )}

      <div className="flex p-6 mt-30">
        {/* Sidebar Filters */}
        <div className="w-1/4 pr-4 fixed">
          <h2 className="text-xl font-bold mb-2">Filters</h2>

          <div className="mb-4">
            <h3 className="font-semibold">Category</h3>
            {categories.map((item, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  id={`category-${item}`}
                  className="mr-2"
                  checked={selectedCategories.includes(item)}
                  onChange={() =>
                    handleCheckboxChange(item, selectedCategories, setSelectedCategories)
                  }
                />
                <label htmlFor={`category-${item}`}>{item}</label>
              </div>
            ))}
          </div>

          <div className="mb-4">
            <h3 className="font-semibold">Type</h3>
            {types.map((type, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  id={`type-${type}`}
                  className="mr-2"
                  checked={selectedTypes.includes(type)}
                  onChange={() =>
                    handleCheckboxChange(type, selectedTypes, setSelectedTypes)
                  }
                />
                <label htmlFor={`type-${type}`}>{type}</label>
              </div>
            ))}
          </div>

          <div className="mb-4">
            <h3 className="font-semibold">SubType</h3>
            {subTypes.map((sub, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  id={`subtype-${sub}`}
                  className="mr-2"
                  checked={selectedSubTypes.includes(sub)}
                  onChange={() =>
                    handleCheckboxChange(sub, selectedSubTypes, setSelectedSubTypes)
                  }
                />
                <label htmlFor={`subtype-${sub}`}>{sub}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Drink Cards */}
        <div className="ml-[25%] w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDrinks.map((drink) => (
            <div
              key={drink.id}
              className="bg-white shadow-md p-4 rounded-lg hover:scale-105 transition-transform duration-300"
            >
              <img
                src={drink.image}
                alt={drink.name}
                className="w-full h-66 object-cover rounded"
              />
              <h2 className="text-xl font-bold mt-2">{drink.name}</h2>
              <p className="text-gray-700 mb-2">{drink.category}</p>
              <p className="text-gray-700 mb-2">₹{drink.price}</p>

              <div className="relative inline-block group">
                <a href="#" className="text-yellow-500 font-semibold hover:underline">
                  Nutritional Fact
                </a>

                <div className="pointer-events-none absolute left-0 top-full mt-2 w-64 bg-white rounded-xl p-4 text-sm shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <p><strong>Weight:</strong> {drink.nutritionalfacts?.weight || "0"}ml</p>
                  <p><strong>Calories:</strong> {drink.nutritionalfacts?.calories || "0"} kcal</p>
                  <p><strong>Protein:</strong> {drink.nutritionalfacts?.protein || "0"}g</p>
                  <p><strong>Carbohydrate:</strong> {drink.nutritionalfacts?.carbohydrate || "0"}g</p>
                  <p><strong>Fat:</strong> {drink.nutritionalfacts?.fats || "0"}g</p>
                  <p><strong>Sugar:</strong> {drink.nutritionalfacts?.sugar || "0"}g</p>
                  <p><strong>Fiber:</strong> {drink.nutritionalfacts?.fiber || "0"}g</p>
                  <p className="mt-3 text-gray-500 text-xs">The Nutritional Facts is average of all drinks.</p>
                </div>
              </div>

              <div className="flex justify-between items-center mt-3">
                <button
                  onClick={() => handleAddToCart(drink)}
                  className="flex items-center space-x-1 bg-yellow-400 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  <FaShoppingCart />
                  <span>Add to Cart</span>
                </button>

                <button
                  className="text-yellow-400 hover:text-red-600"
                  onClick={() => handleAddToWishlist(drink)}
                >
                  <PiHeartFill size={24} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Drinks;
