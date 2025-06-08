import React, { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contactus from "./pages/Contactus";
import About from "./pages/About";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Category from "./pages/Category";
import AccountSection from "./pages/AccountSection";
import OrderPage from "./pages/OrderPage";
import Wishlist from "./pages/Wishlist";
import ConfirmAddress from "./pages/ConfirmAddress";
import PaymentPage from "./pages/PaymentPage";
import Profile from "./pages/Profile";


function App() {
  const [cartItems, setCartItems] = useState([]);
  return (
    <>
      <Router>
        <Navbar cartItems={cartItems} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contactus" element={<Contactus />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} />} />
          <Route
            path="/category"
            element={
              <Category cartItems={cartItems} setCartItems={setCartItems} />
            }
          />
          <Route path="/accountSection" element={<AccountSection />} />
          <Route path="/order" element={<OrderPage />} />
          <Route
            path="/whishlist"
            element={<Wishlist cartItems={cartItems} />}
          />
          <Route path="/confirm-address" element={<ConfirmAddress />} />
          <Route path="/payment" element={<PaymentPage />} />

           <Route path="/profile" element={<Profile />} />

        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
