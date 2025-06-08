<template>
  <div class="min-h-screen">
    <header>
      <HeaderBar @toggle-navbar="handleNavbar" />
    </header>
    <div class="flex h-full w-screen">
      <nav
        :class="[
          'transition-all duration-300',
          navbarVisible ? 'w-[70%] min-w-60 sm:w-[50%] md:w-[15%]' : 'w-0',
          'overflow-x-hidden',
          'md:w-[15%]',
          'grow',
        ]"
      >
        <NavBar />
      </nav>
      <main class="w-full shrink px-4"><slot /></main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import HeaderBar from "@/components/HeaderBar.vue";
import NavBar from "@/components/NavBar.vue";

const navbarVisible = ref(false);
const handleNavbar = () => {
  navbarVisible.value = !navbarVisible.value;
};
</script>
