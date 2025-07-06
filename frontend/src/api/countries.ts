import axios from "axios";
import type { Country } from "@/models/Country";

export const getCountries = () => {
  return axios.get("/api/countries/");
};

export const getCountryByShortname = (countryShortname: string) => {
  return axios.get<Country>(`/api/countries/?country_shortname=${countryShortname}`);
};