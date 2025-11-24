<template>
  <DataTable class="expenses-table" v-model:editingRows="editingRows" :value="expenses" editMode="row" dataKey="id"
    @row-edit-save="onRowEditSave" @row-edit-init="handleCategorySelect($event.data['category'])" sortField="date"
    sortMode="single" tableStyle="min-width: 50rem">
    <!-- Example columns with widths -->
    <Column field="date" header="Date" sortable :sortField="formatDate" style="min-width: 8rem; width: 10%">
      <template #body="{ data, field }">{{ formatDate(data[field]) }}</template>
      <template #editor="{ data, field }">
        <DatePicker v-model="data[field]" />
      </template>
    </Column>

    <Column field="user" header="User" style="min-width: 8rem; width: 10%">
      <template #body="{ data, field }">{{ data[field].label }}</template>
      <template #editor="{ data, field }">
        <Select v-model="data[field]" :options="selectValues.users" optionLabel="label" />
      </template>
    </Column>

    <Column field="currency" header="Currency" sortable sortField="currency.name" style="min-width: 8rem; width: 8%">
      <template #body="{ data, field }">{{ data[field].name }}</template>
      <template #editor="{ data, field }">
        <Select v-model="data[field]" :options="selectValues.currencies" optionLabel="label" />
      </template>
    </Column>

    <Column field="price" header="Price" style="min-width: 6rem; width: 6%">
      <template #body="{ data, field }">{{ formatCurrency(data[field], data["currency"]) }}</template>
      <template #editor="{ data, field }">
        <InputNumber v-model="data[field]" :maxFractionDigits="2" />
      </template>
    </Column>

    <Column field="price" header="Price in my currency" style="min-width: 6rem; width: 6%" sortable
      :sortField="(row) => convertValueToCurrency(row.price, row.currency, mainCurrency).value">
      <template #body="{ data, field }">
        {{
          convertValueToCurrency(data[field], data["currency"], mainCurrency).label
        }}
      </template>
    </Column>

    <Column field="note" header="Note" style="min-width: 12rem; width: 20%">
      <template #body="{ data, field }">
        <div class="truncate">{{ data[field] }}</div>
      </template>
      <template #editor="{ data, field }"><Textarea v-model="data[field]" rows="1" /></template>
    </Column>

    <Column field="location" header="Location" style="min-width: 10rem; width: 15%">
      <template #body="{ data, field }">
        <div class="truncate">{{ data[field] }}</div>
      </template>
      <template #editor="{ data, field }">
        <InputText v-model="data[field]" />
      </template>
    </Column>

    <Column field="category" header="Category" sortable style="min-width: 8rem; width: 10%">
      <template #body="{ data, field }">{{ data[field].label }}</template>
      <template #editor="{ data, field }">
        <Select v-model="data[field]" :options="selectValues.categories" optionLabel="label"
          @change="handleCategorySelect($event.value)" />
      </template>
    </Column>

    <Column field="subcategory" header="Sub Category" sortable style="min-width: 8rem; width: 10%">
      <template #body="{ data, field }">{{ data[field].label }}</template>
      <template #editor="{ data, field }">
        <Select v-model="data[field]" :options="selectSubcategories" optionLabel="label"
          @show="handleCategorySelect(data.category)" />
      </template>
    </Column>

    <Column field="exception" header="Exceptional" sortable style="min-width: 6rem; width: 5%">
      <template #body="{ data, field }">{{ data[field] ? "Yes" : "No" }}</template>
      <template #editor="{ data, field }">
        <Checkbox v-model="data[field]" binary />
      </template>
    </Column>

    <Column header="Edit" :rowEditor="true" style="width: 8%; min-width: 6rem"></Column>
    <Column header="Delete" style="width: 8%; min-width: 6rem">
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
import { useConfirm } from "primevue/useconfirm";
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

<style>
/* Table fixed layout for balanced columns */
.expenses-table .p-datatable-tablescroll {
  table-layout: fixed;
  width: 100%;
}

/* Align all table cells top */
.expenses-table .p-datatable-tbody>tr>td,
.expenses-table .p-datatable-thead th {
  vertical-align: top !important;
  padding: 0.5rem 0.75rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Truncate long text in body */
.expenses-table .truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Inputs, Selects, DatePickers, Textareas full width */
.expenses-table .p-inputtext,
.expenses-table .p-inputnumber,
.expenses-table .p-select,
.expenses-table .p-dropdown,
.expenses-table .p-multiselect,
.expenses-table .p-datepicker,
.expenses-table .p-textarea,
.expenses-table .p-select-label,
.expenses-table .p-multiselect-label,
.expenses-table .p-dropdown-label {
  width: 100% !important;
  box-sizing: border-box;
}

/* Row editor buttons aligned top */
.expenses-table .p-row-editor-init,
.expenses-table .p-row-editor-save,
.expenses-table .p-row-editor-cancel {
  vertical-align: top !important;
}

/* Textarea resize vertical only */
.expenses-table .p-textarea textarea {
  width: 100% !important;
  resize: vertical;
}

/* Mobile adjustments */
@media (max-width: 768px) {

  .expenses-table .p-datatable-tbody td,
  .expenses-table .p-datatable-thead th {
    white-space: normal;
  }

  /* Stack inputs in editors */
  .expenses-table .p-inputtext,
  .expenses-table .p-inputnumber,
  .expenses-table .p-select,
  .expenses-table .p-dropdown,
  .expenses-table .p-multiselect,
  .expenses-table .p-datepicker,
  .expenses-table .p-textarea {
    width: 100% !important;
  }
}
</style>