import { describe, expect, it, mock } from "bun:test";
import { api } from "../setup";
import type { Category, Prisma } from "@prisma/client";
import { categoriesFactory } from "../factories/categoryFactories";


mock.module("@/repositories/categoriesRepository.ts", () => ({
  categoryRepository: {
    async getAll(): Promise<Category[]> {
      return [categoriesFactory()];
    },
    async create(category: Prisma.CategoryCreateInput) {
      return categoriesFactory();
    },
    async update(categoryId: string, category: Prisma.CategoryUpdateInput) {
      return { ...categoriesFactory(), id: categoryId, ...category };
    },
    async delete(categoryId: string) {
      return { ...categoriesFactory(), id: categoryId };
    },
  },
}));


describe("Category", () => {
  it("creates a category successfully", async () => {
    const response = await api.categories.post({ label: "test" });
    expect(response.status).toBe(200);
    expect(response.data.message).toBe("Category test created");
  });

  it("retrieves all categories successfully", async () => {
    const response = await api.categories.get();
    expect(response.status).toBe(200);
    expect(response.data.categories).toBeArray();
  });

  it("updates a category successfully", async () => {
    const response = await api.categories["123"].post({
      label: "Updated",
    });
    expect(response.status).toBe(200);
    expect(response.data.message).toContain("updated");
  });
  
  it("deletes a category successfully", async () => {
    const response = await api.categories["123"].delete();
    expect(response.status).toBe(200);
    expect(response.data.message).toContain("deleted");
  });

});