// File: pages/UserProfile.jsx

import React, { useState, useEffect } from "react";
import axios from "../components/api"; // Adjust the import path as necessary
import { Camera, Pencil, Save } from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/user/profile");
        setUser(res.data);
        setFullName(res.data.fullName);
        setEmail(res.data.email);
        setDob(res.data.dob);
        setPhone(res.data.phone);
      } catch (err) {
        console.error("Failed to load profile", err);
      }
    };
    fetchProfile();
  }, []);

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const res = await axios.post("/user/upload-avatar", formData);
      setUser({ ...user, avatar: res.data.avatar });
    } catch (err) {
      console.error("Avatar upload failed", err);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const updatedData = { fullName, email, dob, phone };
      const res = await axios.put("/user/profile", updatedData);
      setUser(res.data);
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to save profile", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white shadow-xl rounded-xl">
      <div className="flex justify-between items-start">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-300">
            <img
              src={user?.avatar || "/default-avatar.png"}
              alt="User Avatar"
              className="object-cover w-full h-full"
            />
            <label className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow cursor-pointer">
              <Camera size={20} />
              <input type="file" className="hidden" onChange={handleAvatarChange} />
            </label>
          </div>
          <h1 className="text-2xl font-bold text-indigo-700">{user?.fullName}</h1>
          <p className="text-gray-600">{user?.email}</p>
        </div>

        {!isEditing ? (
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Pencil size={16} /> Edit Profile
          </button>
        ) : (
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <Save size={16} /> Save Changes
          </button>
        )}
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full mt-1 border px-3 py-2 rounded-lg"
            type="text"
            disabled={!isEditing}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 border px-3 py-2 rounded-lg"
            type="email"
            disabled={!isEditing}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Date of Birth</label>
          <input
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full mt-1 border px-3 py-2 rounded-lg"
            type="date"
            disabled={!isEditing}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Mobile Number</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full mt-1 border px-3 py-2 rounded-lg"
            type="tel"
            disabled={!isEditing}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
