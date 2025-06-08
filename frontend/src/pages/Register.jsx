import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [data, setData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    dob: "",
    gender: "",
    crPassword: "",
    password: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // password match guard
    if (data.crPassword !== data.password) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post("http://127.0.0.1:4500/auth/register", data);
      console.log("API Response:", res.status, res.data);

      if (res.status === 200 || res.status === 201) {
        // show banner
        setSuccessMessage("User Registered Successfully ✅");

        // clear form
        setData({
          fullName: "",
          email: "",
          mobileNumber: "",
          dob: "",
          gender: "",
          crPassword: "",
          password: "",
        });

        // hide banner after 3s
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong on our end.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {/* ← make sure this wrapper is `relative` */}
      {successMessage && (
        <div
          className="
            absolute top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white text-yellow-500 px-6 py-3 rounded shadow-lg text-lg font-semibold text-center w-fit
          "
        >
          {successMessage}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Register Form
        </h2>

        {/* Full Name */}
        <div className="mb-4">
          <label className="block mb-1">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={data.fullName}
            onChange={handleChange}
            required
            placeholder="Enter your Name"
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            required
            placeholder="Enter your Email"
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        {/* Mobile Number */}
        <div className="mb-4">
          <label className="block mb-1">Mobile Number</label>
          <input
            type="text"
            name="mobileNumber"
            value={data.mobileNumber}
            onChange={handleChange}
            required
            placeholder="Enter your Phone Number"
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        {/* DOB */}
        <div className="mb-4">
          <label className="block mb-1">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={data.dob}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        {/* Gender */}
        <div className="mb-4">
          <label className="block mb-1">Gender</label>
          <select
            name="gender"
            value={data.gender}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Create Password */}
        <div className="mb-4">
          <label className="block mb-1">Create Password</label>
          <input
            type="password"
            name="crPassword"
            value={data.crPassword}
            onChange={handleChange}
            required
            placeholder="Enter password"
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="block mb-1">Confirm Password</label>
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            required
            placeholder="Confirm password"
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-400 hover:bg-blue-700 text-white py-2 rounded font-semibold transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
