import { getConfig, setConfig } from "@/api/config";
import { getCurrencies } from "@/api/currencies";
import { defineStore } from "pinia";

export const useConfigStore = defineStore("config", {
  state: () => ({
    mainCurrency: {id: "", locale: "fr-FR", name: "EUR", label: "Euro", conversion: 1 },
    currencies: [] as Currency[],
    enableBackground: true,
    loaded: false,
  }),
  actions: {
    async initStore() {
      if (this.loaded) return;
      
      this.loaded = true;
      this.currencies = []
      try {
        this.currencies = await getCurrencies();
        await this.getConfig();
      } catch (err) {
        console.error("Failed to initialize currency:", err);
        this.currencies = [];
      }
    },
    async getConfig() {
      const config = await getConfig()
      if (config.currencyId) {
        this.mainCurrency = this.currencies.find(currency => currency.id === config.currencyId) || this.mainCurrency;
      }
      this.enableBackground = config.enableBackground ?? true
    },
    async saveConfig() {
      // Save the current configuration
      setConfig({
        currencyId: this.mainCurrency.id,
        enableBackground: this.enableBackground,
      })
    }
  },
});
