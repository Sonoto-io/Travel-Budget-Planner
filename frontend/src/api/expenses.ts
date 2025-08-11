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
    .get(`/api/expenses/?countryId=${countryId}`)
    .then((response) => response.data.expenses)
    .catch((error: any) => {
      console.error("Error fetching expenses :", error);
      return [];
    });
};

export const createExpense = (expenseData: Partial<Expense>) => {
    return axios
      .post("/api/expenses/", expenseData)
      .then((response) => response.data)
      .catch((error: any) => {
        console.error("Error creating expense :", error);
        return error;
      });

};

export const updateExpense = (expenseData: Partial<Expense>) => {
    return axios
      .post(`/api/expenses/${expenseData.id}`, expenseData)
      .then((response) => response.data)
      .catch((error: any) => {
        console.error("Error updating expense :", error);
        return error;
      });

};

export const deleteExpense = (expenseId: string) => {
    return axios
      .delete(`/api/expenses/${expenseId}`)
      .then((response) => response.data)
      .catch((error: any) => {
        console.error("Error deleting expense :", error);
        return error;
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
    .get(`/api/expenses/summary/?countryId=${countryId}`)
    .then((response) => response.data.expenses_summary)
    .catch((error: any) => {
      console.error("Error fetching expenses summary :", error);
      return [];
    });
};
