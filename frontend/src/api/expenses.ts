import axios from "axios";

export const getExpenses = (countryId: string) => {
  return axios.get(`/api/expenses/?country_id=${countryId}`)
};
