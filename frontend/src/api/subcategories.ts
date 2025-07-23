import axios from "axios";

export const getSubCategories = (categoryId: string) => {
  return axios
    .get(`/api/subcategories/?category_id=${categoryId}`)
    .then((response) => response.data.subcategories)
    .catch((error: any) => {
      console.error("Error fetching subcategories :", error);
      return [];
    });
};
