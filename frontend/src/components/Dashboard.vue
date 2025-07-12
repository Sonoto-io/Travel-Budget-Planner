<template>
<Panel header="Dashboard" toggleable>
<div>
    <div>Expenses : {{ summary.nbExpenses}} </div>
    <div>Total : {{ summary.total }} </div>
    <div>Repartition : {{ summary.repartition }} </div>
</div>
</Panel>

</template>


<script setup lang="ts">
import { getExpensesSummary } from '@/api/expenses';
import Panel from 'primevue/panel';
import {  ref, watchEffect } from 'vue';

const props = defineProps<{
    countryId?: string
}>()


const summary = ref({
  total: "",
  nbExpenses: "",
  repartition: {}
})
watchEffect(async () => {
    summary.value = (await getExpensesSummary(props.countryId)).data
    }
)   
</script>