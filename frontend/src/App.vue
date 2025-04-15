<template>
  <MainLayout>
    <template #header>
      <HeaderBar />
    </template>
    <router-view />
  </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from "./layouts/MainLayout.vue";
import HeaderBar from "./components/HeaderBar.vue";
</script>
