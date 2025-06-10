import React from 'react';
import { Link } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import Footer from '../components/Footer';

const home = () => {
  return (
    <>
        <div className="p-6 space-y-10 mt-20">

           <div className='h-[60px] w-[400px] border-2 rounded mx-auto flex '>
          <Link to="/menu" className="  my-auto flex border-none "><CiSearch className='my-auto mx-0.5 text-2xl' /><input type="text" placeholder='Search our Foods'  className="h-[60px] w-[400px] border-none outline-none text-2xl"/></Link>
        </div>
      {/* Hero Section */}
      <div className="bg-gray-100 rounded-2xl shadow-lg p-10 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to EveryDaySpecial</h1>
        <p className="text-gray-600 mb-6">Find the best deals on your favorite Foods</p>
        {/* <button className='bg-yellow-400  h-[50px] w-[100px] rounded-2xl hover:text-white'>Shop Now</button> */}
       
      </div>

      {/* Categories */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          
            <div  className="bg-white flex flex-col-3 rounded-xl shadow p-4 text-center hover:bg-gray-50 cursor-pointer">
              <Link to='/menu' className="font-medium">Offer</Link>
            </div>
            <div  className="bg-white flex flex-col-3 rounded-xl shadow p-4 text-center hover:bg-gray-50 cursor-pointer">
             <Link to='/category' className="font-medium">Category</Link>
           </div>
            <div  className="bg-white flex flex-col-3 rounded-xl shadow p-4 text-center hover:bg-gray-50 cursor-pointer">
              <Link to='/accountSection' className="font-medium">Account</Link>
            </div>
            <div  className="bg-white flex flex-col-3 rounded-xl shadow p-4 text-center hover:bg-gray-50 cursor-pointer">
              <Link to='/menu' className="font-medium">Drink</Link>
            </div>
          
        </div>
      </div>

      {/* Featured Products */}
      {/* <div>
        <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <Card key={product.id}>
              <div className="text-center">
                <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-xl mb-4" />
                <h3 className="text-lg font-medium">{product.name}</h3>
                <p className="text-gray-500">{product.price}</p>
                <Button className="mt-3">Add to Cart</Button>
              </div>
            </Card>
          ))}
        </div>
      </div> */}
    </div>
    <Footer />
    </>
  )
}

export default home