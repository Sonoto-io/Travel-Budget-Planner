import { useAuthStore } from "@/stores/authStore";
import { pinia } from "@/pinia";

const isAuthenticated = async () => {
  // verify session cookie is valid from backend
  const res = await fetch("/api/auth/verify-session", {
    method: "POST",
    credentials: "include"
  });
  const valid = await res.json().then(data => data.valid)
  useAuthStore(pinia).setAuthenticated(valid);
  return valid;
};

export const getTokenFromCode = (code: string) => {
  // TODO: if native, close browser and ask for token from app
  return fetch(`/api/auth/finalize`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code }),
  });
}

export { isAuthenticated };