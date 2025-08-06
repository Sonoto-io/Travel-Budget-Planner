import { PrismaClient, type Category, Prisma } from ".prisma/client";

const prisma = new PrismaClient();

export const categoryRepository = {
  getAll(): Promise<Array<Category>> {
    return prisma.category.findMany({orderBy: { label: "asc" } });
  },
  async create(category: Prisma.CategoryCreateInput) {
    return await prisma.category.create({ data: category });
  },
  async update(categoryId: string, category: Prisma.CategoryUpdateInput) {
    return await prisma.category.update({
      where: {
        id: categoryId,
      },
      data: category,
    });
  },
  async delete(categoryId: string) {
      return await prisma.category.delete({ where: { id: categoryId } });
  },
};
