import axios from "axios";

export const getSubCategories = (categoryId: string) => {
  return axios.get<Subcategory[]>(
    `/api/subcategories/?category_id=${categoryId}`,
  );
};
