import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });

  const [isLogin, setIsLogin] = useState(!!user);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:4500/user/profile", {
        credentials: "include", // Important for sending cookies
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setIsLogin(true);
        sessionStorage.setItem("user", JSON.stringify(data.user));
      } else {
        setUser(null);
        setIsLogin(false);
        sessionStorage.removeItem("user");
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
      setUser(null);
      setIsLogin(false);
      sessionStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  };

  // 👇 This runs only on first mount (page refresh)
  useEffect(() => {
    if (!user) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isLogin, setIsLogin, fetchProfile, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
