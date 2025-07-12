import axios from "axios";

export const getExpenses = (countryId: string | void) => {
  if (!countryId) {
    return axios.get("/api/expenses/")
  }
  return axios.get(`/api/expenses/?country_id=${countryId}`)
};


export const getExpensesSummary = (countryId: string | void) => {
  if (!countryId) {
    return axios.get("/api/expenses/summary")
  }
  return axios.get(`/api/expenses/summary/?country_id=${countryId}`)
};
