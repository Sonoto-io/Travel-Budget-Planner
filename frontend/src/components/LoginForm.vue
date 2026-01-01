<template>
  <div class="flex justify-center items-center mt-6 w-screen h-screen">
    <Button type="button" class="w-[30vw] h-[10vh]" severity="secondary" label="Login with SSO" @click="login"/>
  </div>
</template>

<script setup lang="ts">
import Button from "primevue/button";

const login = () => {
  window.location.href = "/api/auth/init";
};

</script>