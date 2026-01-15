import { useAuthStore } from "@/stores/authStore";
import { pinia } from "@/pinia";
import api from "@/api/apiClient";

const isAuthenticated = async () => {
  // verify session cookie is valid from backend
  try {
    console.log("try to authenticate")
    const res = api.post("/auth/verify-session", {
      method: "POST",
      credentials: "include"
    });
    console.log("authenticate response : ", JSON.stringify(await res))
    const valid = (await res).data.valid;
    useAuthStore(pinia).setAuthenticated(valid);
    console.log("is this valide ? ", valid)
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
  ).then(response => {
    console.log("response: ", JSON.stringify(response))
    return response;
  }).catch(error => {
    console.error("Error finalizing authentication:", JSON.stringify(error));
    throw "Error finalizing authentication";
  });

  return res
}

export { isAuthenticated };