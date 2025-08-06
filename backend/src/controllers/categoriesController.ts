import type { Prisma } from "@prisma/client";
import { categoryRepository } from "@repositories/categoriesRepository";
import { status, t } from "elysia";

export const categoriesController = {
  async getAll() {
    return { categories: await categoryRepository.getAll() };
  },
  async create(body: Prisma.CategoryCreateInput) {
    if (body) {
      try {
        const res = await categoryRepository.create(body);
        return {
          message: `Category ${body.label} created`,
          data: res,
          status: status(201),
        };
      } catch (error) {
        return {
          status: status(400),
          message: `A category with label "${body.label}" already exists.`,
        };
      }
    } else {
      return { message: "Category is undefined", status: status(400) };
    }
  },
  validateCreateCategory: t.Object({
    id: t.Numeric(),
  }),

  async delete(id: string) {
    try {
      const res = await categoryRepository.delete(id);
      return {
        message: `Category ${res.label} deleted`,
        data: res,
        status: status(200),
      };
    } catch (error) {
      // Foreign key constraint
      if (error.code == "P2003") {
        return {
          message:
            "Please delete or change Category in associated subcategories and expenses before deleting this category",
          status: status(400),
        };
      }
      return { message: error, status: status(400) };
    }
  },
  async update(id: string, category: Prisma.CategoryUpdateInput) {
    const res = categoryRepository.update(id, category);
    return {
      message: `Category ${category.label} updated`,
      data: res,
      status: status(200),
    };
  },
};
