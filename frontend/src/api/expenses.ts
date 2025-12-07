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

interface SummaryParams {
  countryId?: string;
  withExceptions?: boolean;
  startDate?: string;
  endDate?: string;
}

const createQueryParam = (params: SummaryParams): string => {
  let queryParam = "";
  if (params) {
    queryParam = Object.entries(params)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
    queryParam = queryParam ? `?${queryParam}` : "";
  }
  return queryParam;
}

export const getExpensesSummary = (params: SummaryParams) => {
  return api
    .get(`/expenses/summary/` + createQueryParam(params))
    .then((response) => response.data.expenses_summary)
    .catch((error: any) => {
      console.error("Error fetching expenses summary :", error);
      return [];
    });
};



export const getExpensesByUserSummary = (params: SummaryParams) => {
  
    return api
      .get("/expenses/summary/by-user" + createQueryParam(params))
      .then((response) => response.data.summaryByUser)
      .catch((error: any) => {
        console.error("Error fetching expenses summary by user:", error);
        return [];
      });
};

export const getExpensesByCountrySummary = (params: SummaryParams) => {
    return api
      .get("/expenses/summary/by-country" + createQueryParam(params))
      .then((response) => response.data.summaryByCountry)
      .catch((error: any) => {
        console.error("Error fetching expenses summary by country:", error);
        return [];
      });
};

