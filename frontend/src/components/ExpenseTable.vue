<template>
  <DataTable v-model:editingRows="editingRows" :value="expenses" editMode="row" dataKey="id"
    @row-edit-save="onRowEditSave" @row-edit-init="handleCategorySelect($event.data['category'])" sortField="date"
    sortMode="single" tableStyle="min-width: 50rem">
    <!-- Date Column -->
    <Column field="date" header="Date" sortable :sortField="formatDate">
      <template #body="{ data, field }">
        {{ formatDate(data[field]) }}
      </template>
      <template #editor="{ data, field }">
        <DatePicker v-model="data[field]" />
      </template>
    </Column>

    <!-- User Column -->
    <Column field="user" header="User">
      <template #body="{ data, field }">
        {{ data[field].label }}
      </template>
      <template #editor="{ data, field }">
        <Select v-model="data[field]" :options="selectValues.users" optionLabel="label" />
      </template>
    </Column>

    <!-- Currency Column -->
    <Column field="currency" header="Currency" sortable sortField="currency.name">
      <template #body="{ data, field }">
        {{ data[field].name }}
      </template>
      <template #editor="{ data, field }">
        <Select v-model="data[field]" :options="selectValues.currencies" optionLabel="label"  />
      </template>
    </Column>

    <!-- Price Column -->
    <Column field="price" header="Price" sortable>
      <template #body="{ data, field }">
        {{ formatCurrency(data[field], data["currency"]) }}
      </template>
      <template #editor="{ data, field }">
        <InputNumber v-model="data[field]" class="w-30" :maxFractionDigits="2" />
      </template>
    </Column>

    <!-- Price in my currency Column -->
    <Column field="price" header="Price in my currency" sortable>
      <template #body="{ data, field }">
        {{
          convertValueToCurrency(data[field], data["currency"], mainCurrency)
        }}
      </template>
    </Column>

    <!-- Note Column -->
    <Column field="note" header="Note">
      <template #body="{ data, field }">
        <div class="max-w-50 truncate">{{ data[field] }}</div>
      </template>
      <template #editor="{ data, field }">
        <Textarea v-model="data[field]" rows="1" cols="10" /></template>
    </Column>

    <!-- Location Column -->
    <Column field="location" header="Location" sortable>
      <template #body="{ data, field }">
        <div class="max-w-50 truncate">{{ data[field] }}</div>
      </template>
      <template #editor="{ data, field }">
        <InputText v-model="data[field]" rows="1" cols="10" />
      </template>
    </Column>

    <!-- Category Column -->
    <Column field="category" header="Category" sortable>
      <template #body="{ data, field }">
        {{ data[field].label }}
      </template>
      <template #editor="{ data, field }">
        <Select v-model="data[field]" :options="selectValues.categories"  optionLabel="label"
          @change="handleCategorySelect($event.value)" /> </template>
    </Column>

    <!-- Sub Category Column -->
    <Column field="subcategory" header="Sub Category" sortable>
      <template #body="{ data, field }">
        {{ data[field].label }}
      </template>
      <template #editor="{ data, field }">
        <Select v-model="data[field]" :options="selectSubcategories" optionLabel="label" 
          @show="handleCategorySelect(data.category)" /> </template>
    </Column>

    <!-- Exception Column -->
    <Column field="exception" header="Exceptional" sortable>
      <template #body="{ data, field }">
        {{ data[field] ? "Yes" : "No" }}
      </template>
      <template #editor="{ data, field }">
        <Checkbox v-model="data[field]" binary />
      </template>
    </Column>


    <!-- Edit Column -->
    <Column header="Edit" :rowEditor="true" style="width: 10%; min-width: 8rem"></Column>
    <Column header="Delete" style="width: 10%; min-width: 8rem">
      <template #body="{ data }">
        <ConfirmPopup></ConfirmPopup>
        <Button icon="pi pi-trash" severity="danger" @click="showDeleteDialog($event, data)" text rounded />
      </template>
    </Column>
  </DataTable>
</template>

<script setup lang="ts">
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import { ref } from "vue";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import DatePicker from "primevue/datepicker";
import Textarea from "primevue/textarea";
import Select from "primevue/select";
import { formatCurrency, convertValueToCurrency } from "@/utils/CurrencyUtils";
import { fetchSubCategories } from "@/utils/SubcategoryUtils";
import type { FormSelectValues } from "@/models/FormSelectValues";
import Button from "primevue/button";
import { deleteExpense, updateExpense } from "@/api/expenses";
import { useToast } from "primevue/usetoast";
import Checkbox from "primevue/checkbox";
import {useConfirm} from "primevue/useconfirm";
import ConfirmPopup from 'primevue/confirmpopup';

const toast = useToast();
const confirm = useConfirm();

const props = defineProps<{
  selectValues: FormSelectValues;
}>();

const expenses = defineModel<Array<Expense>>();
const editingRows = ref([]);
const mainCurrency = ref({ locale: "fr-FR", name: "EUR" }); // TODO: fetch from api
const selectSubcategories = ref();

const handleCategorySelect = async (category: Category) => {
  try {
    selectSubcategories.value = await fetchSubCategories(category);
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    selectSubcategories.value = [];
  }
};

const onRowEditSave = async (event: { newData: any; index: any }) => {
  let { newData, index } = event;
  const date = new Date(newData["date"]);
  date.setHours(12); // To avoid timezone issues
  newData["date"] = date;
  const res = await updateExpense(newData);
  if (res.status.code !== 200) {
    toast.add({
      severity: "error",
      summary: "Failed to update expense.",
      detail: res.status.message,
      life: 3000,
    });
  } else {
    toast.add({
      severity: "success",
      summary: "Expense updated successfully.",
      life: 3000,
    });
  }
  expenses.value[index] = newData;
};

const showDeleteDialog = (event, rowData) => {
    confirm.require({
        target: event.currentTarget,
        message: 'Do you want to delete this expense ?',
        icon: 'pi pi-info-circle',
        rejectProps: {
            label: 'Cancel',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Delete',
            severity: 'danger'
        },
        accept: () => {
            deleteRow(rowData);
        },
        reject: () => {
            toast.add({ severity: 'info', summary: 'Rejected', detail: "You didn't delete the expense", life: 3000 });
        }
    });
}

const deleteRow = async (row: Expense) => {
  const res = await deleteExpense(row.id);
  if (res.status.code == 200) {
    toast.add({
      severity: "success",
      summary: "Expense deleted successfully.",
      life: 3000,
    });
    expenses.value = expenses.value.filter((expense) => expense.id !== row.id);

  } else {
    toast.add({
      severity: "error",
      summary: "Failed to delete expense.",
      detail: res.status.message,
      life: 3000,
    });
    return;
  }
};

const formatDate = (line) => {
  if (line instanceof Date || typeof line === "string") {
    try {
      return new Date(line).toISOString().slice(0, 10);
    } catch (error) {
      return line
    }
  }
  if (line && typeof line === "object" && "date" in line) {
    return line.date instanceof Date
      ? line.date.toISOString().slice(0, 10)
      : line.date;
  }
  return "";
};
</script>
