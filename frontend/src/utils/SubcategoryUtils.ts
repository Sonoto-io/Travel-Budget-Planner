import { getSubCategories } from "@/api/subcategories";

export const fetchSubCategories = async (category: Category) => {
  if (!category) {
    return [];
  }
  const res = getSubCategories(category.id)
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      console.error("Error fetching subcategories:", error);
      return [];
    });

  return res;
};
