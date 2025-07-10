// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contactus from "./pages/Contactus";
import About from "./pages/About";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Category from "./pages/Category";
import Account from "./pages/Account";
import OrderPage from "./pages/OrderPage";
import Wishlist from "./pages/Wishlist";
import ConfirmAddress from "./pages/ConfirmAddress";
import PaymentPage from "./pages/PaymentPage";
import Profile from "./pages/Profile";
import Drinks from "./pages/Drinks";
import BestSeller from "./pages/BestSeller";
import ScrollNavbar from "./components/ScrollNavbar";
import Coupon from "./pages/Coupon";
import AdminDashboard from "./admin/Dashboard";
import OrderPlaceOrNot from "./admin/OrderPlaceOrNot"; // Uncomment if needed
import ProductManagement from "./admin/ProductManagement";
import UserManagement from "./admin/UserManagement"; // Uncomment if needed
import CouponsAdmin from "./admin/CouponsAdmin";
import SaveAddress from "./pages/SaveAddress";


function App() {
  const [cartItems, setCartItems] = useState([]);

  return (
    <Router>
      <Navbar cartItems={cartItems} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contactus" element={<Contactus />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} />} />
        <Route
          path="/category"
          element={<Category cartItems={cartItems} setCartItems={setCartItems} />}
        />
        <Route path="/account" element={<Account />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/wishlist" element={<Wishlist cartItems={cartItems} />} />
        <Route path="/confirm-address" element={<ConfirmAddress />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/drink" element={<Drinks />} />
        <Route path="/scrollnavbar" element={<ScrollNavbar />} />
        <Route path="/bestseller" element={<BestSeller />} />
        <Route
          path="/coupon"
          element={<Coupon  />}
        />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/order-status" element={<OrderPlaceOrNot />} />
        <Route path="/admin/product-management" element={<ProductManagement />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/coupons" element={<CouponsAdmin />} />
        {/* Uncomment the line below if you want to use OrderPlaceOrNot */}
        {/* <Route path="/admin/order-place-or-not" element={<OrderPlaceOrNot />} /> */}
        <Route path="/checkout/save-address" element={<SaveAddress />} />
       

      </Routes>
    </Router>
  );
}

export default App;
