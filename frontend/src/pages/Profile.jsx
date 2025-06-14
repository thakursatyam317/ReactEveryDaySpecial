import React, { useEffect, useState } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({});
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await axios.get("http://localhost:4500/user/profile");
      setProfile(res.data.user);
      setFormData(res.data.user);
      setPreview(res.data.user.profilePic); // profilePic must be image URL
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpdate = async () => {
    const updateData = new FormData();
    updateData.append("fullName", formData.fullName);
    updateData.append("email", formData.email);
    updateData.append("phone", formData.phone);
    updateData.append("dob", formData.dob);

    if (image) updateData.append("profilePic", image);

    try {
      const res = await axios.put(
        "http://localhost:4500/user/profile",
        updateData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setProfile(res.data.updatedUser);
      setFormData(res.data.updatedUser);
      setIsEditing(false);
      alert("✅ Profile updated successfully!");
    } catch (err) {
      console.error("Update failed:", err);
      alert(err.response?.data?.message || "Update failed");
    }
  };

  if (loading)
    return <div className="text-center mt-10 text-xl">Loading...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  if (!profile)
    return (
      <div className="text-center mt-10 text-gray-500">
        No profile data found
      </div>
    );

  return (
    <div className="flex justify-center mt-40">
      
      <div className="bg-white shadow-md rounded-lg p-8 w-[75%]">
        <h1 className="text-2xl font-bold mb-6 text-center">👤 Your Profile</h1>

        {/* Profile Image Preview */}
       <div className="flex ">
         <div className="flex justify-center mb-4 mx-32">
          <img
            src={preview || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-60 h-60 rounded-full object-cover"
          />
          
        </div>

        {/* Image Upload */}
        

        <div className="space-y-4 text-gray-800 w-[50%]">
          <div>
            <label className="block text-sm font-medium">Full Name:</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName || ""}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full mt-1 p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full mt-1 p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Phone:</label>
            <input
              type="text"
              name="phone"
              value={formData.phone || ""}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full mt-1 p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Date of Birth:</label>
            <input
              type="date"
              name="dob"
              value={formData.dob?.slice(0, 10) || ""}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full mt-1 p-2 border rounded"
            />
          </div>

          <div className="text-center mt-6">
            {isEditing ? (
              <button
                onClick={handleUpdate}
                className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
       </div>
      </div>
    </div>
  );
};

export default Profile;
