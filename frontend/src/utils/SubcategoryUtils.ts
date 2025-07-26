import { getSubcategories } from "@/api/subcategories";

export const fetchSubCategories = async (category: Category) => {
  if (!category) {
    return [];
  }
  const res = getSubcategories(category.id).catch((error: any) => {
    console.error("Error fetching subcategories:", error);
    return [];
  });

  return res;
};
