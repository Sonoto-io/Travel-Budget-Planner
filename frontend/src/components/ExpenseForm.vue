<template>
  <Form ref="formRef" v-slot="$form" :initialValues :resolver="resolver" @submit="onFormSubmit"
    class="flex flex-wrap items-start gap-4">
    <!-- Date -->
    <div class="flex grow flex-col gap-2">
      <IftaLabel>
        <DatePicker name="date" @date-select="saveFormData($form)" />
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
        <MultiSelect name="user" :options="props.selectValues.users" optionLabel="label" optionValue="id" filter
          placeholder="Select User(s)" @change="saveFormData($form)" />

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
        <Select name="currency" :options="props.selectValues.currencies" optionLabel="label"
          @change="saveFormData($form)" />
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
        <InputText name="price" @change="saveFormData($form)" />
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
        <Textarea name="note" rows="1" cols="20" @change="saveFormData($form)" />
        <label for="note"> Note </label>
      </IftaLabel>
      <Message v-if="$form.note?.invalid" severity="error">{{
        $form.note.error?.message
        }}</Message>
    </div>

    <!-- Location -->
    <div class="flex grow flex-col gap-2">
      <IftaLabel>
        <InputText name="location" @change="saveFormData($form)" />
        <label for="location"> Location </label>
      </IftaLabel>
      <Message v-if="$form.location?.invalid" severity="error">{{
        $form.location.error?.message
        }}</Message>
    </div>

    <!-- Category -->
    <div class="flex flex-col gap-2">
      <IftaLabel>
        <Select name="category" :options="categories" optionLabel="label"
          @change="handleCategorySelect($event.value); saveFormData($form)" />
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
        <Select name="subcategory" :options="selectSubcategories" optionLabel="label" @change="saveFormData($form)" />
        <label for="subcategory">
          Subcategory
          <span class="text-red-500">*</span>
        </label>
      </IftaLabel>
      <Message v-if="$form.subcategory?.invalid" severity="error">{{
        $form.subcategory.error?.message
        }}</Message>
    </div>

    <!-- Exception -->
    <div>
      <div>
        <Checkbox name="exception" input-id="exception" binary @change="saveFormData($form)" />
        <label for="exception">
          Exception
        </label>
      </div>
      <Message v-if="$form.subcategory?.invalid" severity="error">{{
        $form.subcategory.error?.message
        }}</Message>
    </div>

    <!-- Submit Button -->
    <Button type="submit" severity="secondary" label="Submit" :loading="isSubmitting" :disabled="isSubmitting" />

  </Form>
</template>

<script setup lang="ts">
import { Form } from "@primevue/forms";
import { computed, reactive, ref, watch, toRaw, onMounted, onUpdated } from "vue";
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
import { createExpense } from "@/api/expenses";
import Checkbox from "primevue/checkbox";

const props = defineProps<{
  selectValues: FormSelectValues;
}>();

const emit = defineEmits(["addExpense"]);

const categories = computed(() => props.selectValues["categories"] ?? []);

const toast = useToast();
const selectSubcategories = ref([]);
const countryStore = useCountryStore();
const defaultDate = new Date()
defaultDate.setHours(12)
const formRef = ref()
const isSubmitting = ref(false)


