<template>
  <Background/>
    <router-view />
  <Toast />
</template>

<script setup lang="ts">
import Toast from "primevue/toast";
import Background from "@/components/Background.vue";
import { useConfigStore } from "@/stores/configStore";
import { watch } from "vue";
import { useAuthStore } from "@/stores/authStore";

const configStore = useConfigStore();
const authStore = useAuthStore();


import { App } from '@capacitor/app';
import { getTokenFromCode } from "@/services/login";

App.addListener('appUrlOpen', async ({ url }) => {
  console.log('App opened with URL:', url);

  if (url.startsWith('travelbudget://api/auth/callback')) {
    // await Browser.close();

    const parsed = new URL(url);
    const code = parsed.searchParams.get('code');
    if (code) {
      console.log('Authorization code received:', code);
      const sessionToken = await getTokenFromCode(code)
      console.log('Session token obtained:', sessionToken);
      window.location.href = "/dashboard"; // or use your router

    }
  }
});


watch(authStore, async () => {
  try {
    if (authStore.authenticated) {
      await configStore.initStore();
    }
  } catch (error) {
    console.error("Failed to initialize main currency:", error);
  }
});
</script>

