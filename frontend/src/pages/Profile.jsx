import React, { useEffect, useState } from "react";
import { FaCamera, FaEdit, FaSave } from "react-icons/fa";
import Infinite from "../assets/infinite-spinner.svg";
import toast from "react-hot-toast";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../utils/authUtils";

const Profile = () => {
  const { authUser, fetchProfile } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
  });

  const [photoFile, setPhotoFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    if (authUser) {
      setFormData({
        fullName: authUser.fullName || "",
        email: authUser.email || "",
        phone: authUser.phone || "",
        dob: authUser.dob?.slice(0, 10) || "",
      });
      setPreview(`${authUser.profilePic}?t=${Date.now()}`);
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
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("fullName", formData.fullName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("dob", formData.dob);

    if (photoFile) {
      formDataToSend.append("profilePic", photoFile);
    }

    setLoading(true);

    toast.promise(
      authFetch("http://localhost:4500/user/update", {
        method: "PUT",
        body: formDataToSend,
      })
        .then(async (res) => {
          const data = await res.json();
          if (!res.ok) throw new Error(data.message || "Update failed");

          await fetchProfile(); // 🔁 refresh authUser from backend
          setIsEditing(false);
          setPhotoFile(null);
          setPreview(`${ authUser?.profilePic}?t=${Date.now()}`); // ✅ force refresh image
        })
        .catch((err) => {
          console.error("❌ Update error:", err.message);
          throw err;
        })
        .finally(() => {
          setLoading(false);
        }),
      {
        loading: "Saving profile...",
        success: "✅ Profile updated!",
        error: (err) => err?.message || "❌ Failed to update",
      }
    );
  };

  if (authLoading) {
    return <div className="text-center mt-40 text-xl">Loading...</div>;
  }

  if (!authUser && !loading) {
    return (
      <div className="text-center mt-20">
        <p className="text-xl text-gray-600 mb-4">No user found 😕</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-20">
      <div className="bg-white shadow-md rounded-lg p-8 w-[75%]">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">👤 Your Profile</h1>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              <FaEdit /> Edit
            </button>
          ) : (
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <img src={Infinite} className="h-5 w-5" />
                  Saving...
                </>
              ) : (
                <>
                  <FaSave /> Save
                </>
              )}
            </button>
          )}
        </div>

        <div className="flex flex-wrap justify-center items-center gap-10">
          <div className="relative">
            <img
              src={
                preview
                  ? preview
                  : authUser?.profilePic
                  ? `${authUser.profilePic}?t=${Date.now()}`
                  : "https://placehold.co/600x400?text=" +
                    authUser.fullName.toUpperCase().slice(0, 1)
              }
              alt="Profile"
              className="w-60 h-60 rounded-full object-cover border"
            />
            {isEditing && (
              <label className="absolute bottom-3 right-3 bg-white border h-10 w-10 p-2 rounded-full flex justify-center items-center hover:bg-amber-400 cursor-pointer group">
                <FaCamera className="text-amber-900 group-hover:text-white text-lg" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoChange}
                />
              </label>
            )}
          </div>

          <div className="space-y-4 w-full max-w-md">
            <div>
              <label className="block text-sm font-medium">Full Name:</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded"
                disabled={!isEditing}
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded"
                disabled={!isEditing}
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Phone:</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded"
                disabled={!isEditing}
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Date of Birth:</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded"
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
