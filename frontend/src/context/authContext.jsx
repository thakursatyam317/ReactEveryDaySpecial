import React, { useState, useContext, useEffect, createContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(
    JSON.parse(sessionStorage.getItem("user")) || null
  );
  const [isLogin, setIsLogin] = useState(!!authUser);

  // Keep login state in sync
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

export const useAuth = () => useContext(AuthContext);
