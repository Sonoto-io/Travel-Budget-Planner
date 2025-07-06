import axios from "axios";
import type { Currency } from "../models/Currency";

export const getCurrencies = () => {
  return axios.get<Currency[]>("/api/currencies/");
};

export const getCurrency = (id: string) => {
  return axios.get<Currency>(`/api/currencies/${id}/`);
}
