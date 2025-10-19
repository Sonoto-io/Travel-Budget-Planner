import api from "@/api/apiClient";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    accessToken: null as string | null,
  }),
  actions: {
    setAccessToken(token: string) {
      this.accessToken = token;
    },
    clearAccessToken() {
      this.accessToken = null;
    },
    async getAccessToken() {
      if (!this.accessToken) {
        const res = await api.get("/auth/refresh", { withCredentials: true })
        this.accessToken = res.data.access_token
      }
      return this.accessToken
    }
  },
});
