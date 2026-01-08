import axios from "axios";

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ?? "";

const api = axios.create({
  baseURL: `${BACKEND_URL}/api`,
  withCredentials: true,
});

export default api;
