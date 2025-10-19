import api from "@/api/apiClient";

export const getSubcategories = (categoryId?: string) => {
  if (!categoryId) {
    return api
      .get("/subcategories/")
      .then((response) => response.data.subcategories)
      .catch((error: any) => {
        console.error("Error fetching subcategories :", error);
        return error;
      });
  }
  return api
    .get(`/subcategories/?categoryId=${categoryId}`)
    .then((response) => response.data.subcategories)
    .catch((error: any) => {
      console.error("Error fetching subcategories :", error);
      return [];
    });
};

export const createSubcategory = (subcategoryData: Partial<any>) => {
  return api
    .post("/subcategories", subcategoryData)
    .then((response) => response.data)
    .catch((error: any) => {
      console.error("Error creating a subcategory:", error);
      return error;
    });
};

export const updateSubcategory = (subcategory: any) => {
  return api
    .post(`/subcategories/${subcategory.id}`, subcategory)
    .then((response) => response.data)
    .catch((error: any) => {
      console.error("Error updating a subcategory:", error);
      return error;
    });
};

export const deleteSubcategory = (subcategoryId: string) => {
  return api
    .delete(`/subcategories/${subcategoryId}`)
    .then((response) => response.data)
    .catch((error: any) => {
      console.error("Error deleting a subcategory:", error);
      return error;
    });
};
