import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import Infinite from "../assets/infinite-spinner.svg";
import toast from "react-hot-toast";
import { useAuth } from "../context/authContext";

// // Config
// const API_BASE = "http://localhost:4500";

const Profile = () => {
  const { authUser, setAuthUser } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState("");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch profile on component mount
  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(`${API_BASE}/user/profile`, {
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to fetch profile");

      const data = await res.json();
      setFormData(data.user);
      setAuthUser(data.user);
      setPreview(data.user.profilePic);
    } catch (err) {
      setError(err.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Clean up blob URL when photo changes
  useEffect(() => {
    let objectUrl;
    if (photo) {
      objectUrl = URL.createObjectURL(photo);
      setPreview(objectUrl);
    }
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [photo]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setIsEditing(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);

      const form = new FormData();
      form.append("fullName", formData.fullName);
      form.append("email", formData.email);
      form.append("phone", formData.phone);
      form.append("dob", formData.dob);
      if (photo) {
        form.append("profilePic", photo);
      }

      const res = await fetch(`${API_BASE}/user/update`, {
        method: "PUT",
        credentials: "include",
        body: form,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Update failed");

      setFormData(data.updatedUser);
      setAuthUser(data.updatedUser);
      setPreview(data.updatedUser.profilePic);
      sessionStorage.setItem("user", JSON.stringify(data.updatedUser));
      setIsEditing(false);
      toast.success("✅ Profile updated successfully!");
    } catch (err) {
      toast.error(err.message || "❌ Update failed");
    } finally {
      setLoading(false);
    }
  };

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

  if (!authUser) {
    return (
      <div className="text-center mt-10 text-gray-500">
        <p>No profile data found 😕</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={fetchProfile}
        >
          Reload
        </button>
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-50">
      <div className="bg-white shadow-md rounded-lg p-8 w-[75%]">
        <h1 className="text-2xl font-bold mb-6 text-center">👤 Your Profile</h1>

        <div className="flex flex-wrap justify-center gap-8">
          <div className="relative">
            <img
              src={
                preview ||
                "https://ui-avatars.com/api/?name=User&background=ccc"
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

          <div className="space-y-4 text-gray-800 w-full max-w-md">
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
