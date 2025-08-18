<template>
  <div class="flex flex-col gap-4 overflow-x-scroll">
    <div class="">
      <ManagementForm :items="items" :itemType="itemType"
      @addItem="handleAddItem"/>
    </div>
    <div>
      <ManagementTable  v-model="items" :itemType="itemType"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

import ManagementTable from "./ManagementTable.vue";
import { useRoute } from "vue-router";
import ManagementForm from "./ManagementForm.vue";
import type { Item } from "@/models/Item";
import { handleItemAction } from "@/utils/ItemsUtils";

const items = ref([])
const itemType = ref("category")
const route = useRoute();

const mappingRoutesItems = [
  { route: "countries", type: "country" },
  { route: "currencies", type: "currency" },
  { route: "categories" , type: "category"}, 
  { route: "subcategories", type: "subcategory" },
  { route: "users", type: "user" },
]

watch(
  () => route.path,
  async () => {
  
    if (route.path.startsWith("/management/")) {
      const currentItem = mappingRoutesItems.filter((routeItem) => route.path.endsWith(`/${routeItem.route}`))[0]
      items.value = await handleItemAction(currentItem.type, "get")
      itemType.value = currentItem.type
    } else {
      items.value = []
    }
  },{immediate:true}
);


const handleAddItem = (item: Item) => {
  items.value.unshift(item);
};
</script>
