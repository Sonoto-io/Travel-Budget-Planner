<template>
  <MainLayout>
    <Dashboard v-model="expenses" />
  </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from "@/layouts/MainLayout.vue";

import { getExpenses } from "@/api/expenses";
import Dashboard from "@/components/Dashboard.vue";
import { onMounted, ref } from "vue";

const expenses = ref([]);

onMounted(async () => {
  expenses.value = await getExpenses()
});
</script>
