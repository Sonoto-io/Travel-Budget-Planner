import api from "@/api/apiClient";

export const getCurrencies = () => {
  return api
    .get("/currencies/")
    .then((response) => response.data.currencies)
    .catch((error: any) => {
      console.error("Error fetching currencies :", error);
      return [];
    });
};

export const getCurrency = (id: string) => {
  return api
    .get(`/currencies/${id}/`)
    .then((response) => response.data.currency)
    .catch((error: any) => {
      console.error("Error fetching currency :", error);
      return [];
    });
};

export const createCurrency = (currencyData: Partial<Currency>) => {
  return api
    .post("/currencies", currencyData)
    .then((response) => response.data)
    .catch((error: any) => {
      console.error("Error creating a currency:", error);
      return error;
    });
};

export const updateCurrency = (currencyData: Currency) => {
  return api
    .post(`/currencies/${currencyData.id}`, currencyData)
    .then((response) => response.data)
    .catch((error: any) => {
      console.error("Error updating a currency:", error);
      return error;
    });
};

export const deleteCurrency = (currencyId: string) => {
  return api
    .delete(`/currencies/${currencyId}`)
    .then((response) => response.data)
    .catch((error: any) => {
      console.error("Error deleting a currency:", error);
      return error;
    });
};
