import type { Prisma } from "@prisma/client";
import { subcategoryRepository } from "@repositories/subcategoriesRepository";
import { status, t } from "elysia";

export const subcategoriesController = {
  async getAll(categoryId?: string) {
    if (categoryId) {
          return { subcategories: await subcategoryRepository.getForCategory(categoryId) };
    }
    return { subcategories: await subcategoryRepository.getAll() };
  },

  async create(body: {categoryId	: string; label: string; id?: string}) {
    if (body) {
      try {
        const res = await subcategoryRepository.create(body);
        return {
          message: `Subcategory ${body.label} created`,
          data: res,
          status: status(201),
        };
      } catch (error) {
        return {
          status: status(400),
          message: `A subcategory with label "${body.label}" already exists.`,
        };
      }
    } else {
      return { message: "Subcategory is undefined", status: status(400) };
    }
  },
  async delete(id: string) {
    try {
      const res = await subcategoryRepository.delete(id);
      return {
        message: `Subcategory ${res.label} deleted`,
        data: res,
        status: status(200),
      };
    } catch (error) {
      return { message: error, status: status(400) };
    }
  },
  async update(id: string, subcategory: Prisma.SubcategoryUpdateInput) {
    const res = await subcategoryRepository.update(id, subcategory);
    return {
      message: `Subcategory ${subcategory.label} updated`,
      data: res,
      status: status(200),
    };
  },
};