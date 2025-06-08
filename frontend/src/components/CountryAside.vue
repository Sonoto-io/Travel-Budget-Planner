<template>
  <div class="fixed top-20 right-0 flex h-20 flex-col">
    <div
      :class="[
        'transition-all duration-300',
        isAsideVisible ? 'w-[100vw] sm:w-[70vw] md:w-[50vw]' : 'w-25',
        'sticky',
        'right-0',
        'p-1',
        'border-1',
        'rounded-md',
        'bg-blue-900',
      ]"
      @click.stop="handleAside()"
    >
      <span
        :class="[
          'pi',
          isAsideVisible ? 'pi-chevron-right' : 'pi-chevron-left',
          'cursor-pointer',
          'mr-2',
        ]"
      />Charts
    </div>
    <aside
      :class="[
        'transition-all duration-300',
        isAsideVisible ? 'w-[100vw] sm:w-[70vw] md:w-[50vw]' : 'w-0',
        'overflow-x-hidden',
      ]"
    >
      Aside
    </aside>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isAsideVisible = ref(false);
const handleAside = () => {
  isAsideVisible.value = !isAsideVisible.value;
};
</script>
