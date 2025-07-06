<template>
  <div class="flex-column flex h-full w-full">
    <PanelMenu :model="items" class="w-full cursor-pointer">
      <template #item="{ item, props }">
        <router-link
          v-if="item.route"
          v-slot="{ href, navigate }"
          :to="item.route"
        >
          <a
            :href="href"
            class="flex h-10 items-center gap-2"
            v-bind="props.action"
            @click="navigate"
          >
            <span :class="item.icon" />
            <span>{{ item.label }}</span>
          </a>
        </router-link>
        <a
          v-else
          :href="item.url"
          :target="item.target"
          v-bind="props.action"
          class="flex h-10 items-center gap-2"
        >
          <span :class="item.icon" />
          <span>{{ item.label }}</span>
        </a>
      </template>
    </PanelMenu>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import PanelMenu from "primevue/panelmenu";
import { getCountries } from "@/api/countries";
import { useToast } from "primevue/usetoast";
import { useCountryStore } from "@/stores/countryStore";

const toast = useToast();
const route = useRoute();
const countryStore = useCountryStore()

const currentCountry = ref("Select a country")

const countryMenuItems = ref([])

watch(
  () => route.path,
  () => {
    if (route.path.startsWith("/country/")) {
      currentCountry.value = countryStore.currentCountry?.label ?? "Select a country"
    } else {
      return "Country Expenses";
    }
  }
)

onMounted(async () => {
  countryStore.countryList = (await getCountries()).data
  countryMenuItems.value = countryStore.countryList.map((country) =>  {
    country.route = `/country/${country.shortname}`
    return country
  })
  }
)

const updateCurrentCountry = (shortname: string) => {
}

const items = ref([
  {
    label: "Dashboard",
    icon: "pi pi-home",
    route: "/",
  },
  {
    label: currentCountry,
    icon: "pi pi-globe",
    items: countryMenuItems,
  },
  {
    label: "Management",
    icon: "pi pi-cog",
    items: [
      { label: "Categories", route: "/management/categories" },
      { label: "Countries", route: "/management/countries" },
      { label: "Currencies", route: "/management/currencies" },
    ],
  },
]);
</script>
