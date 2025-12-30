import { PrismaClient, type Config, Prisma } from ".prisma/client";

const prisma = new PrismaClient();

export const configRepository = {
  async get(): Promise<Config> {
    return await prisma.config.findUnique({ where: { id: 1 } }) ?? {} as Config;
  },
    async update(config: Prisma.ConfigUpdateInput) {
      return await prisma.config.update({
        where: { id: 1 },
        data: config,
      });
    },
}
