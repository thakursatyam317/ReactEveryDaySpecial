import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);// Get form data 
    const email = formData.get("email");// Get email from form data
    const password = formData.get("password");// Get password from form data

    try {
      const response = await fetch("http://localhost:4500/auth/login", { // Send POST request to backend
        method: "POST",//post method hai
        headers: {// Set headers for the request
          "Content-Type": "application/json",// Specify content type as JSON
        },
        body: JSON.stringify({ email, password }),// Convert form data to JSON formate 
      });

      const data = await response.json();// 
      console.log("Response from backend:", data);// Log the response from backend


      // Check if the response is ok (status code 200)

      if (response.ok) {
        localStorage.setItem("isLoggedIn", "true");// Set login status in localStorage
        localStorage.setItem("user", JSON.stringify(data.user));// Store user information in localStorage

        //  Show success message
        setSuccessMessage("Login Successfully ✅");

        // Delay navigation to show message
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        alert(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 relative">
      {/* Success message */}
      {successMessage && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white text-yellow-500 px-6 py-3 rounded shadow-lg text-lg font-semibold text-center w-fit">
          {successMessage}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-4xl font-bold text-center mb-6">Login</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            required
            name="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            required
            name="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="text-right mb-4">
          <Link to="#" className="text-blue-500 text-sm hover:underline">
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
