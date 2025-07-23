import axios, { type AxiosResponse } from "axios";

export const getCategories = () => {
  return axios
    .get("/api/categories/")
    .then((response) => response.data.categories)
    .catch((error: any) => {
      console.error("Error fetching categories:", error);
      return [];
    });
};
