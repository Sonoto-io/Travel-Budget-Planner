import { PrismaClient, type Country } from ".prisma/client";

const prisma = new PrismaClient();

export const countryRepository = {
  getAll(): Promise<Array<Country>> {
    return prisma.country.findMany();
  },
}
