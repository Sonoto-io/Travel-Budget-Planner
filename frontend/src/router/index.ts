import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import CountryView from "@/views/CountryView.vue";
import ManagementView from "@/views/ManagementView.vue";
import SettingsView from "@/views/SettingsView.vue";
import { useCountryStore } from "@/stores/countryStore";
import { getCountries } from "@/api/countries";
import LoginView from "@/views/LoginView.vue";
import { isAuthenticated, getTokenFromCode } from "@/services/login";

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
  {
    path: "/settings",
    name: "settings",
    component: SettingsView,
  },
  {
    path: "/finalize-authentication",
    name: "finalize-authentication",
    component: LoginView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach(async (to, _from, next) => {
  const authenticated = await isAuthenticated()

  if (to.name == 'finalize-authentication'
    && !authenticated
  ) {
    await getTokenFromCode(to.query.code as string)
    next({ name: 'dashboard' });
    return
  }

  if (!authenticated &&
      to.name !== 'login'
      && !to.fullPath.includes("/api")
    ) {
    next({ name: 'login' });
    return
  } else if (to.name == "login" && authenticated) {
    next({ name: 'dashboard' });
    return
  }
  if (to.name !== 'login' && authenticated) {
    const countryStore = useCountryStore();
    countryStore.countryList = (await getCountries());
    if (to.fullPath.startsWith("/country/") && to.params.shortname) {
      await countryStore.setCurrentCountryData(to.params.shortname);
    }
  }
  
  next();
});

export default router;
