import { PrismaClient, type Currency } from ".prisma/client";

const prisma = new PrismaClient();

export const currencyRepository = {
  getAll(): Promise<Array<Currency>> {
    return prisma.currency.findMany();
  },
  get(id: string): Promise<Currency> {
    return prisma.currency.findUnique({where : {id: id}})
  },
}
