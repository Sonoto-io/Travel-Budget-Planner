<template>
  <div class="home">Wouf</div>
  <Dashboard v-model="expenses"/>
</template>

<script setup lang="ts">
import { getExpenses } from '@/api/expenses';
import Dashboard from '@/components/Dashboard.vue';
import { useCountryStore } from '@/stores/countryStore';
import { onMounted, ref, watchEffect } from 'vue';

const expenses = ref([]);
const countryStore = useCountryStore()

onMounted(async () => {
   expenses.value = await getExpenses()
      .then((res) => res.data)
      .catch((err) => {
        console.error("Error fetching expenses:", err);
        return [];
      });
      console.log("expesnes : ", expenses)
})

</script>
