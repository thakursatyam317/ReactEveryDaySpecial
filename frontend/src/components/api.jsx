// api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4500/user/profile",
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = token;
  return config;
});

export default api;