const initialValues = ref({
  date: defaultDate,
  user: [] as string[],
  currency: {
    id: "",
    name: "",
    label: "",
    conversion: 1,
    locale: "",
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
  exception: false,
})

const restoreForm = () => {
  const raw = sessionStorage.getItem("formData")
  if (!raw) return

  const saved = JSON.parse(raw)

  if (saved.date) {
    saved.date = new Date(saved.date)
    saved.date.setHours(12)
  }

  initialValues.value = {
    ...initialValues.value,
    ...saved,
  }

  toast.add({
    severity: "info",
    summary: "Restored unsaved form data.",
    life: 3000,
  })
}

restoreForm()


const formData = z.object({
  date: z.coerce.date({ required_error: "Date is required" }),

  user: z
    .array(z.string())
    .min(1, "At least one user must be selected"),

  currency: z.object({
    id: z.string(),
    name: z.string(),
    label: z.string().min(1, "Currency is required"),
    conversion: z.number(),
    locale: z.string(),
  }),

  price: z.coerce.number().positive("Price must be positive"),

  note: z.string().optional(),
  location: z.string().optional(),

  category: z.object({
    id: z.string(),
    label: z.string().min(1, "Category is required"),
  }),

  subcategory: z.object({
    id: z.string(),
    label: z.string().min(1, "Subcategory is required"),
    categoryId: z.string(),
  }),

  exception: z.boolean().optional(),
})

const resolver = zodResolver(formData);

const saveFormData = (form: any) => {
  const data: Record<string, any> = {}

  for (const key in form) {
    data[key] = form[key]?.value
  }

  if (data.date) {
    data.date.setHours(12)
  }

  sessionStorage.setItem("formData", JSON.stringify(data))
}


const handleCategorySelect = async (category: Category) => {
  try {
    selectSubcategories.value = await fetchSubCategories(category);
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    selectSubcategories.value = [];
  }
};

watch(
  () => props.selectValues,
  async (newValues) => {
    if (newValues.users.length > 0 && initialValues.value.user.length == 0) {
      initialValues.value.user.push(newValues.users[0]);
    }


    if (newValues.categories.length > 0 && initialValues.value.category.label == "") {
      initialValues.value.category.label = newValues.categories[0].label;
      initialValues.value.category.id = newValues.categories[0].id ?? "";
      try {
        selectSubcategories.value = await fetchSubCategories(
          newValues.categories[0],
        );
        initialValues.value.subcategory.label = selectSubcategories.value[0].label;
        initialValues.value.subcategory.id = selectSubcategories.value[0].id ?? "";
        initialValues.value.subcategory.categoryId =
          selectSubcategories.value[0].categoryId ?? "";
      } catch (error) {
        console.error("Error fetching subcategories:", error);
        selectSubcategories.value = [];
      }
    }
    initialValues.value.currency = countryStore.currentMainCurrency
    handleCategorySelect(initialValues.value.category);

  },
  { deep: true, immediate: true },
);

watch(countryStore, () => {
  formRef.value.setValues({
    currency: countryStore.currentMainCurrency,
  })
}
)

const onFormSubmit = async ({ valid, values, reset }) => {
  if (!valid || isSubmitting.value) return

  isSubmitting.value = true

  try {
    values.date.setHours(12)

    const users = values.user.map((id: string) =>
      props.selectValues.users.find(u => u.id === id)
    )

    const pricePerUser = Number(values.price) / users.length

    for (const user of users) {
      const expenseData = {
        ...values,
        user,
        price: pricePerUser,
        country: toRaw(countryStore.currentCountry),
      }

      await createExpense(expenseData)
      emit("addExpense", expenseData)
    }

    sessionStorage.removeItem("formData")
    reset()
  } catch (err) {
    toast.add({
      severity: "error",
      summary: "Submission failed",
      life: 3000,
    })
  } finally {
    isSubmitting.value = false
  }
}




</script>

<style>
/* --- GENERAL FORM BEHAVIOR --- */
form {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

/* each field container */
form>div {
  flex: 1 1 280px;
  /* grows, shrinks, but keeps a nice min width */
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* --- MAKE ALL PRIMEVUE INPUTS THE SAME WIDTH --- */

/* force all PrimeVue inputs to fill the parent container */
form .p-inputtext,
form .p-select,
form .p-multiselect,
form .p-datepicker,
form .p-textarea {
  width: 100% !important;
  box-sizing: border-box;
}

/* Make Select and MultiSelect caret/buttons not shrink the box */
form .p-select .p-select-trigger,
form .p-multiselect .p-multiselect-trigger {
  flex-shrink: 0;
}

/* Textarea full width (PrimeVue sometimes restricts it) */
form .p-textarea textarea {
  width: 100% !important;
}

/* Checkbox stays compact */
form .p-checkbox {
  width: auto !important;
}

/* Submit button should stretch nicely */
form button {
  width: 100%;
}

/* --- RESPONSIVE IMPROVEMENTS --- */

/* On small phones */
@media (max-width: 640px) {
  form>div {
    flex-basis: 100%;
  }

  form button {
    margin-top: 0.5rem;
  }
}

/* On wider desktop screens */
@media (min-width: 900px) {
  form>div {
    flex-basis: calc(50% - 1rem);
    /* 2 columns layout */
  }

  /* But long fields can override if needed */
  form>div.full {
    flex-basis: 100%;
  }
}
</style>