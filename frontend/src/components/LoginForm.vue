<template>
  <div class="flex justify-center items-center mt-6 w-screen h-screen">
    <Button type="button" class="w-[30vw] h-[10vh]" severity="secondary" label="Login with SSO" @click="login"/>
  </div>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import { Browser } from '@capacitor/browser';
import { Capacitor } from '@capacitor/core';

const login = async () => {
  const url = Capacitor.isNativePlatform()
    ? encodeURI(`http://192.168.0.122:3000/auth/init?redirect_uri=io.sonoto.travelbudgetplanner://auth/callback`)
    : '/api/auth/init';

    console.log("Login URL:", url);
  if (Capacitor.isNativePlatform()) {
    await Browser.open({ url });
  } else {
    window.location.href = url;
  }
};

</script>