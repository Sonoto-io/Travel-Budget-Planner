import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import CountryView from "@/views/CountryView.vue";
import ManagementView from "@/views/ManagementView.vue";
import { useCountryStore } from "@/stores/countryStore";
import { getCountries } from "@/api/countries";
import LoginView from "@/views/LoginView.vue";
import { getToken } from "@/router/login";

const routes = [
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
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
  history: createWebHistory(),
  routes,
});


router.beforeEach(async (to, _from, next) => {
  const isAuthenticated = await getToken()

  console.log("isAuthenticated :", isAuthenticated);  

  if (!isAuthenticated &&
      to.name !== 'login'
      && !to.fullPath.includes("/api")
    ) {
    next({ name: 'login' });
    return
  } else if (to.name == "login" && isAuthenticated) {
    next({ name: 'dashboard' });
    return
  }
  if (to.name !== 'login' && isAuthenticated) {
    const countryStore = useCountryStore();
    countryStore.countryList = (await getCountries());
    if (to.fullPath.startsWith("/country/") && to.params.shortname) {
      await countryStore.setCurrentCountryData(to.params.shortname);
    }
  }
  

  next();
});

export default router;
