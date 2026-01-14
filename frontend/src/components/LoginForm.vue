<template>
  <div class="flex justify-center items-center mt-6 w-screen h-screen">
    <Button type="button" class="w-[30vw] h-[10vh]" severity="secondary" label="Login with SSO" @click="login"/>
  </div>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import { Browser } from '@capacitor/browser';
import { Capacitor } from '@capacitor/core';
import { BACKEND_URL } from "@/api/apiClient";

const login = async () => {
  const url = Capacitor.isNativePlatform()
    ? encodeURI(`${BACKEND_URL}/api/auth/init?native=true`)
    : `/api/auth/init`;

  if (Capacitor.isNativePlatform()) {
    await Browser.open({ url });
  } else {
    window.location.href = url;
  }
};

</script>