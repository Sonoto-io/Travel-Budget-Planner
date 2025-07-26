<template>
  <Skeleton v-if="!items"></Skeleton>
  <DataTable
    v-if="items"
    :value="items"
    tableStyle="min-width: 50rem"
    v-model:editingRows="editingRows"
    dataKey="id"
    editMode="row"
    @row-edit-save="onRowEditSave"
  >
    <Column
      v-for="col of columns"
      :key="col.field"
      :field="col.field"
      :header="col.header"
    >
      <template #editor="{ data, field }">
        <InputText v-model="data[field]" class="w-30" />
      </template>
    </Column>
    <!-- Edit Column -->
    <Column header="Edit" :rowEditor="true" style="width: 10%; min-width: 8rem">
    </Column>
    <Column header="Delete" style="width: 10%; min-width: 8rem">
      <template #body="{ data }">
        <Button
          icon="pi pi-trash"
          severity="danger"
          @click="deleteRow(data)"
          text
          rounded
        />
      </template>
    </Column>
  </DataTable>
</template>

<script setup lang="ts">
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import { Skeleton } from "primevue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { useToast } from "primevue/usetoast";
import { ref, watch } from "vue";


const toast = useToast();

const items =
  defineModel<Array<Country | Category | Subcategory | Currency | User>>();

const columns = ref([]);
const editingRows = ref([]);

watch(items, () => {
  if (items.value?.length > 0) {
    const tmp_columns = Object.keys(items.value[0]).map((key) => {
      if (key != "id") {
        return { field: key, header: key.toString().toUpperCase() };
      }
      return null;
    });
    columns.value = tmp_columns.filter((column) => column !== null);
  }
});

const onRowEditSave = (event: { newData: any; index: any }) => {
  let { newData, index } = event;
  items.value[index] = newData;
};

const deleteRow = (row) => {
  if (items.value?.length > 1) {
    items.value = items.value.filter((item) => item.id !== row.id);
  } else {
    toast.add({
      severity: "warn",
      summary: "Can't delete last item",
      life: 3000,
    });
  }
};
</script>
