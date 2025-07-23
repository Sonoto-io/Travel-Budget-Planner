<template>
  <div class="home">Wouf</div>
  <Dashboard v-model="expenses" />
</template>

<script setup lang="ts">
import { getExpenses } from "@/api/expenses";
import Dashboard from "@/components/Dashboard.vue";
import { onMounted, ref } from "vue";

const expenses = ref([]);

onMounted(async () => {
  expenses.value = await getExpenses()
});
</script>
