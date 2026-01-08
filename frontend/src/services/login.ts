import { useAuthStore } from "@/stores/authStore";
import { pinia } from "@/pinia";
import { Capacitor } from '@capacitor/core';
import api from "@/api/apiClient";

const isAuthenticated = async () => {
  // verify session cookie is valid from backend
  try {
    const res = api.post("/auth/verify-session", {
      method: "POST",
      credentials: "include"
    });
    console.log("Session verification response:", (await res).data);
    const valid = (await res).data.valid;
    useAuthStore(pinia).setAuthenticated(valid);
    return valid;
  } catch (error) {
    console.error("Error verifying session:", error);
    throw "Error verifying session, backend may be unreachable";
  }
};

export const getTokenFromCode = (code: string) => {
    return fetch(`/api/auth/finalize`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });
  }

export { isAuthenticated };