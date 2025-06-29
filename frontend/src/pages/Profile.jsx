import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import Infinite from "../assets/infinite-spinner.svg";
import toast from "react-hot-toast";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { authUser, fetchProfile, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
  });

  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    if (authUser) {
      setFormData({
        fullName: authUser.fullName || "",
        email: authUser.email || "",
        phone: authUser.phone || "",
        dob: authUser.dob || "",
      });
    }
    setAuthLoading(false);
  }, [authUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    setError("");
    try {
      const updatedData = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        dob: formData.dob,
      };
      await updateProfile(updatedData);
      toast.success("Profile updated successfully!");
    } catch (error) {
      setError("Failed to update profile.");
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return <div className="text-center mt-50 text-xl">Loading...</div>;
  }

  if (!authUser && !loading) {
    return (
      <div className="text-center mt-20">
        <p className="text-xl text-gray-600 mb-4">No user found 😕</p>
        <button
          onClick={() => navigate("/login")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go to Login
        </button>
      </div>
    );
  }

  if (loading && authUser) {
    return <div className="text-center mt-50 text-xl">Loading profile...</div>;
  }

  if (loading && !authUser) {
    return <div className="text-center mt-50 text-xl">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-500">
        {error}
        <div className="mt-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={fetchProfile}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-50">
      <div className="bg-white shadow-md rounded-lg p-8 w-[75%]">
        <h1 className="text-2xl font-bold mb-6 text-center">👤 Your Profile</h1>

        <div className="flex flex-wrap justify-center gap-8 items-center ">
          <div className="relative ml-[-250px] ">
            <img
              src={
                preview ||
                "https://placehold.co/600x400?text=" + authUser.fullName.toUpperCase().slice(0, 1)
              }
              alt="Profile"
              className="w-60 h-60 rounded-full object-cover border"
            />
            <label className="absolute bottom-3 right-3 bg-white border h-10 w-10 p-2 rounded-full flex justify-center items-center hover:bg-amber-400 cursor-pointer group">
              <FaCamera className="text-amber-900 group-hover:text-white text-lg" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />
            </label>
          </div>

          <div className="space-y-4 ml-7 text-gray-800 w-full max-w-md">
            <div>
              <label className="block text-sm font-medium">Full Name:</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Email:</label>
              <input
                type="email"
                name="email"
                autoComplete="off"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Phone:</label>
              <input
                type="text"
                name="phone"
                autoComplete="off"
                value={formData.phone}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Date of Birth:</label>
              <input
                type="date"
                name="dob"
                value={formData.dob?.slice(0, 10) || ""}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded"
                disabled={loading}
              />
            </div>

            {isEditing && (
              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleUpdate}
                  className="bg-green-500 flex justify-center items-center gap-2 h-10 w-40 text-white px-6 py-2 rounded hover:bg-green-600 disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <img src={Infinite} alt="loading" className="h-5 w-5" />
                      Saving...
                    </>
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
