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

export const createCategory = (categoryData : Partial<Category>) => {
  return axios.post("/api/categories", categoryData)
  .then((response) => response.data)
    .catch((error: any) => {
      console.error("Error creating a category:", error);
      return error;
    });
}

export const deleteCategory = (categoryId: string) => {
  return axios.delete(`/api/categories/${categoryId}`)
  .then((response) => response.data)
    .catch((error: any) => {
      console.error("Error when deleting a category:", error);
      return error;
    });
}


export const updateCategory = (category: Category) => {
  return axios.post(`/api/categories/${category.id}`, category)
  .then((response) => response.data)
    .catch((error: any) => {
      console.error("Error when deleting a category:", error);
      return error;
    });
}