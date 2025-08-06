import { PrismaClient, type Country, Prisma } from ".prisma/client";

const prisma = new PrismaClient();

export const countryRepository = {
  getAll(): Promise<Array<Country>> {
    return prisma.country.findMany();
  },
  async create(country: Prisma.CountryCreateInput) {
      return await prisma.country.create({ data: country });
    },
    async update(countryId: string, country: Prisma.CountryUpdateInput) {
      return await prisma.country.update({
        where: {
          id: countryId,
        },
        data: country,
      });
    },
    async delete(countryId: string) {
        return await prisma.country.delete({ where: { id: countryId } });
    },
}
