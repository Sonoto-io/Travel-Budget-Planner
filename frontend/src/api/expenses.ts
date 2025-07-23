import axios from "axios";

export const getExpenses = (countryId: string | void) => {
  if (!countryId) {
    return axios
      .get("/api/expenses/")
      .then((response) => response.data.expenses)
      .catch((error: any) => {
        console.error("Error fetching expenses :", error);
        return [];
      });
  }
  return axios
    .get(`/api/expenses/?country_id=${countryId}`)
    .then((response) => response.data.expenses)
    .catch((error: any) => {
      console.error("Error fetching expenses :", error);
      return [];
    });
};

export const getExpensesSummary = (countryId: string | void) => {
  if (!countryId) {
    return axios
      .get("/api/expenses/summary")
      .then((response) => response.data.expenses_summary)
      .catch((error: any) => {
        console.error("Error fetching expenses summary :", error);
        return [];
      });
  }
  return axios
    .get(`/api/expenses/summary/?country_id=${countryId}`)
    .then((response) => response.data.expenses_summary)
    .catch((error: any) => {
      console.error("Error fetching expenses summary :", error);
      return [];
    });
};
