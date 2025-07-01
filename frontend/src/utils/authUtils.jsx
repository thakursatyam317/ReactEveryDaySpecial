import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const authFetch = (url, options = {}) => {
  const token = localStorage.getItem("token"); // get token saved after login

  const headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${token}`, // add token to request headers
  };

  return fetch(url, {
    ...options,
    headers,
    credentials: "include", // include cookies (if any)
  });
};
