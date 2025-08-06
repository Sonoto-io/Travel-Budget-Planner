import { PrismaClient, type User, Prisma } from ".prisma/client";

const prisma = new PrismaClient();

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
