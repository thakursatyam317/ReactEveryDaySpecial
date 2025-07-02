import React, { useEffect, useState } from "react";

export const authFetch = (url, options = {}) => {
  const token = localStorage.getItem("token"); // 🔐 Get JWT from localStorage

  const headers = {
    ...(options.headers || {}),
    Authorization: token ? `Bearer ${token}` : undefined, // ✅ Only add if token exists
  };
  console.log("AuthFetch URL:", url);
  return fetch(url, {
    ...options,
    headers,
    credentials: "include", // ✅ Send cookies (if needed for secure APIs)
  });
};
