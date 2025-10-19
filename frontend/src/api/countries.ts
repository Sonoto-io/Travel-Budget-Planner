import api from "@/api/apiClient";

export const getCountries = () => {
  return api
    .get("/countries/")
    .then((response) => response.data.countries)
    .catch((error: any) => {
      console.error("Error fetching countries :", error);
      return [];
    });
};

export const getCountryByShortname = (countryShortname: string) => {
  return api
    .get(`/countries/?country_shortname=${countryShortname}`)
    .then((response) => response.data.country)
    .catch((error: any) => {
      console.error("Error fetching countries :", error);
      return [];
    });
};

export const createCountry = (countryData: Partial<Country>) => {
  return api
    .post("/countries", countryData)
    .then((response) => response.data)
    .catch((error: any) => {
      console.error("Error creating a country:", error);
      return error;
    });
};

export const updateCountry = (country: Country) => {
  return api
    .post(`/countries/${country.id}`, country)
    .then((response) => response.data)
    .catch((error: any) => {
      console.error("Error updating a country:", error);
      return error;
    });
};

export const deleteCountry = (countryId: string) => {
  return api
    .delete(`/countries/${countryId}`)
    .then((response) => response.data)
    .catch((error: any) => {
      console.error("Error deleting a country:", error);
      return error;
    });
};
