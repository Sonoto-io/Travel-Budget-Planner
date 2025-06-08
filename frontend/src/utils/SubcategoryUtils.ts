// TODO : fetch from db where category name == category
export const fetchSubCategories = (category: string) => {
  return [{ label: `${category} sub` }];
};
