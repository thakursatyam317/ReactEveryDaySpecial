import { useEffect, useState } from "react";
import axios from "axios";

function ProfilePage() {
  const [user, setUser] = useState({ name: "", email: "" });
  const [newData, setNewData] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("/user/profile", {
        headers: { Authorization: token }
      });
      setUser(res.data);
      setNewData({ ...newData, name: res.data.name, email: res.data.email });
    };
    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await axios.put("/user/profile", newData, {
      headers: { Authorization: token }
    });
    alert("Profile updated!");
  };

  return (
    <form onSubmit={handleUpdate}>
      <input value={newData.name} onChange={e => setNewData({ ...newData, name: e.target.value })} />
      <input value={newData.email} onChange={e => setNewData({ ...newData, email: e.target.value })} />
      <input placeholder="New Password" type="password" onChange={e => setNewData({ ...newData, password: e.target.value })} />
      <button type="submit">Update Profile</button>
    </form>
  );
}

export default ProfilePage;
