<template>
  <Panel header="Dashboard" toggleable>
    <div>
      <div>Expenses : {{ summary.countExpenses }}</div>
      <div>Total : {{ summary.totalExpenses }}</div>
      <div>Repartition : {{ summary.repartition }}</div>
    </div>
  </Panel>
</template>

<script setup lang="ts">
import { getExpensesSummary } from "@/api/expenses";
import Panel from "primevue/panel";
import { ref, watch } from "vue";

const props = defineProps<{
  countryId?: string;
}>();

const summary = ref({
  totalExpenses: 0,
  countExpenses: 0,
  countDays: 0,
  dailyExpenses: 0,
  dailyExpectedExpenses: 0,
  repartition: [],
});

watch(
  () => props.countryId,
  async () => {
    summary.value = await getExpensesSummary(props.countryId);
  },
  { immediate: true },
);
</script>
