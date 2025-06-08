<template>
  <DataTable
    v-model:editingRows="editingRows"
    :value="expenses"
    editMode="row"
    dataKey="id"
    @row-edit-save="onRowEditSave"
    sortField="date" 
    :defaultSortOrder="-1"
    sortMode="single"
    :customSort="true"
    tableStyle="min-width: 50rem"
  >
    <Column
      field="date"
      header="Date"
      sortable
      :sortField="formatDate"
    >
      <template #body="{ data, field }">
        {{ formatDate(data[field]) }}
      </template>
      <template #editor="{ data, field }">
        <DatePicker v-model="data[field]" class="min-w-30" />
      </template>
    </Column>
    <Column field="user" header="User">
      <template #editor="{ data, field }">
        <Select
          v-model="data[field]"
          :options="selectValues.users"
          optionLabel="label"
          optionValue="label"
          fluid
          class="min-w-30"
        />
      </template>
    </Column>
    <Column
      field="currency"
      header="Currency"
      sortable
      sortField="currency.name"
    >
      <template #body="{ data, field }">
        {{ data["currency"].name }}
      </template>
      <template #editor="{ data, field }">
        <Select
          v-model="data[field]"
          :options="selectValues.currencies"
          optionLabel="displayName"
          fluid
          class="min-w-50"
        />
      </template>
    </Column>
    <Column field="price" header="Price" sortable>
      <template #body="{ data, field }">
        {{ formatCurrency(data[field], data["currency"]) }}
      </template>
      <template #editor="{ data, field }">
        <InputText v-model="data[field]" class="w-30" /></template
    ></Column>
    <Column field="price" header="Price in my currency" sortable>
      <template #body="{ data, field }">
        {{
          convertValueToCurrency(data[field], data["currency"], mainCurrency)
        }}
      </template>
    </Column>
    <Column field="note" header="Note">
      <template #body="{ data, field }">
        <div class="max-w-50 truncate">{{ data[field] }}</div>
      </template>
      <template #editor="{ data, field }">
        <Textarea v-model="data[field]" rows="1" cols="10"
      /></template>
    </Column>
    <Column field="category" header="Category" sortable>
      <template #editor="{ data, field }">
        <Select
          v-model="data[field]"
          :options="selectValues.categories"
          optionLabel="label"
          optionValue="label"
          fluid
          class="min-w-50"
          @change="
            selectSubcategories = fetchSubCategories(data['category']);
            data['subcategory'] = null;
          "
        /> </template
    ></Column>
    <Column field="subcategory" header="Sub Category" sortable>
      <template #editor="{ data, field }">
        <Select
          v-model="data[field]"
          :options="selectSubcategories"
          optionLabel="label"
          optionValue="label"
          fluid
          class="min-w-50"
        /> </template
    ></Column>
    <Column
      header="Edit"
      :rowEditor="true"
      style="width: 10%; min-width: 8rem"
    ></Column>
  </DataTable>
</template>

<script setup lang="ts">
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import { ref } from "vue";
import { getExpenses } from "@/api/expenses";
import InputText from "primevue/inputtext";
import DatePicker from "primevue/datepicker";
import Textarea from "primevue/textarea";
import Select from "primevue/select";
import { formatCurrency, convertValueToCurrency } from "@/utils/CurrencyUtils";
import { fetchSubCategories } from "@/utils/SubcategoryUtils";
import type { FormSelectValues } from "@/models/FormSelectValues";

const props = defineProps<{
  selectValues: FormSelectValues;
}>();

const expenses = defineModel();
const editingRows = ref([]);
const mainCurrency = ref({ ident: "fr-FR", name: "EUR" }); // TODO: fetch from api
const selectSubcategories = ref(fetchSubCategories(
    props.selectValues.categories[0].label
  ));


const onRowEditSave = (event) => {
  let { newData, index } = event;

  expenses.value[index] = newData;
};

const formatDate = (line) => {
  if (line instanceof Date || typeof line === 'string') {
    return line instanceof Date ? line.toISOString().slice(0, 10) : line;
  }
  if (line && typeof line === 'object' && 'date' in line) {
    return line.date instanceof Date ? line.date.toISOString().slice(0, 10) : line.date;
  }
  return '';
};

</script>
