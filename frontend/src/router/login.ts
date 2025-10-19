import Cookies from "js-cookie";
import { useAuthStore } from "@/stores/authStore";
import { pinia } from "@/pinia";

const getToken = async () => {
  const authStore = useAuthStore(pinia);
  const token = authStore.accessToken

  if (!token) {
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
  }

  return token;
}

const refreshAccessToken = async () => {
  const res = await fetch("/api/auth/refresh", {
    method: "POST",
    credentials: "include"
  });
  const data = (await res.body?.getReader().read().then(({ value }) => {
    const decoder = new TextDecoder();
    return JSON.parse(decoder.decode(value));
  })) as { access_token: string, refresh_token: string };
  

  if (!res.ok) throw new Error("Failed to refresh");
  return data;
}
export { getToken };