import { PrismaClient, type Category } from ".prisma/client";

const prisma = new PrismaClient();

export const categoryRepository = {
  async getAll(): Promise<Array<Category>> {
    return await prisma.category.findMany();
  },
  async create(category: CategoryCreateModel) {
    return await prisma.category.create({ data: category });
  },
  async update(category: Category) {
    return await prisma.category.update({
      where: {
        id: category.id,
      },
      data: {
        name: category.name,
      },
    });
  },
  async delete(categoryId: number) {
    return await prisma.category.delete({ where: { id: categoryId } });
  },
};
