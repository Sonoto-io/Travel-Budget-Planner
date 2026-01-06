import { type Currency, Prisma } from "@generated/client";
import { prismaClient } from "./prismaClient";

const prisma = prismaClient;

export const currencyRepository = {
  getAll(): Promise<Array<Currency>> {
    return prisma.currency.findMany();
  },
  get(id: string): Promise<Currency> {
    return prisma.currency.findUnique({where : {id: id}})
  },
  async create(currency: Prisma.CurrencyCreateInput) {
      return await prisma.currency.create({ data: currency });
    },
    async update(currencyId: string, currency: Prisma.CurrencyUpdateInput) {
      return await prisma.currency.update({
        where: {
          id: currencyId,
        },
        data: currency,
      });
    },
    async delete(currencyId: string) {
        return await prisma.currency.delete({ where: { id: currencyId } });
    },
}
