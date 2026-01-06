import { type Config, Prisma } from "@generated/client";
import { prismaClient } from "./prismaClient";

const prisma = prismaClient;

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
