<template>
  <div class="flex flex-col gap-4 overflow-x-scroll">
    <div class="">
      <ManagementForm :item="items[0]"/>
    </div>
    <div>
      <ManagementTable  v-model="items"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { getCategories } from "@/api/categories";
import { getSubcategories } from "@/api/subcategories";

import { getCurrencies } from "@/api/currencies";
import { getUsers } from "@/api/users";
import ManagementTable from "./ManagementTable.vue";
import { useRoute } from "vue-router";
import { getCountries } from "@/api/countries";
import ManagementForm from "./ManagementForm.vue";

const items = ref([])
const route = useRoute();

const mappingRoutesItems = [
  { func: getCountries, route: "countries" },
  { func: getCurrencies, route: "currencies" },
  { func: getCategories, route: "categories" },
  { func: getSubcategories, route: "subcategories" },
  { func: getUsers, route: "users" },
]

watch(
  () => route.path,
  async () => {
    if (route.path.startsWith("/management/")) {
      const currentItem = mappingRoutesItems.filter((routeItem) => route.path.includes(routeItem.route))[0]
      items.value = await currentItem.func()
      console.log("ITEMS : ", items.value)
    } else {
      items.value = []
    }
  },{immediate:true}
);


const handleAddItem = (item: Country | Category | Subcategory | Currency | User) => {
  items.value.unshift(item);
  // TODO: add to db
};
</script>
