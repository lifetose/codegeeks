// utils/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/events", // Adjust to your backend URL
});

export default api;
