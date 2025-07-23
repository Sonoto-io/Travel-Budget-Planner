import { PrismaClient, type User } from ".prisma/client";

const prisma = new PrismaClient();

export const userRepository = {
  getAll(): Promise<Array<User>> {
    return prisma.user.findMany();
  },
}
