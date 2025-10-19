import api from "@/api/apiClient";

export const getExpenses = (countryId: string | void) => {
  if (!countryId) {
    return api
      .get("/expenses/")
      .then((response) => response.data.expenses)
      .catch((error: any) => {
        console.error("Error fetching expenses :", error);
        return [];
      });
  }
  return api
    .get(`/expenses/?countryId=${countryId}`)
    .then((response) => response.data.expenses)
    .catch((error: any) => {
      console.error("Error fetching expenses :", error);
      return [];
    });
};

export const createExpense = (expenseData: Partial<Expense>) => {
    return api
      .post("/expenses/", expenseData)
      .then((response) => response.data)
      .catch((error: any) => {
        console.error("Error creating expense :", error);
        return error;
      });

};

export const updateExpense = (expenseData: Partial<Expense>) => {
    return api
      .post(`/expenses/${expenseData.id}`, expenseData)
      .then((response) => response.data)
      .catch((error: any) => {
        console.error("Error updating expense :", error);
        return error;
      });

};

export const deleteExpense = (expenseId: string) => {
    return api
      .delete(`/expenses/${expenseId}`)
      .then((response) => response.data)
      .catch((error: any) => {
        console.error("Error deleting expense :", error);
        return error;
      });

};


export const getExpensesSummary = (countryId: string | void) => {
  if (!countryId) {
    return api
      .get("/expenses/summary")
      .then((response) => response.data.expenses_summary)
      .catch((error: any) => {
        console.error("Error fetching expenses summary :", error);
        return [];
      });
  }
  return api
    .get(`/expenses/summary/?countryId=${countryId}`)
    .then((response) => response.data.expenses_summary)
    .catch((error: any) => {
      console.error("Error fetching expenses summary :", error);
      return [];
    });
};
