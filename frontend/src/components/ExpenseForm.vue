<template>
  <Form v-slot="$form" :initialValues :resolver="resolver" @submit="onFormSubmit"
    class="flex flex-wrap items-center gap-4">
    <!-- Date -->
    <div class="flex grow flex-col gap-2">
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
    <div class="flex grow flex-col gap-2">
      <IftaLabel>
        <MultiSelect inputId="user" name="user" :options="props.selectValues.users" optionLabel="label" filter
          placeholder="Select User(s)" class="min-w-30" />
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
    <div class="flex grow flex-col gap-2">
      <IftaLabel>
        <Select name="currency" :options="props.selectValues.currencies" optionLabel="label" class="min-w-30" />
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
    <div class="flex grow flex-col gap-2">
      <IftaLabel>
        <InputText name="price" class="min-w-30" />
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
    <div class="flex grow flex-col gap-2">
      <IftaLabel>
        <Textarea name="note" rows="1" cols="20" />
        <label for="note"> Note </label>
      </IftaLabel>
      <Message v-if="$form.note?.invalid" severity="error">{{
        $form.note.error?.message
      }}</Message>
    </div>

    <!-- Location -->
    <div class="flex grow flex-col gap-2">
      <IftaLabel>
        <InputText name="location" />
        <label for="location"> Location </label>
      </IftaLabel>
      <Message v-if="$form.location?.invalid" severity="error">{{
        $form.location.error?.message
      }}</Message>
    </div>

    <!-- Category -->
    <div class="flex flex-col gap-2">
      <IftaLabel>
        <Select name="category" :options="categories" optionLabel="label" class="min-w-30"
          @change="handleCategorySelect($event.value)" />
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
        <Select name="subcategory" :options="selectSubcategories" optionLabel="label" class="min-w-30" />
        <label for="subcategory">
          Subcategory
          <span class="text-red-500">*</span>
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
import { computed, reactive, ref, watch, toRaw } from "vue";
import { useToast } from "primevue/usetoast";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Message from "primevue/message";
import MultiSelect from 'primevue/multiselect';
import Textarea from "primevue/textarea";
import { z } from "zod";
import DatePicker from "primevue/datepicker";
import Select from "primevue/select";
import type { FormSelectValues } from "@/models/FormSelectValues";
import { fetchSubCategories } from "@/utils/SubcategoryUtils";
import IftaLabel from "primevue/iftalabel";
import { useCountryStore } from "@/stores/countryStore";
import { useRoute } from "vue-router";
import { createExpense } from "@/api/expenses";

const props = defineProps<{
  selectValues: FormSelectValues;
}>();

const emit = defineEmits(["addExpense"]);

const categories = computed(() => props.selectValues["categories"] ?? []);

const toast = useToast();
const selectSubcategories = ref([]);
const countryStore = useCountryStore();

const initialValues = reactive({
  date: new Date(),
  user: [],
  currency: {
    label: "",
    id: "",
    name: "",
    conversion: 1,
  },
  price: "",
  note: "",
  location: "",
  category: {
    id: "",
    label: "",
  },
  subcategory: {
    id: "",
    label: "",
    categoryId: "",
  },
});

const FormData = z.object({
  date: z.coerce.date({ required_error: "Date is required" }),
  user: z.array(z.object({
    id: z.string(),
    label: z.string().min(1, "User is required"),
  })).min(1, "At least one user must be selected"),
  currency: z.object({
    id: z.string(),
    name: z.string(),
    label: z.string().min(1, "Currency is required"),
    conversion: z.number(),
  }),
  price: z.coerce.number().positive("Price must be positive"),
  note: z.string().optional(),
  location: z.string().optional(),
  category: z.object({
    id: z.string().optional(),
    label: z.string().min(1, "Category is required"),
  }),
  subcategory: z.object({
    id: z.string().optional(),
    label: z.string().min(1, "Subcategory is required"),
    categoryId: z.string().optional(),
  }),
});

const resolver = zodResolver(FormData);
const route = useRoute();

watch(route, () => {
  initialValues.currency.id = countryStore.currentMainCurrency.id;
  initialValues.currency.label = countryStore.currentMainCurrency.label;
  initialValues.currency.name = countryStore.currentMainCurrency.name;
  initialValues.currency.conversion =
    countryStore.currentMainCurrency.conversion;
});

watch(
  () => props.selectValues,
  async (newValues) => {
    if (newValues.users.length > 0 && initialValues.user.label == "") {
      initialValues.user[0].id = newValues.users[0].id;
      initialValues.user[0].label = newValues.users[0].label;
      initialValues.user[0].id = newValues.users[0].id;
      initialValues.user[0].label = newValues.users[0].label;
    }
    if (newValues.currencies.length > 0 && initialValues.currency.label == "") {
      // didn't find better way to make the form react to currency change
      initialValues.currency.id = newValues.currencies[0].id;
      initialValues.currency.name = newValues.currencies[0].name;
      initialValues.currency.label = newValues.currencies[0].label;
      initialValues.currency.conversion = newValues.currencies[0].conversion;
    }
    if (newValues.categories.length > 0 && initialValues.category.label == "") {
      initialValues.category.label = newValues.categories[0].label;
      initialValues.category.id = newValues.categories[0].id ?? "";
      try {
        selectSubcategories.value = await fetchSubCategories(
          newValues.categories[0],
        );
        initialValues.subcategory.label = selectSubcategories.value[0].label;
        initialValues.subcategory.id = selectSubcategories.value[0].id ?? "";
        initialValues.subcategory.categoryId =
          selectSubcategories.value[0].categoryId ?? "";
      } catch (error) {
        console.error("Error fetching subcategories:", error);
        selectSubcategories.value = [];
      }
    }
  },
  { deep: true, immediate: true },
);

const handleCategorySelect = async (category: Category) => {
  try {
    selectSubcategories.value = await fetchSubCategories(category);
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    selectSubcategories.value = [];
  }
};

const onFormSubmit = async ({ valid, values, reset }) => {
  if (valid) {
    values["country"] = toRaw(countryStore.currentCountry);
    values["price"] = Number(values["price"]) / values.user.length;
    const users = values.user
    users.forEach(async (user: any) => {
      const expenseData = { ...values, user };
      const res = await createExpense(expenseData);
      if (res.status.code === 201) {
        toast.add({
          severity: "success",
          summary: "Expense created successfully.",
          life: 3000,
        });
        selectSubcategories.value =
          (await fetchSubCategories(initialValues.category)) ?? [];
        emit("addExpense", { ...expenseData, id: res.data.expense.id });
        reset();

      } else {
        toast.add({
          severity: "error",
          summary: "Failed to create expense.",
          detail: `Status: ${res.status.message}`,
          life: 3000,
        });
      }
    }
    )
  }
}
</script>
