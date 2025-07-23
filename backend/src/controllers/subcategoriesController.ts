import { subcategoryRepository } from "@repositories/subcategoriesRepository";

export const subcategoriesController = {
  async getAll() {
    return {subcategories: await subcategoryRepository.getAll()};
  },
}