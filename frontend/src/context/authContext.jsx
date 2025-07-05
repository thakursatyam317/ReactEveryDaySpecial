import React, { useState, useContext, useEffect, createContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // 🌟 Load user from localStorage on first render
  const [authUser, setAuthUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      return null;
    }
  });

  const [isLogin, setIsLogin] = useState(!!authUser);
  const [loading, setLoading] = useState(true);

  // 🔁 Profile fetch (for re-auth if needed)
  const fetchProfile = async () => {
  setLoading(true);
  try {
    const res = await fetch("http://localhost:4500/user/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // ✅ If you're using token-based auth
      },
      credentials: "include", // ✅ For cookie-based auth (optional if you're using token)
    });

    if (!res.ok) {
      throw new Error("Failed to fetch profile");
    }

    const data = await res.json();
    if (!data.user) throw new Error("Invalid user data");

    setAuthUser(data.user);
    localStorage.setItem("user", JSON.stringify(data.user));
    setIsLogin(true);
  } catch (err) {
    console.error("❌ Error fetching profile:", err.message);
    setAuthUser(null);
    localStorage.removeItem("user");
    setIsLogin(false);
  } finally {
    setLoading(false);
  }
};


  // 📝 Profile update
  const updateProfile = async (updatedData) => {
    try {
      const res = await fetch("http://localhost:4500/user/update", {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) throw new Error("Failed to update profile");

      const data = await res.json();
      setAuthUser(data.updatedUser);
      localStorage.setItem("user", JSON.stringify(data.updatedUser));
    } catch (error) {
      console.error("Update profile failed:", error);
      throw error;
    }
  };

  // ✅ Check localStorage on mount
  useEffect(() => {
    if (!authUser) {
      fetchProfile(); // Try to fetch from backend if not found
    } else {
      setLoading(false);
    }

    // 🔁 Listen for login/logout from other tabs or components
    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem("user");
      if (updatedUser) {
        setAuthUser(JSON.parse(updatedUser));
        setIsLogin(true);
      } else {
        setAuthUser(null);
        setIsLogin(false);
      }
    };

    window.addEventListener("authChange", handleStorageChange);
    return () => window.removeEventListener("authChange", handleStorageChange);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        setAuthUser,
        isLogin,
        setIsLogin,
        fetchProfile,
        updateProfile,
        loading,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
