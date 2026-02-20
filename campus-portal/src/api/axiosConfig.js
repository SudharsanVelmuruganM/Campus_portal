// src/api/axiosConfig.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://campus-portal.onrender.com",
   withCredentials: true
});

export default api;
