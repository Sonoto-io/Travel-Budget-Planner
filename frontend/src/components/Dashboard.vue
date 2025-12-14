<template>
  <Panel header="Dashboard" toggleable :collapsed="props.collapsed" class="w-full">
    <div class=" mb-4 flex flex-wrap lg:flex-nowrap flex-row justify-between">
      <SummaryMetadata :summary="globalSummary" />
      <div class="w-full flex flex-wrap gap-4">
        <SummaryChart :summary="byUserSummary" title="Summary by User" />
        <SummaryChart v-if="isGlobalDashboard" :summary="byCountrySummary" title="Summary by country" />
      </div>
    </div>
    <!-- Controls -->
    <div class="flex gap-4 flex-col lg:flex-row justify-between items-center mb-4">
      <Button label="Refresh" icon="pi pi-refresh" class="p-button-text" @click="refresh" />
      <div display="flex" class="flex items-center gap-2">
        <label>Include Exceptions</label>
        <ToggleSwitch v-model="withExceptions" />
      </div>
      <div>
        <label class="mr-2">Start Date:</label>
        <DatePicker id="startDate" v-model="startDate"/>
      </div>
      <div>
        <label class="mr-2">End Date:</label>
        <DatePicker id="endDate" v-model="endDate"/>
      </div>
    </div>


  </Panel>
</template>

<script setup lang="ts">
import { getExpensesByUserSummary, getExpensesSummary, getExpensesByCountrySummary } from "@/api/expenses";
import Panel from "primevue/panel";
import Button from "primevue/button";
import { ref, watch, watchEffect } from "vue";
import SummaryChart from "@/components/SummaryChart.vue";
import SummaryMetadata from "@/components/SummaryMetadata.vue";
import ToggleSwitch from 'primevue/toggleswitch';
import DatePicker from 'primevue/datepicker';

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
const withExceptions = ref(true);
const startDate = ref<Date | undefined>();
const endDate = ref<Date | undefined>();

const createQueryParam = () => {
  let queryParams = {
    countryId: props.countryId,
    withoutExceptions: !withExceptions.value,
  }
  if (startDate.value) {
    startDate.value.setHours(12)
    queryParams.startDate = startDate.value.toISOString().split('T')[0];
  }
  if (endDate.value) {
    endDate.value.setHours(12)
    queryParams.endDate = endDate.value.toISOString().split('T')[0];
  }
  return queryParams;
}; 

const refresh = async () => {
    const queryParams = createQueryParam();
    globalSummary.value = await getExpensesSummary(queryParams)
    byUserSummary.value = await getExpensesByUserSummary(queryParams)
    if (props.isGlobalDashboard) {
      byCountrySummary.value = await getExpensesByCountrySummary(queryParams)
    }
  };

watchEffect(refresh);
</script>
