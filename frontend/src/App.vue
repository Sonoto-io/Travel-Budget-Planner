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
import { Browser } from '@capacitor/browser';

App.addListener('appUrlOpen', async ({ url }) => {
  console.log('App opened with URL:', url);

  if (url.startsWith('io.sonoto.travelbudgetplanner://auth/callback')) {
    await Browser.close();

    const parsed = new URL(url);
    const token = parsed.searchParams.get('token');
    if (token) {
      authStore.setAccessToken(token);
    }
  }
});


watch(authStore, async () => {
  try {
    if (authStore.accessToken) {
      await configStore.initStore();
    }
  } catch (error) {
    console.error("Failed to initialize main currency:", error);
  }
});
</script>

