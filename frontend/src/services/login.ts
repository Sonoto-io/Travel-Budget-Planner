import { useAuthStore } from "@/stores/authStore";
import { pinia } from "@/pinia";
import { Capacitor } from '@capacitor/core';


const isAuthenticated = async () => {
  // verify session cookie is valid from backend
  try {
    const res = await fetch("/api/auth/verify-session", {
      method: "POST",
      credentials: "include"
    });
    const valid = await res.json().then(data => data.valid)
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