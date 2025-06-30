<template>
  <div class="flex flex-col gap-4 overflow-x-scroll">
    <div class="">
      <ExpenseForm
        :selectValues="selectValues"
        @addExpense="handleAddExpense"
      />
    </div>
    <div class="">
      <ExpenseTable :selectValues="selectValues" v-model="expenses" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, computed, ComputedRef } from "vue";
import ExpenseTable from "@/components/ExpenseTable.vue";
import { getExpenses } from "@/api/expenses";
import ExpenseForm from "@/components/ExpenseForm.vue";
import { getCategories } from "@/api/categories";
import type { FormSelectValues } from "@/models/FormSelectValues";
import { getCurrencies } from "@/api/currencies";
import { getUsers } from "@/api/users";

const expenses = ref([]);
const selectCategories = ref([]);
const selectCurrencies = ref([]);
const selectUsers = ref([]);

onMounted(async () => {
  expenses.value = await getExpenses()
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error fetching expenses:", err);
      return [];
    });

  selectCategories.value = await getCategories()
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error fetching categories:", err);
      return [];
    });
  selectCurrencies.value = await getCurrencies()
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error fetching categories:", err);
      return [];
    });

  selectUsers.value = await getUsers()
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error fetching users:", err);
      return [];
    });
});

const selectValues: ComputedRef<FormSelectValues> = computed(() => ({
  categories: selectCategories.value,
  currencies: selectCurrencies.value,
  users: selectUsers.value,
}));

const handleAddExpense = (expense) => {
  expenses.value.unshift(expense);
};
</script>
