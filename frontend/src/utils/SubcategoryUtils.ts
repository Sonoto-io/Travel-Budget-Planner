// TODO : fetch from db where category name == category
export const fetchSubCategories = (categoryName: string) => {
  return [{ label: `${categoryName} sub` }];
};
