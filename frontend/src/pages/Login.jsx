import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("user");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await fetch("http://localhost:4500/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await response.json();
      console.log("Response from backend:", data);

      if (response.ok) {
        const { user, token } = data;

        if (!user || !user.role) {
          throw new Error("Invalid user data from server");
        }

        // ❌ Block normal users from logging in as admin
        if (role === "admin" && user.role !== "admin") {
          toast.error("❌ You are not authorized as Admin");
          localStorage.clear();
          return;
        }

        // ✅ Save login info
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);

        // 🔄 Notify other components
        window.dispatchEvent(new Event("authChange"));

        // ✅ Show success toast
        toast.success("✅ Login Successful!", {
          duration: 1500,
          position: "top-center",
        });

        e.target.reset();

        // Wait 1.5 seconds before navigation
        setTimeout(() => {
          navigate(user.role === "admin" ? "/admin/dashboard" : "/");
        }, 1500);
      } else {
        toast.error(data.message || "❌ Login failed. Try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("❌ Something went wrong. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-4xl font-bold text-center mb-6">Login</h2>

        {/* Role Selector */}
        <div className="mb-6 flex justify-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="role"
              value="user"
              checked={role === "user"}
              onChange={() => setRole("user")}
              className="accent-yellow-400"
            />
            <span className="text-gray-700 font-medium">User</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="role"
              value="admin"
              checked={role === "admin"}
              onChange={() => setRole("admin")}
              className="accent-blue-600"
            />
            <span className="text-gray-700 font-medium">Admin</span>
          </label>
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            required
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            name="password"
            required
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
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
