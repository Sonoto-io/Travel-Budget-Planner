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

