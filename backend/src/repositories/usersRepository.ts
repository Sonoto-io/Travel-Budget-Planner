import { type User, Prisma } from ".prisma/client";
import { prismaClient } from "./prismaClient";

const prisma = prismaClient;

export const userRepository = {
  getAll(): Promise<Array<User>> {
    return prisma.user.findMany();
  },
    async create(user: Prisma.UserCreateInput) {
      return await prisma.user.create({ data: user });
    },
    async update(userId: string, user: Prisma.UserUpdateInput) {
      return await prisma.user.update({
        where: {
          id: userId,
        },
        data: user,
      });
    },
    async delete(userId: string) {
        return await prisma.user.delete({ where: { id: userId } });
    },
}
