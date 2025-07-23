import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import CountryView from "@/views/CountryView.vue";
import ManagementView from "@/views/ManagementView.vue";
import { useCountryStore } from "../stores/countryStore";
import { getCountries } from "../api/countries";

const routes = [
  {
    path: "/",
    name: "dashboard",
    component: HomeView,
  },
  {
    path: "/country/:shortname",
    name: "country",
    component: CountryView,
  },
  {
    path: "/management/:item",
    name: "management",
    component: ManagementView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, _from, next) => {
  if (to.fullPath.startsWith("/country/")) {
    const countryStore = useCountryStore();
    countryStore.countryList = (await getCountries());
    await countryStore.setCurrentCountryData(to.params.shortname);
  }

  next();
});

export default router;
