<template>
  <Form
    v-slot="$form"
    :initialValues
    :resolver="resolver"
    @submit="onFormSubmit"
    class="flex items-center  gap-4"
  >
    <!-- Date -->
    <div class="flex flex-col gap-2">
      <IftaLabel>
        <DatePicker name="date" class="min-w-30" />
        <label for="date">
          Date
          <span class="text-red-500">*</span>
        </label>
      </IftaLabel>
      <Message v-if="$form.date?.invalid" severity="error">{{
        $form.date.error?.message
      }}</Message>
    </div>

    <!-- User -->
    <div class="flex flex-col gap-2">
      <IftaLabel>
        <Select
          inputId="user"
          name="user"
          :options="props.selectValues.users"
          optionLabel="label"
          class="min-w-30"
        />
        <label for="user">
          User
          <span class="text-red-500">*</span>
        </label>
      </IftaLabel>
      <Message v-if="$form.user?.invalid" severity="error">{{
        $form.user.error?.message
      }}</Message>
    </div>

    <!-- Currency -->
    <div class="flex flex-col gap-2">
      <IftaLabel>
        <Select
          name="currency"
          :options="props.selectValues.currencies"
          optionLabel="label"
          class="min-w-50"
        />
        <label for="currency">
          Currency
          <span class="text-red-500">*</span>
        </label>
      </IftaLabel>
      <Message v-if="$form.currency?.invalid" severity="error">{{
        $form.currency.error?.message
      }}</Message>
    </div>

    <!-- Price -->
    <div class="flex flex-col gap-2">
      <IftaLabel>
        <InputText name="price" class="min-w-30"/>
        <label for="price">
          Price
          <span class="text-red-500">*</span>
        </label>
      </IftaLabel>
      <Message v-if="$form.price?.invalid" severity="error">{{
        $form.price.error?.message
      }}</Message>
    </div>

    <!-- Note -->
    <div>
      <IftaLabel>
      <Textarea name="note" rows="1" cols="30" class="min-w-50" />
          <label for="note">
          Note
        </label>
      </IftaLabel>
      <Message v-if="$form.note?.invalid" severity="error">{{
        $form.note.error?.message
      }}</Message>
    </div>

    <!-- Category -->
    <div class="flex flex-col gap-2">
      <IftaLabel>
        <Select
          name="category"
          :options="categories"
          optionLabel="label"
          class="min-w-50"
          @change="
            selectSubcategories = fetchSubCategories($form.category.value.label);
            $form.subcategory.value.label = '';
          "
        />
        <label for="category">
          Category
          <span class="text-red-500">*</span>
        </label>
      </IftaLabel>
      <Message v-if="$form.category?.invalid" severity="error">{{
        $form.category.error?.message
      }}</Message>
    </div>

    <!-- Subcategory -->
    <div>
      <IftaLabel>
      <Select
        name="subcategory"
        :options="selectSubcategories"
        optionLabel="label"
        class="min-w-50"
      />
      <label for="subcategory">
          Subcategory
        </label>
      </IftaLabel>
      <Message v-if="$form.subcategory?.invalid" severity="error">{{
        $form.subcategory.error?.message
      }}</Message>
    </div>

    <!-- Submit Button -->
    <Button type="submit" severity="secondary" label="Submit" />
  </Form>
</template>

<script setup lang="ts">
import { Form } from "@primevue/forms";
import { computed, reactive, ref, watch } from "vue";
import { useToast } from "primevue/usetoast";
import { zodResolver } from '@primevue/forms/resolvers/zod';
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Message from "primevue/message";
import Textarea from "primevue/textarea";
import { z } from "zod";
import DatePicker from "primevue/datepicker";
import Select from "primevue/select";
import type { FormSelectValues } from "@/models/FormSelectValues";
import { fetchSubCategories } from "@/utils/SubcategoryUtils";
import IftaLabel from 'primevue/iftalabel';
import { id } from "happy-dom/lib/PropertySymbol";

const props = defineProps<{
  selectValues: FormSelectValues;
}>();

const emit = defineEmits(["addExpense"]);

const categories = computed(() => props.selectValues["categories"] ?? []);
console.log("Categories:", categories.value);


const toast = useToast();
const selectSubcategories = ref(fetchSubCategories(props.selectValues.categories[0]?.label) ?? []);

const initialValues = reactive({
  date: new Date(),
  user: {
    id: 0,
    label: "",
  },
  currency: {
    ident: "",
    name: "",
    label: "",
    conversion: 1,
  },
  price: "",
  note: "",
  category: {
    id: "",
    label: "",
  },
  subcategory: {
    label: "",
  },
});

watch(
  () => props.selectValues,
  (newValues) => {
    if (newValues.users.length > 0 && initialValues.user.label == "") {
      initialValues.user.id = newValues.users[0].id;
      initialValues.user.label = newValues.users[0].label;
    }
    if (newValues.currencies.length > 0 && initialValues.currency.label == "") {
      // didn't find better way to make the form react to currency change
      initialValues.currency.ident = newValues.currencies[0].ident;
      initialValues.currency.name = newValues.currencies[0].name;
      initialValues.currency.label = newValues.currencies[0].label;
      initialValues.currency.conversion = newValues.currencies[0].conversion;
    }
    if (newValues.categories.length > 0 && initialValues.category.label == "") {
      console.log("Setting initial category:", newValues.categories[0].label);
      initialValues.category.label = newValues.categories[0].label;
      initialValues.category.id = newValues.categories[0].id ?? "";
      // Update subcategories too if you want
      selectSubcategories.value = fetchSubCategories(initialValues.category.label);
      if (selectSubcategories.value.length > 0) {
        initialValues.subcategory.label = selectSubcategories.value[0].label;
      }
    }
  },
  { deep: true, immediate: true }
);

const resolver = zodResolver(
  z.object({
    date: z.coerce.date({ required_error: "Date is required" }),
    user: z.object({
      id: z.number().int().positive("User ID must be a positive integer"),
      label : z.string().min(1, "User is required")}),
    currency: z.object({
      ident: z.string(),
      name: z.string(),
      label: z.string().min(1, "Currency is required"),
      conversion: z.number(),
    }),
    price: z.coerce.number().positive("Price must be positive"),
    note: z.string().optional(),
    category: z.object({
      id: z.string().optional(),
      label: z.string().min(1, "Category is required"),
    }),
    subcategory: z.object({
      label : z.string().min(1, "User is required")}).optional(),
  }),
);


const onFormSubmit = ({ valid, values, reset }) => {
  if (valid) {
    toast.add({
      severity: "success",
      summary: "Form is submitted.",
      life: 3000,
    });
    reset(); 
    emit("addExpense", {
      date: values.date,
      user: values.user,
      currency: values.currency,
      price: values.price,
      note: values.note,
      category: values.category,
      subcategory: values.subcategory,
    });
  }
};

</script>
