import React, { useEffect, useState } from "react";
import FoodApi from "../assets/FootApi.js";
import { PiHeartFill } from "react-icons/pi";
import { FaShoppingCart } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";

const Manu = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    // Simulate API call
    setFoods(FoodApi);
  }, []);
  return (
    <>
      <div className="container h-[60px] w-[400px] border-2 rounded mx-auto flex mt-2 my-[20px] ">
        <span className="  my-auto flex border-none ">
          <CiSearch className="my-auto  text-2xl mx-1" />
          <input
            type="text"
            placeholder="Search our Foods"
            className="h-[60px] w-[400px] border-none outline-none text-2xl"
          />
          
        </span>
      </div>

      


      <div className=" grid grid-cols-4 gap-6">
        {foods.map((item) => (
          <div key={item.id} className=" grid rounded-xl shadow p-4 hover:scale-110">
            <img
              src={item.image}
              alt={item.name}
              className="rounded w-full h-60 object-cover mb-4 "
            />
            <h2 className="text-xl font-bold">{item.name}</h2>
            <div className="grid grid-cols-2 place-content-between gap-4 ">
              <p className="text-sm text-gray-500">{item.category}</p>
              {/* <p className="text-sm text-gray-500"><FaStar />{item.rating}</p> */}

              {/* <p className="text-yellow-500 ml-9 hover:">Nutritional</p> */}
            </div>
            <p className="text-orange-500 font-semibold">
              ₹{item.price.toFixed(2)}
            </p>
            <p className="text-yellow-500 flex">
              <FaStar className="text-yellow-500 h-[100%] my-auto mx-2" />{" "}
              {item.rating}
            </p>
            {/* <p className="text-yellow-500"> {item.nutritionalfacts}</p> */}
            <div className="relative  inline-block group ml-[0%]">
              <a
                href="#"
                className="text-yellow-500 font-semibold w-auto  hover:underline "
              >
                Nutritional Fact
              </a>

              <div className="absolute shadow-2xl top-full mt-2 w-64 bg-white  rounded-xl p-4 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <p>
                  <strong>Weight:</strong>
                  {item.nutritionalfacts?.weight || "0 g"}g
                </p>
                <p>
                  <strong>Calories:</strong>
                  {item.nutritionalfacts?.calories || "0 g"} kcal
                </p>
                <p>
                  <strong>Protein:</strong>{" "}
                  {item.nutritionalfacts?.protein || "0 g"}g
                </p>
                <p>
                  <strong>Carbohydrate:</strong>{" "}
                  {item.nutritionalfacts?.carbohydrate || "0 g"}g
                </p>
                <p>
                  <strong>Fat:</strong> {item.nutritionalfacts?.fats || "0 g"}g
                </p>

                <p>
                  <strong>Sugar:</strong>{" "}
                  {item.nutritionalfacts?.sugar || "0 g"}g
                </p>
                <p>
                  <strong>Fiber:</strong>{" "}
                  {item.nutritionalfacts?.fiber || "0 g"}g
                </p>
                <p className="mt-3 ">
                  The Nutrational Facts is Average of all Foods
                </p>
              </div>
            </div>

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
        ))}
      </div>
    </>
  );
};

export default Manu;
