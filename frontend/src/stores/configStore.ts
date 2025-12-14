import { getCurrencies } from "@/api/currencies";
import { defineStore } from "pinia";

export const useConfigStore = defineStore("config", {
  state: () => ({
    main_currency: {id: "", locale: "fr-FR", name: "EUR", label: "Euro", conversion: 1 },
    currencies: [] as Currency[],
    loaded: false,
  }),
  actions: {
    async initMaincurrency() {
      if (this.loaded) return;
      const currencyName = import.meta.env.VITE_MAIN_CURRENCY_NAME ?? "EUR"
      this.loaded = true;
      this.currencies = []
      // this.main_currency = {id: "", locale: "fr-FR", name: "EUR", label: "Euro", conversion: 1 };
      try {
        this.currencies = await getCurrencies();
        this.main_currency =
          this.currencies.find(
            (currency) => currency.name === currencyName
          ) || this.main_currency;
      } catch (err) {
        console.error("Failed to initialize currency:", err);
        this.currencies = [];
      }
    },
  },
});
