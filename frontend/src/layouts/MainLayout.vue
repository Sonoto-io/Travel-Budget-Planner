<template>
  <div class="min-h-screen">
    <header>
      <HeaderBar v-model:is-navbar-visible="navbarVisible" />
    </header>
    <div class="flex h-full">
      <nav
        :class="[
          'transition-all duration-300',
          'md:w-[20%]',
          navbarVisible ? 'w-[70%] min-w-60 sm:w-[50%] ' : 'w-0',
          'overflow-x-hidden',
        ]"
      >
        <NavBar @country-selected="navbarVisible = false" />
      </nav>
      <main class="flex-1 w-0 px-4 overflow-x-auto"><slot /></main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import HeaderBar from "@/components/HeaderBar.vue";
import NavBar from "@/components/NavBar.vue";

const navbarVisible = ref(false);



</script>
