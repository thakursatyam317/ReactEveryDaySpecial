import React from "react";
import { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Register Data:", formData);
    alert("Register Successful!");
    // Add your Register logic here
  };

  return (
    <>
      <div className="min-h-screen mt-20 flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-xl"
        >
          <h2 className="text-2xl font-bold text-center mb-6">
            Register Form
          </h2>

          <div className="mb-4">
            <label className="block mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              required
              onChange={handleChange}
              value={formData.fullName}
              className="w-full border px-4 py-2 rounded"
              placeholder="Enter your Name"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              onChange={handleChange}
              value={formData.email}
              className="w-full border px-4 py-2 rounded"
              placeholder="Enter your Email"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              required
              onChange={handleChange}
              value={formData.phone}
              className="w-full border px-4 py-2 rounded"
              placeholder="Enter your Phone Number"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Date of Birth</label>
            <input
              type="date"
              name="dob"
              required
              onChange={handleChange}
              value={formData.dob}
              className="w-full border px-4 py-2 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Gender</label>
            <select
              name="gender"
              required
              onChange={handleChange}
              value={formData.gender}
              className="w-full border px-4 py-2 rounded"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-1">Create Password</label>
            <input
              type="password"
              name="password"
              required
              onChange={handleChange}
              value={formData.password}
              className="w-full border px-4 py-2 rounded"
              placeholder="Enter password"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              required
              onChange={handleChange}
              value={formData.confirmPassword}
              className="w-full border px-4 py-2 rounded"
              placeholder="Confirm password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-blue-700 text-white py-2 rounded font-semibold"
          >
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
