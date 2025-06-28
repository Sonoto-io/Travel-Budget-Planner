import { createApp } from "vue";
import "./assets/styles/global.css";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import ToastService from "primevue/toastservice";
import { worker } from "./mocks/worker";
import router from "./router";

async function main() {
  if (import.meta.env.DEV) {
    console.log("Starting MSW worker in development mode");
    await worker.start()
  }

  const app = createApp(App);
  app.use(PrimeVue, {
    theme: {
      preset: Aura,
    },
  });
  app.use(ToastService);
  app.use(router);
  app.mount("#app");
}

main()