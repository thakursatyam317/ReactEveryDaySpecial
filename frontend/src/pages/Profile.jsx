import React, { useState } from "react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    fullName: "Satyam Thakur",
    email: "satyam@example.com",
    dob: "2000-01-01",
    gender: "Male",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="max-w-md mx-auto mt-30 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">My Profile</h2>

      <div className="mb-4">
        <label className="block text-gray-600">Full Name</label>
        {isEditing ? (
          <input
            type="text"
            name="fullName"
            value={profile.fullName}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          />
        ) : (
          <p className="mt-1">{profile.fullName}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-600">Email</label>
        {isEditing ? (
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          />
        ) : (
          <p className="mt-1">{profile.email}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-600">Date of Birth</label>
        {isEditing ? (
          <input
            type="date"
            name="dob"
            value={profile.dob}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          />
        ) : (
          <p className="mt-1">{profile.dob}</p>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-gray-600">Gender</label>
        {isEditing ? (
          <select
            name="gender"
            value={profile.gender}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        ) : (
          <p className="mt-1">{profile.gender}</p>
        )}
      </div>

      <button
        onClick={toggleEdit}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
      >
        {isEditing ? "Save" : "Edit Profile"}
      </button>
    </div>
  );
};

export default Profile;
