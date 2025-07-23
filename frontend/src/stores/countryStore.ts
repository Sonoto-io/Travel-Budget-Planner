import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { getCurrency } from "@/api/currencies";
import type { Country } from "@/models/Country";

export const useCountryStore = defineStore("countries", () => {
  const countryList = ref([]);
  const currentCountry = ref();
  const currentMainCurrency = ref();
  const ready = ref(false);

  async function setCurrentCountryData(countryShortname: string) {
    if (countryList.value.length > 0) {
      currentCountry.value = countryList.value.filter(
        (country: Country) => country.shortname == countryShortname,
      )[0];
      currentMainCurrency.value = await getCurrency(
        currentCountry.value.main_currency,
      );
      ready.value = true;
    }
  }

  const isCurrentCountrySet = computed(() => {
    return currentCountry.value != undefined;
  });

  return {
    countryList,
    currentCountry,
    currentMainCurrency,
    ready,
    setCurrentCountryData,
    isCurrentCountrySet,
  };
});
