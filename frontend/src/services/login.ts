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
    console.log("Session verification response:", (await res).data.valid);
    const valid = (await res).data.valid;
    useAuthStore(pinia).setAuthenticated(valid);
    return valid;
  } catch (error) {
    console.error("Error verifying session:", error);
    throw "Error verifying session, backend may be unreachable";
  }
};

export const getTokenFromCode = async (code: string) => {
  console.log("Finalizing authentication with code:", code);
  const res = api.post(
    "/auth/finalize",
    { code },
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then(response => {
    return response;
  }).catch(error => {
    console.error("Error finalizing authentication:", JSON.stringify(error));
    throw "Error finalizing authentication";
  });

  console.log("Finalize authentication response:", JSON.stringify(await res));
  return res
}

export { isAuthenticated };