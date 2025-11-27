<template>
  <Panel header="Dashboard" toggleable :collapsed="props.collapsed" class="w-full">
    <div class=" mb-4 flex flex-wrap lg:flex-nowrap flex-row justify-between">
      <SummaryMetadata v-model="globalSummary" />
      <div class="w-full flex flex-wrap gap-4">
        <SummaryChart :summary="byUserSummary" title="Summary by User" />
        <SummaryChart v-if="isGlobalDashboard" :summary="byCountrySummary" title="Summary by country" />
      </div>
    </div>


  </Panel>
</template>

<script setup lang="ts">
import { getExpensesByUserSummary, getExpensesSummary, getExpensesByCountrySummary } from "@/api/expenses";
import Panel from "primevue/panel";
import { ref, watch } from "vue";
import SummaryChart from "@/components/SummaryChart.vue";
import SummaryMetadata from "@/components/SummaryMetadata.vue";

const props = defineProps({
  countryId: {
    type: String,
  },
  collapsed: {
    type: Boolean,
    default: true,
  },
  isGlobalDashboard: {
    type: Boolean,
    default: false,
  },
});

const globalSummary = ref({
  totalExpenses: 0,
  countExpenses: 0,
  countDays: 0,
  dailyExpenses: 0,
  dailyExpectedExpenses: 0,
  repartition: [],
});

const byUserSummary = ref<Object>({});
const byCountrySummary = ref<Object>({});


watch(
  () => props.countryId,
  async () => {
    globalSummary.value = await getExpensesSummary(props.countryId)
    byUserSummary.value = await getExpensesByUserSummary(props.countryId)
    if (props.isGlobalDashboard) {
      byCountrySummary.value = await getExpensesByCountrySummary(props.countryId)
    }
  },
  { immediate: true },
);
</script>
