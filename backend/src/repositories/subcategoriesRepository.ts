import { PrismaClient, type Subcategory, Prisma } from ".prisma/client";

const prisma = new PrismaClient();

export const subcategoryRepository = {
  getAll(): Promise<Array<Subcategory>> {
    return prisma.subcategory.findMany();
  },
  async create(category: {categoryId	: string; label: string; id?: string}) {
      return await prisma.subcategory.create({ data: category });
    },
    async update(subcategoryId: string, subcategory: Prisma.SubcategoryUpdateInput) {
      return await prisma.subcategory.update({
        where: {
          id: subcategoryId,
        },
        data: subcategory,
      });
    },
    async delete(subcategoryId: string) {
        return await prisma.subcategory.delete({ where: { id: subcategoryId } });
    },
}
