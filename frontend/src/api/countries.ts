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

export const createCountry = (countryData: Partial<any>) => {
  return axios
    .post("/api/countries", countryData)
    .then((response) => response.data)
    .catch((error: any) => {
      console.error("Error creating a country:", error);
      return error;
    });
};

export const updateCountry = (country: any) => {
  return axios
    .post(`/api/countries/${country.id}`, country)
    .then((response) => response.data)
    .catch((error: any) => {
      console.error("Error updating a country:", error);
      return error;
    });
};

export const deleteCountry = (countryId: string) => {
  return axios
    .delete(`/api/countries/${countryId}`)
    .then((response) => response.data)
    .catch((error: any) => {
      console.error("Error deleting a country:", error);
      return error;
    });
};
