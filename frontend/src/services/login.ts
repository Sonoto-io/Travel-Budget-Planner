import { useAuthStore } from "@/stores/authStore";
import { pinia } from "@/pinia";
import api from "@/api/apiClient";

const isAuthenticated = async () => {
  // verify session cookie is valid from backend
  try {
    const res = api.post("/auth/verify-session", {
      method: "POST",
      credentials: "include"
    });

    const valid = (await res).data.valid;
    useAuthStore(pinia).setAuthenticated(valid);

    return valid;
  } catch (error) {
    console.error("Error verifying session:", error);
    throw "Error verifying session, backend may be unreachable";
  }
};

export const getTokenFromCode = async (code: string) => {
  const res = api.post(
    "/auth/finalize",
    { code },
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then(response => response
  ).catch(error => {
    console.error("Error finalizing authentication:", JSON.stringify(error));
    throw "Error finalizing authentication";
  });

  return res
}

export { isAuthenticated };