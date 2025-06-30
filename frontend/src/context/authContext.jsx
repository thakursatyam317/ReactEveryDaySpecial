import React, { useState, useContext, useEffect, createContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem("user")) || null;
    } catch (error) {
      console.error("Failed to parse user from sessionStorage", error);
      return null;
    }
  });

  const [isLogin, setIsLogin] = useState(!!authUser);
  const [loading, setLoading] = useState(true);

  // 🔄 Fetch profile from backend
  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:4500/user/profile", {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setAuthUser(data.user);
        sessionStorage.setItem("user", JSON.stringify(data.user));
        setIsLogin(true);
      } else {
        throw new Error("Failed to fetch profile");
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
      setAuthUser(null);
      sessionStorage.removeItem("user");
      setIsLogin(false);
    } finally {
      setLoading(false);
    }
  };

  // ✏️ Update profile
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
      sessionStorage.setItem("user", JSON.stringify(data.updatedUser));
    } catch (error) {
      console.error("Update profile failed:", error);
      throw error;
    }
  };

  // 🔁 Initial load
  useEffect(() => {
    if (!authUser) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, []); // ✅ Only on first mount

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
      {children}
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
