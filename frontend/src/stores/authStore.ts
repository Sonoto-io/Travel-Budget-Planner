import api from "@/api/apiClient";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    authenticated: false,
  }),
  actions: {
    setAuthenticated(value: boolean) {
      this.authenticated = value;
    }
  },
});
