import type { Category } from "@prisma/client";
import { categoryRepository } from "@repositories/CategoriesRepository";
import { t } from "elysia";

export const categoriesController = {
  getAll() {
    return categoryRepository.getAll();
  },
  create(body: CategoryUpsertModel) {
    const category = {
      name: body.name,
    };
    const res = categoryRepository.create(category);
    return { message: "Category created", data: res };
  },
  validateUpsertCategory: t.Object({
    name: t.String(),
  }),
  delete({ params: { id } }: IdParam) {
    const res = categoryRepository.delete(id);
    return { message: "Category deleted", data: res };
  },
  update(body: CategoryUpsertModel, { params: { id } }: IdParam) {
    const category = {
      id: id,
      name: body.name,
    };
    const res = categoryRepository.update(category);
    return { message: "Category updated", data: res };
  },
  validateIdParameter: t.Object({
    id: t.Numeric(),
  }),
};
