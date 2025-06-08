import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import CountryView from "@/views/CountryView.vue";
import ManagementView from "@/views/ManagementView.vue";
const routes = [
  {
    path: "/",
    name: "dashboard",
    component: HomeView,
  },
  {
    path: "/country/:code",
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

export default router;
