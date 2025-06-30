import axios, { type AxiosResponse } from "axios";

export const getCategories = () => {
  return axios.get("/api/categories/");
};
