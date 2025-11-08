import { createApp } from "vue";
import "./assets/styles/global.css";
import "./assets/styles/components.css";

import App from "./App.vue";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import ToastService from "primevue/toastservice";
import { worker } from "./mocks/worker";
import router from "@/router";
import { pinia } from "@/pinia";
import ConfirmationService from 'primevue/confirmationservice';

async function main() {
  console.log("ENV : ", import.meta.env);
  if (import.meta.env.DEV && import.meta.env.VITE_MOCKS_ENABLED == "true") {
    console.log("Starting MSW worker in development mode");
    await worker.start();
  }
  const app = createApp(App);
  app.use(PrimeVue, {
    theme: {
      preset: Aura,
    },
  });

  app.use(pinia);
  app.use(router);
  app.use(ToastService);
  app.use(ConfirmationService);
  app.mount("#app");
}

main();
