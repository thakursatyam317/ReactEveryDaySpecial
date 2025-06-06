import React, { useState, useEffect } from "react";
import FoodApi from "../assets/FootApi";
import { PiHeartFill } from "react-icons/pi";
import { FaShoppingCart } from "react-icons/fa";

const categories = ["Indian", "Italian", "Chinese", "American"];
const types = ["Fast Food", "Indian Thali"];
const subTypes = [
  "Burger",
  "Pizza",
  "Pasta",
  "French Fries",
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
        selectedCategories.length === 0 ||
        selectedCategories.includes(item.category);
      const matchType =
        selectedTypes.length === 0 || selectedTypes.includes(item.type);
      const matchSubType =
        selectedSubTypes.length === 0 ||
        selectedSubTypes.includes(item.subtype);
      return matchCategory && matchType && matchSubType;
    });

    setFilteredFoods(filtered);
  }, [selectedCategories, selectedTypes, selectedSubTypes, foods]);

  const handleAddToCart = (food) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const isAlreadyAdded = existingCart.find((item) => item.id === food.id);

    if (!isAlreadyAdded) {
      const updatedCart = [...existingCart, food];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      alert(`${food.name} added to cart`);
    } else {
      alert(`${food.name} already in cart`);
    }
  };

  return (
    <div className="flex p-6 mt-20">
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
                  handleCheckboxChange(
                    item,
                    selectedCategories,
                    setSelectedCategories
                  )
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
                  handleCheckboxChange(
                    sub,
                    selectedSubTypes,
                    setSelectedSubTypes
                  )
                }
              />
              <label htmlFor={`subtype-${sub}`}>{sub}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Food Cards */}
      <div className="ml-[25%] w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFoods.map((food) => (
          <div
            key={food.id}
            className="bg-white shadow-md p-4 rounded-lg hover:scale-105 transition-transform duration-300"
          >
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-48 object-cover rounded"
            />
            <h2 className="text-xl font-bold mt-2">{food.name}</h2>
            
            <p className="text-gray-700 mb-2">{food.category}</p>
            <p className="text-gray-700 mb-2">₹{food.price}</p>


            {/* Nutritional Facts Hover */}
            <div className="relative inline-block group ml-[0%]">
              <a
                href="#"
                className="text-yellow-500 font-semibold hover:underline"
              >
                Nutritional Fact
              </a>

              {/* This div only shows when hovering on the text above */}
              <div className="pointer-events-none absolute left-0 top-full mt-2 w-64 bg-white rounded-xl p-4 text-sm shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <p>
                  <strong>Weight:</strong>{" "}
                  {food.nutritionalfacts?.weight || "0"}g
                </p>
                <p>
                  <strong>Calories:</strong>{" "}
                  {food.nutritionalfacts?.calories || "0"} kcal
                </p>
                <p>
                  <strong>Protein:</strong>{" "}
                  {food.nutritionalfacts?.protein || "0"}g
                </p>
                <p>
                  <strong>Carbohydrate:</strong>{" "}
                  {food.nutritionalfacts?.carbohydrate || "0"}g
                </p>
                <p>
                  <strong>Fat:</strong> {food.nutritionalfacts?.fats || "0"}g
                </p>
                <p>
                  <strong>Sugar:</strong> {food.nutritionalfacts?.sugar || "0"}g
                </p>
                <p>
                  <strong>Fiber:</strong> {food.nutritionalfacts?.fiber || "0"}g
                </p>
                <p className="mt-3">
                  The Nutritional Facts is average of all foods.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center mt-3">
              <button
                onClick={() => handleAddToCart(food)}
                className="flex items-center space-x-1 bg-yellow-400 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                <FaShoppingCart />
                <span>Add to Cart</span>
              </button>

              <button className="text-yellow-400 hover:text-red-600">
                <PiHeartFill size={24} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
