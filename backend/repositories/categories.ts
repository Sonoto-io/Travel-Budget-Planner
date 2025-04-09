import { PrismaClient, type Category } from "@prisma/client";

const prisma = new PrismaClient();

export default class CategoryRepository {
  async getAll(): Promise<Array<Category>> {
    return await prisma.category.findMany();
  }

  async create(category: Category) {
    return await prisma.category.create({ data: category });
  }
}
await prisma.category.findMany();

// count the number of users
const count = await prisma.user.count();
console.log(`There are ${count} users in the database.`);
