import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";

class Navbar extends React.Component {
  render() {
    return (
      <nav className="bg-yellow-400 text-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-2xl font-bold">EveryDaySpecial</div>
          <div className="space-x-5 relative">
            <Link to="/" className="hover:text-gray-300">Home</Link>
            <Link to="/about" className="hover:text-gray-300">About</Link>
            <Link to="/contactus" className="hover:text-gray-300">Contact Us</Link>
            <Link to="/login" className="hover:text-gray-300">Login</Link>
            <Link to="/Register" className="hover:text-gray-300">Register</Link>
            <Link to="/cart" className="hover:text-gray-300 flex w-[25px] absolute ml-[100%] mt-[-25px]   "><FaShoppingCart className='hover:text-gray-300 flex w-[30px] h-[30px]' /></Link>

          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;