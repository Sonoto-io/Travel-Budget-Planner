import type { Prisma } from "@prisma/client";
import { configRepository } from "@repositories/configRepository";
import { status } from "elysia";

export const configController = {
  async get() {
    return { config: await configRepository.get() };
  },
  async update(config: Prisma.ConfigUpdateInput) {
    const res = configRepository.update(config);
    return {
      message: `Config updated`,
      data: res,
      status: status(200),
    };
  },
};
