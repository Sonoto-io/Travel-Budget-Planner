<template>
  <Button type="button" severity="secondary" label="Login with SSO" @click="login"/>
</template>

<script setup lang="ts">
import Button from "primevue/button";

const login = () => {
  window.location.href = "/api/auth/init";
};

</script>