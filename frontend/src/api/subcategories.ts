import axios from "axios";

export const getSubcategories = (categoryId?: string) => {
  console.log("FETCH SUBCATEGORIES")
  return axios
    .get(`/api/subcategories/?category_id=${categoryId}`)
    .then((response) => response.data.subcategories)
    .catch((error: any) => {
      console.error("Error fetching subcategories :", error);
      return [];
    });
};

export const createSubcategory = (subcategoryData: Partial<any>) => {
  return axios
    .post("/api/subcategories", subcategoryData)
    .then((response) => response.data)
    .catch((error: any) => {
      console.error("Error creating a subcategory:", error);
      return error;
    });
};

export const updateSubcategory = (subcategory: any) => {
  return axios
    .post(`/api/subcategories/${subcategory.id}`, subcategory)
    .then((response) => response.data)
    .catch((error: any) => {
      console.error("Error updating a subcategory:", error);
      return error;
    });
};

export const deleteSubcategory = (subcategoryId: string) => {
  return axios
    .delete(`/api/subcategories/${subcategoryId}`)
    .then((response) => response.data)
    .catch((error: any) => {
      console.error("Error deleting a subcategory:", error);
      return error;
    });
};
