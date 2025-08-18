<template>
  <Skeleton v-if="!items"></Skeleton>
  <DataTable v-else :value="items" tableStyle="min-width: 50rem" v-model:editingRows="editingRows" dataKey="id"
    editMode="row" @row-edit-save="onRowEditSave" :reordableRows="true" @rowReorder="onReorder">
    <Column v-if="Object.keys(items[0] ?? {}).some((itemName) => itemName === 'order')" rowReorder headerStyle="width: 3rem" />
    <Column v-for="col in columns" :key="col.field" :field="col.field" :header="col.header" :sortable="true">
      <template #body="slotProps">
        <span v-if="isSelectNeeded(col.field)">
          {{
            getRowSelectValue(col.field, slotProps.data[col.field])?.label ??
            "error"
          }}
        </span>
        <span v-else>
          {{ slotProps.data[col.field] }}
        </span>
      </template>

      <template #editor="slotProps">
        <InputText v-if="
          typeof slotProps.data[col.field] === 'string' &&
          !isSelectNeeded(col.field)
        " v-model="slotProps.data[col.field]" />
        <InputNumber v-else-if="typeof slotProps.data[col.field] === 'number'" v-model="slotProps.data[col.field]"
          :maxFractionDigits="10" />
        <Select v-else-if="isSelectNeeded(col.field)" v-model="selectValues[slotProps.data.id][col.field]"
          :options="selectOptionsMap[col.field]" optionLabel="label" class="min-w-50" />
      </template>
    </Column>

    <Column header="Edit" :rowEditor="true" style="width: 10%; min-width: 8rem" />
    <Column header="Delete" style="width: 10%; min-width: 8rem">
      <template #body="{ data }">
        <Button icon="pi pi-trash" severity="danger" @click="deleteRow(data)" text rounded />
      </template>
    </Column>
  </DataTable>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import { Skeleton } from "primevue";
import InputNumber from "primevue/inputnumber";
import InputText from "primevue/inputtext";
import Select from "primevue/select";
import Button from "primevue/button";
import { useToast } from "primevue/usetoast";

import {
  getSelectOptions,
  handleItemAction,
  isSelectNeeded,
  ItemName,
} from "@/utils/ItemsUtils";

import type { Item } from "@/models/Item";

// Props & models
const toast = useToast();
const items = defineModel<Array<Item>>();
const props = defineProps<{ itemType?: ItemName }>();

// State
const columns = ref<Array<{ field: string; header: string }>>([]);
const editingRows = ref([]);
const selectValues = ref<Record<string, Record<string, any>>>({});
const selectOptionsMap = ref<Record<string, any[]>>({});

// Watch items to generate columns and load selects
watch(items, async () => {
  if (!items.value || items.value.length === 0) return;

  const keys = Object.keys(items.value[0]);

  // Generate columns
  columns.value = keys
    .filter((key) => key !== "id" && key !== "order")
    .map((key) => ({
      field: key,
      header: key.toUpperCase(),
    }));

  // Load select options for needed fields
  for (const key of keys) {
    if (isSelectNeeded(key)) {
      const sampleValue = items.value[0][key];
      selectOptionsMap.value[key] = await getSelectOptions(key, sampleValue);
    }
  }

  // Init select values per row
  for (const item of items.value) {
    const rowId = item.id;
    selectValues.value[rowId] ||= {};
    for (const key of keys) {
      if (isSelectNeeded(key)) {
        selectValues.value[rowId][key] = getRowSelectValue(key, item[key]);
      }
    }
  }
});

// Helpers
const getRowSelectValue = (field: string, itemId: string) => {
  return selectOptionsMap.value[field]?.find((opt) => opt.id === itemId);
};

const onReorder = async (event) => {
  if (!event.value || event.value.length === 0) return;
    let orderCount = event.value.length
    event.value.forEach(async (element: Item) => {
        element.order = orderCount;
        orderCount -=1;
        await handleItemAction(props.itemType, "update", element);
    });
    items.value = event.value;

    toast.add({severity:'success', summary: 'Rows Reordered', life: 3000});
};

// Save edits
const onRowEditSave = async (event: { newData: any; index: number }) => {
  const { newData, index } = event;

  // Replace select objects with selected IDs
  const selectFields = columns.value.filter((col) => isSelectNeeded(col.field));
  for (const col of selectFields) {
    const selected = selectValues.value[newData.id]?.[col.field];
    if (selected) {
      newData[col.field] = selected.id;
    }
  }

  const response = await handleItemAction(props.itemType, "update", newData);
  items.value[index] = newData;

  toast.add({
    severity: "success",
    summary: response.message,
    life: 3000,
  });
};

// Delete
const deleteRow = async (row) => {
  if (items.value?.length > 1) {
    const response = await handleItemAction(props.itemType, "delete", row.id);

    if (response.status?.code !== 200) {
      if (response.message?.code == "P2003") {
        toast.add({ severity: "error", summary: "Either an Expense or another item needs this one. Please remove any associated Expense or item before removing this one.", life: 3000 });
      } else {
        toast.add({ severity: "error", summary: `Error : ${response.message}`, life: 3000 });
      }
    } else {
      items.value = items.value.filter((item) => item.id !== row.id);
      toast.add({ severity: "success", summary: response.message, life: 3000 });
    }
  } else {
    toast.add({
      severity: "warn",
      summary: "Can't delete last item",
      life: 3000,
    });
  }
};
</script>
