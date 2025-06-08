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
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import PanelMenu from "primevue/panelmenu";

const router = useRouter();
const route = useRoute();

const countryList = [
  { label: "France", route: "/country/fr", code: "fr" },
  { label: "Germany", route: "/country/de", code: "de" },
  { label: "Japan", route: "/country/jp", code: "jp" },
];

const currentCountry = computed(() => {
  console.log(route.path);
  if (route.path.includes("/country/")) {
    const country = countryList.filter(
      (country) => country.code == route.params.code,
    );
    if (country.length == 1) {
      return country.pop().label;
    }
  } else {
    return "Country Expenses";
  }
}); // TODO get from store and then get from url / router path

const items = ref([
  {
    label: "Dashboard",
    icon: "pi pi-home",
    route: "/",
  },
  {
    label: currentCountry,
    icon: "pi pi-globe",
    items: [
      {
        label: "France",
        route: "/country/fr",
      },
      { label: "Germany", route: "/country/de" },
      { label: "Japan", route: "/country/jp" },
    ],
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
