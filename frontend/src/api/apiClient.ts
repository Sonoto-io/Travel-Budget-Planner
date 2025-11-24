import axios from "axios";
import { useAuthStore } from "@/stores/authStore"; // or wherever your Pinia store is
import { refreshAccessToken } from "@/services/login";

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
    const authStore = useAuthStore();

    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true;

      try {
        // Ask backend to refresh access token using refresh cookie
        await refreshAccessToken()
          .then((newTokenData) => {
            authStore.setAccessToken(newTokenData.access_token);
            return newTokenData.access_token;
          })
          .catch((err) => {
            console.error("Failed to refresh token:", err);
            return null;
          }
          )
        error.config.headers.Authorization = `Bearer ${authStore.accessToken}`;

        // Retry the original request
        return api.request(error.config);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        // authStore.clearAccessToken();
      }
    }

    return Promise.reject(error);
  }
);


export default api;
