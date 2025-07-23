import axios from "axios";

export const getCountries = () => {
  return axios
    .get("/api/countries/")
    .then((response) => response.data.countries)
    .catch((error: any) => {
      console.error("Error fetching countries :", error);
      return [];
    });
};

export const getCountryByShortname = (countryShortname: string) => {
  return axios
    .get(`/api/countries/?country_shortname=${countryShortname}`)
    .then((response) => response.data.country)
    .catch((error: any) => {
      console.error("Error fetching countries :", error);
      return [];
    });
};
