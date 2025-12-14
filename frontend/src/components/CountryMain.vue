<template>
  <div class="flex flex-col gap-4 overflow-x-scroll">
    <div class="">
      <ExpenseForm
        :selectValues="selectValues"
        @addExpense="handleAddExpense"
      />
    </div>
    <div>
      <Dashboard :countryId="countryStore.currentCountry.id" />
    </div>
    <div class="">
      <ExpenseTable :selectValues="selectValues" v-model="expenses" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, ComputedRef, watchEffect } from "vue";
import ExpenseTable from "@/components/ExpenseTable.vue";
import { getExpenses } from "@/api/expenses";
import ExpenseForm from "@/components/ExpenseForm.vue";
import { getCategories } from "@/api/categories";
import type { FormSelectValues } from "@/models/FormSelectValues";
import { getCurrencies } from "@/api/currencies";
import { getUsers } from "@/api/users";
import { useCountryStore } from "@/stores/countryStore";
import Dashboard from "./Dashboard.vue";
import { useConfigStore } from "@/stores/configStore";

const expenses = ref([]);
const selectCategories = ref([]);
const selectCurrencies = ref([]);
const selectUsers = ref([]);

const countryStore = useCountryStore();
const configStore = useConfigStore();

watchEffect(async () => {
  expenses.value = await getExpenses(countryStore.currentCountry.id);
  expenses.value.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
});

onMounted(async () => {
  selectCategories.value = await getCategories();
  selectCurrencies.value = configStore.currencies ? [configStore.currencies] : await getCurrencies();

  selectUsers.value = await getUsers();
});

const selectValues: ComputedRef<FormSelectValues> = computed(() => ({
  categories: selectCategories.value,
  currencies: selectCurrencies.value,
  users: selectUsers.value,
}));

const handleAddExpense = (expense: Expense) => {
  expenses.value.unshift(expense);
  expenses.value.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};
</script>
