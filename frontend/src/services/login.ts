import { useAuthStore } from "@/stores/authStore";
import { pinia } from "@/pinia";

const getToken = async () => {
  const authStore = useAuthStore(pinia);
  let token = authStore.accessToken;

  if (!token) {
    try {
      const newTokenData = await refreshAccessToken();
      token = newTokenData.access_token;

      authStore.setAccessToken(token);
    } catch (err) {
      console.error("Failed to refresh token:", err);
      token = null;
    }
  }

  return token;
};

export const refreshAccessToken = async () => {
  const res = await fetch("/api/auth/refresh", {
    method: "POST",
    credentials: "include"
  });
  const data = (await res.body?.getReader().read()
    .then(({ value }) => {
      const decoder = new TextDecoder();
      return JSON.parse(decoder.decode(value));
    })) as { access_token: string, refresh_token: string }

  if (!res.ok) throw new Error("Failed to refresh");
  return data;
}
export { getToken };