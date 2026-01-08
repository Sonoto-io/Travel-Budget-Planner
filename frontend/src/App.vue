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
import router from "@/router";

App.addListener('appUrlOpen', async ({ url }) => {
  console.log('App opened with URL:', url);

  if (url.startsWith('travelbudget://api/auth/callback')) {
    // await Browser.close();

    const parsed = new URL(url);
    const code = parsed.searchParams.get('code');
    if (code) {
      console.log('Authorization code received:', code);
      await getTokenFromCode(code)
      console.log('Token exchange completed, redirecting to home.');
      router.push(`/`);
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

