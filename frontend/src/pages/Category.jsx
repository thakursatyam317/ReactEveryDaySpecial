import React, { useState, useEffect } from "react";
import FoodApi from "../assets/FootApi";
import { PiHeartFill } from "react-icons/pi";
import { FaShoppingCart } from "react-icons/fa";

const categories = ["Indian", "Italian", "Chinese"];
const types = ["Fast Food", "Indian Thali"];
const subTypes = [
  "Burger",
  "Pizza",
  "Chowmein",
  "Special Thali",
  "Normal Thali",
  "Roti",
  "Dal",
];

const Category = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedSubTypes, setSelectedSubTypes] = useState([]);
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);

  useEffect(() => {
    setFoods(FoodApi);
    setFilteredFoods(FoodApi);
  }, []);

  const handleCheckboxChange = (value, selected, setSelected) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((item) => item !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  useEffect(() => {
    const filtered = foods.filter((item) => {
      const matchCategory =
        selectedCategories.length === 0 || selectedCategories.includes(item.category);
      const matchType =
        selectedTypes.length === 0 || selectedTypes.includes(item.type);
      const matchSubType =
        selectedSubTypes.length === 0 || selectedSubTypes.includes(item.subType);
      return matchCategory && matchType && matchSubType;
    });

    setFilteredFoods(filtered);
  }, [selectedCategories, selectedTypes, selectedSubTypes, foods]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-300 overflow-y-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Filters</h1>

        {/* Category Filter */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Category</h2>
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

        {/* Type Filter */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Type</h2>
          {types.map((item, index) => (
            <div key={index}>
              <input
                type="checkbox"
                id={`type-${item}`}
                className="mr-2"
                checked={selectedTypes.includes(item)}
                onChange={() =>
                  handleCheckboxChange(item, selectedTypes, setSelectedTypes)
                }
              />
              <label htmlFor={`type-${item}`}>{item}</label>
            </div>
          ))}
        </div>

        {/* Sub-Type Filter */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Sub Type</h2>
          {subTypes.map((item, index) => (
            <div key={index}>
              <input
                type="checkbox"
                id={`subtype-${item}`}
                className="mr-2"
                checked={selectedSubTypes.includes(item)}
                onChange={() =>
                  handleCheckboxChange(item, selectedSubTypes, setSelectedSubTypes)
                }
              />
              <label htmlFor={`subtype-${item}`}>{item}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4">Food Items</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredFoods.length === 0 ? (
            <p>No food items match your filters.</p>
          ) : (
            filteredFoods.map((food, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow hover:shadow-md transition hover:scale-110"
              >
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-full h-80 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-bold">{food.name}</h3>
                <p className="text-sm text-gray-600">Category: {food.category}</p>
                <p className="text-sm text-gray-600">Type: {food.type}</p>
                <p className="text-sm text-gray-600">Sub-Type: {food.subType}</p>
                <p className="text-md text-green-600 font-semibold mt-2">₹{food.price}</p>
                <div className="grid grid-cols-2 place-content-between gap-4">
              <button className="bg-amber-500 px-5 py-2 text-white rounded-2xl  flex justify-center">
                <FaShoppingCart className="h-[100%] my-auto mx-2" />
                <span className="my-auto">Add</span>
              </button>
              <button className="bg-amber-500 px-5 py-2 text-white rounded-2xl flex justify-center ">
                <PiHeartFill className="h-[100%] my-auto mx-2" />
                <span className="my-auto">Watchlist</span>
              </button>
            </div>
                
              </div>
              
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Category;
