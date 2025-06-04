import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contactus from "./pages/Contactus";
import About from "./pages/About";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart"
import Category from './pages/Category'



function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contactus" element={<Contactus />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path='/about' element={<About/>}/>
          <Route path='/menu' element={<Menu/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/category' element={<Category/>}/>

    
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
