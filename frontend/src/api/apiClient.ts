import axios from "axios";
import { useAuthStore } from "@/stores/authStore"; // or wherever your Pinia store is

// Create an axios instance
const api = axios.create({
  baseURL: "/api",
  withCredentials: true, // include cookies for refresh requests
});

// Add Authorization header automatically
api.interceptors.request.use(async (config) => {
  const auth = useAuthStore();
  const token = await auth.getAccessToken(); // stored in memory / Pinia
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.warn("⚠️ No access token found, request will use refresh token");
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const auth = useAuthStore();

    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true;

      try {
        // Ask backend to refresh access token using refresh cookie
        const { data } = await axios.post(
          "/api/auth/refresh",
          {},
          { withCredentials: true }
        );

        auth.setAccessToken(data.access_token);
        error.config.headers.Authorization = `Bearer ${data.access_token}`;

        // Retry the original request
        return api.request(error.config);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        auth.clearAccessToken();
      }
    }

    return Promise.reject(error);
  }
);


export default api;
