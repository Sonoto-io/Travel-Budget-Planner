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
