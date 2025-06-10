import React, { useEffect, useState } from "react";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlistItems(storedWishlist);
  }, []);

  const handleRemoveFromWishlist = (id) => {
    const updatedWishlist = wishlistItems.filter((item) => item.id !== id);
    setWishlistItems(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  const handleAddToCart = (item) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const isAlreadyInCart = existingCart.find((cartItem) => cartItem.id === item.id);

    if (!isAlreadyInCart) {
      const updatedCart = [...existingCart, item];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setSuccessMessage(`${item.name}  Item added to cart successfully!`);

      // Remove from wishlist after adding to cart
      const updatedWishlist = wishlistItems.filter((wishItem) => wishItem.id !== item.id);
      setWishlistItems(updatedWishlist);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    } else {
      setSuccessMessage(`${item.name} is already in cart`);
    }
  };

  return (
    
    <>
      {/* ← make sure this wrapper is `relative` */}
      {successMessage && (
        <div
          className="
            absolute top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white text-yellow-500 px-6 py-3 rounded shadow-lg text-lg font-semibold text-center w-fit
          "
        >
          <div>{successMessage} <span className="text-white">✅</span> </div>
        </div>
      )}
      <div className="p-6 mt-6 w-full max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Your Wishlist</h2>

      {wishlistItems.length === 0 ? (
        <p>No items in wishlist.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 shadow rounded-lg flex flex-col md:flex-row items-center space-x-10"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-[300px] h-[300px] object-cover rounded"
              />
              <div>
                <h3 className="text-3xl font-bold mt-2">{item.name}</h3>
                <p className="text-xl font-semibold mt-2">{item.category}</p>
                <p className="text-xl font-semibold mt-2">₹{item.price}</p>
                <p className="text-xl font-semibold mt-2">{item.rating}</p>

                <div className="flex items-center justify-start mt-6 space-x-4">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-green-600"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleRemoveFromWishlist(item.id)}
                    className="bg-red-400 text-white px-6 py-2 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    
    </>
  );
};

export default Wishlist;
