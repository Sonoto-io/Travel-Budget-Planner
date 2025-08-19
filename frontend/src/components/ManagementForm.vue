<template>
  <Form
    v-slot="$form"
    @submit="onFormSubmit"
    class="flex flex-wrap items-center gap-4"
  >
    <div v-for="input in inputs" :key="input.field">
      <div v-if="! forbiddenFields.includes(input.field)">
      <InputText
        v-if="input.type === 'string' && !isSelectNeeded(input.field)"
        :name="input.field"
        type="text"
        :placeholder="input.field.toUpperCase()"
        fluid
      />
      <InputNumber
        v-else-if="input.type === 'number'"
        :name="input.field"
        :placeholder="input.field.toUpperCase()"
        :maxFractionDigits="10"
        fluid
      />
      <Select
        v-else-if="isSelectNeeded(input.field)"
        :name="input.field"
        v-model="selectValues[input.field]"
        :options="selectOptionsMap[input.field]"
        optionLabel="label"
        class="min-w-50"
      />
    </div>
    </div>
    <Button type="submit" severity="secondary" label="Submit" />
  </Form>
</template>


<script setup lang="ts">
import { ref, watch } from "vue";
import { Form } from "@primevue/forms";
import { InputText } from "primevue";
import InputNumber from "primevue/inputnumber";
import Select from "primevue/select";
import Button from "primevue/button";
import { useToast } from "primevue/usetoast";

import { handleItemAction, isSelectNeeded, getSelectOptions, ItemName } from "@/utils/ItemsUtils";
import type { Item } from "@/models/Item";
const forbiddenFields = ["total_expected_expense", "order", "token"];
const props = defineProps<{
  items?: Item[];
  itemType?: ItemName;
}>();

const emit = defineEmits(["addItem"]);
const toast = useToast();

// Fields config
const inputs = ref<Array<{ field: string; type: string }>>([]);

// Per-field select state
const selectOptionsMap = ref<Record<string, any[]>>({});
const selectValues = ref<Record<string, any>>({});

// Watch the incoming item shape
watch(
  () => props.items,
  async () => {
    if (props.items.length == 0) return;

    // Generate inputs
    inputs.value = Object.keys(props.items[0])
      .filter((key) => key !== "id")
      .map((key) => ({
        field: key,
        type: typeof props.items[0]![key],
      }));

    // Preload select options per field
    for (const input of inputs.value) {
      if (isSelectNeeded(input.field)) {
        const sampleValue = props.items[0][input.field];
        selectOptionsMap.value[input.field] = await getSelectOptions(input.field, sampleValue);

        // Preselect first option if needed
        if (!selectValues.value[input.field]) {
          selectValues.value[input.field] = selectOptionsMap.value[input.field][0] ?? null;
        }
      }
    }
  },
  { immediate: true }
);

// Submit handler
const onFormSubmit = async ({ valid, values, reset }) => {
  if (!valid) return;

  // Inject select values into values before submission
  for (const input of inputs.value) {
    if (isSelectNeeded(input.field)) {
      values[input.field] = selectValues.value[input.field]?.id ?? null;
    }
  }

  // increment order if needed
  if (Object.keys(props.items[0]).includes("order")) {
    values.order = props.items.reduce((max, item) => Math.max(max, item.order || 0), 0) + 1;
  }
  const createItemResponse = await handleItemAction(props.itemType, "create", values);
  reset();

  if (createItemResponse.status.code === 201) {
    emit("addItem", createItemResponse.data);
    toast.add({ severity: "success", summary: createItemResponse.message, life: 3000 });
  } else if (createItemResponse.status.code === 400 || createItemResponse.status.code === 422) {
    toast.add({
      severity: "error",
      summary: `Couldn't create object: ${createItemResponse.message}`,
      life: 3000,
    });
  } else {
    toast.add({
      severity: "error",
      summary: `Unexpected error: ${createItemResponse.message}`,
      life: 3000,
    });
  }
};
</script>

