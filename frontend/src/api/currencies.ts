import axios from "axios";

export const getCurrencies = () => {
  return axios
    .get("/api/currencies/")
    .then((response) => response.data.currencies)
    .catch((error: any) => {
      console.error("Error fetching currencies :", error);
      return [];
    });
};

export const getCurrency = (id: string) => {
  return axios
    .get(`/api/currencies/${id}/`)
    .then((response) => response.data.currency)
    .catch((error: any) => {
      console.error("Error fetching currency :", error);
      return [];
    });
};

export const createCurrency = (currencyData: Partial<Currency>) => {
  return axios
    .post("/api/currencies", currencyData)
    .then((response) => response.data)
    .catch((error: any) => {
      console.error("Error creating a currency:", error);
      return error;
    });
};

export const updateCurrency = (currencyData: Currency) => {
  return axios
    .post(`/api/currencies/${currencyData.id}`, currencyData)
    .then((response) => response.data)
    .catch((error: any) => {
      console.error("Error updating a currency:", error);
      return error;
    });
};

export const deleteCurrency = (currencyId: string) => {
  return axios
    .delete(`/api/currencies/${currencyId}`)
    .then((response) => response.data)
    .catch((error: any) => {
      console.error("Error deleting a currency:", error);
      return error;
    });
};
