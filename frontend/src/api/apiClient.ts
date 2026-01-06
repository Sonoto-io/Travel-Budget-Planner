import axios from "axios";

// Create an axios instance
const api = axios.create({
  baseURL: "/api",
  withCredentials: true, // include cookies for refresh requests
});

export default api;
