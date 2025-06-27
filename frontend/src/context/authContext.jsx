import React, { useState, useContext, useEffect, createContext } from "react";

// Create the context
const AuthContext = createContext();

// Create the provider
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

  // Sync login state with sessionStorage
  useEffect(() => {
    if (authUser) {
      sessionStorage.setItem("user", JSON.stringify(authUser));
      setIsLogin(true);
    } else {
      sessionStorage.removeItem("user");
      setIsLogin(false);
    }
  }, [authUser]);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, isLogin, setIsLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};


