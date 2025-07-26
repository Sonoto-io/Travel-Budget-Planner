<template>
  <Form
    v-slot="$form"
    @submit="onFormSubmit"
    class="flex flex-wrap items-center gap-4"
  >
  <div v-for="input in inputs">
    <InputText v-if="input.type == 'string'" :name="input.field" type="text" :placeholder="input.field.toUpperCase()" fluid />
    <InputNumber v-if="input.type == 'number'" :minFractionDigits="2" :name="input.field" :placeholder="input.field.toUpperCase()" fluid />
  </div>
    <Button type="submit" severity="secondary" label="Submit" />

  </Form>
</template>

<script setup lang="ts">
import { Form } from "@primevue/forms";
import { InputText } from "primevue";
import InputNumber from 'primevue/inputnumber';
import { useToast } from "primevue/usetoast";
import { ref, watch } from "vue";
import Button from "primevue/button";
const props = defineProps<{
  item?: Country | Category | Subcategory | Currency | User;
}>();

const toast = useToast();
const inputs = ref([]) 

watch(props, () => {
  if (props.item) {
    const tmp_inputs = Object.keys(props.item).map((key) => {
      if (key != "id") {
        return { field: key, type: typeof props.item[key]};
      }
      return null;
    });
    inputs.value = tmp_inputs.filter((input) => input !== null);
  }
});

const onFormSubmit = async ({ valid, values, reset }) => {
  if (valid) {
    toast.add({
      severity: "success",
      summary: "Form is submitted.",
      life: 3000,
    });
    reset();
    // TODO: Add to database an return object with id

    // emit("addExpense", {
    //   date: values.date,
    //   user: values.user,
    //   currency: values.currency,
    //   price: values.price,
    //   note: values.note,
    //   location: values.location,
    //   category: values.category,
    //   subcategory: values.subcategory,
    //   country_id: countryStore.currentCountry.id,
    // });
  }
};
</script>
