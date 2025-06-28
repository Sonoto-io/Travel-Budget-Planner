import axios from "axios";

export const getCurrencies = () => {
  return axios.get("/api/currencies/");
};
