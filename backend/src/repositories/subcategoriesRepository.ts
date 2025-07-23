import { PrismaClient, type Subcategory } from ".prisma/client";

const prisma = new PrismaClient();

export const subcategoryRepository = {
  getAll(): Promise<Array<Subcategory>> {
    return prisma.subcategory.findMany();
  },
}
