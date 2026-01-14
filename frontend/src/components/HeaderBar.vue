<template>
  <div
    class="flex h-20 w-full flex-row place-content-between items-center gap-4 p-4 md:justify-start"
  >
    <div
      class="block md:hidden"
      @click="toggleNavbar"
    >
      <span
        :class="[
          'pi',
          isNavbarVisible ? 'pi-minus' : 'pi-bars',
          'cursor-pointer',
          'w-20'
        ]"
      />
    </div>
    <img :src="logo" alt="Logo" class="h-full" />
    <h1>Travel Planner</h1>
  </div>
</template>

<script setup lang="ts">
import logo from "@images/logo.webp";

const isNavbarVisible = defineModel(
  "isNavbarVisible", { default: false }
);


const toggleNavbar = () => {
  isNavbarVisible.value = !isNavbarVisible.value;
};
</script>
