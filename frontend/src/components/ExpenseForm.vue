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
          optionValue="label"
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
          optionLabel="displayName"
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
        <InputText name="price.value" class="min-w-30" />
        <label for="price.value">
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
          :options="props.selectValues.categories"
          optionLabel="label"
          optionValue="label"
          class="min-w-50"
          @change="
            selectSubcategories = fetchSubCategories($form.category.value);
            $form.subcategory.value = '';
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
        optionValue="label"
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
import { reactive, ref } from "vue";
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

const props = defineProps<{
  selectValues: FormSelectValues;
}>();
const emit = defineEmits(["addExpense"]);

const toast = useToast();
const selectSubcategories = ref(fetchSubCategories(props.selectValues.categories[0].label));
const initialValues = reactive({
  date: new Date(),
  user: props.selectValues.users[0].label,
  currency: props.selectValues.currencies[0],
  price: 0.00,
  note: "",
  category: props.selectValues.categories[0].label,
  subcategory: "",
});

const resolver = zodResolver(
  z.object({
    date: z.coerce.date({ required_error: "Date is required" }),
    user: z.enum(
      props.selectValues.users.map((u) => u.label) as [string, ...string[]],
    ),
    currency: z.object({
      ident: z.string(),
      name: z.string(),
      displayName: z.string(),
      conversion: z.number(),
    }),
    price: z.object({
      value: z.string().regex(/^\d+(\.\d{1,2})?$/, "Enter a valid amount"),
    }),
    note: z.string().optional(),
    category: z.enum(
      props.selectValues.categories.map((c) => c.label) as [
        string,
        ...string[],
      ],
    ),
    subcategory: z.string().optional(),
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
      price: parseFloat(values.price.value),
      note: values.note,
      category: values.category,
      subcategory: values.subcategory,
    });
  }
};

// TODO : fetch from db where category name == category
const updateSubCategories = (category) => {
  props.selectValues.subcategories.value = [{ label: `${category} sub` }];
};
</script>
