<template>
  <div class="flex flex-col overflow-x-scroll gap-4">
    <div class="">
      <ExpenseForm :selectValues="selectValues" @addExpense="handleAddExpense"/>
    </div>
    <div class="">
      <ExpenseTable :selectValues="selectValues" v-model="expenses" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import ExpenseTable from "@/components/ExpenseTable.vue";
import { getExpenses } from "@/api/expenses";
import ExpenseForm from "@/components/ExpenseForm.vue";

const expenses = ref([]);

onMounted(() => {
  expenses.value = getExpenses();
});

// Select values fetch

const selectCategories = ref([
  // TODO: fetch from api
  { label: "test" },
  { label: "waf" },
  { label: "wouf" },
]);

const selectSubCategories = ref([
  // TODO: fetch from api depending on category
  { label: "test sub" },
  { label: "waf sub" },
  { label: "wouf sub" },
]);

const selectCurrencies = ref([
  // TODO: fetch from api
  { ident: "fr-FR", name: "EUR", displayName: "Euro", conversion: 1 },
  { ident: "ja-JP", name: "JPY", displayName: "Yen", conversion: 0.0061 },
  { ident: "us-US", name: "USD", displayName: "Dollar", conversion: 0.9 },
]);

const selectUsers = ref([
  // TODO: fetch from api depending on category
  { label: "Sonoto" },
  { label: "Antoine" },
]);

const selectValues: FormSelectValues = {
  categories: selectCategories.value,
  subcategories: selectSubCategories.value,
  currencies: selectCurrencies.value,
  users: selectUsers.value,
};

const handleAddExpense = (expense) => {
  expenses.value.unshift(expense);
};
</script>
