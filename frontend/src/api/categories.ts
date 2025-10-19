import api from "@/api/apiClient";


export const getCategories = () => {
  return api
    .get("categories/")
    .then((response) => response.data.categories)
    .catch((error: any) => {
      console.error("Error fetching categories:", error);
      return [];
    });
};

export const createCategory = (categoryData : Partial<Category>) => {
  return api.post("categories", categoryData)
    .then((response) => response.data)
    .catch((error: any) => {
      console.error("Error creating a category:", error);
      return error;
    });
}

export const deleteCategory = (categoryId: string) => {
  return api.delete(`categories/${categoryId}`)
    .then((response) => response.data)
    .catch((error: any) => {
      console.error("Error when deleting a category:", error);
      return error;
    });
}


export const updateCategory = (category: Category) => {
  return api.post(`categories/${category.id}`, category)
    .then((response) => response.data)
    .catch((error: any) => {
      console.error("Error when deleting a category:", error);
      return error;
    });
}