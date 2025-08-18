import { PrismaClient, type Country, Prisma } from ".prisma/client";

const prisma = new PrismaClient()
  .$extends({
      result: {
        country: {
          total_expected_expense: {
            needs: { count_days: true, daily_expected_expenses: true },
            compute(country) {
              return country.count_days * country.daily_expected_expenses;
            },
          },
        },
      },
    })

export const countryRepository = {
  getAll(): Promise<Array<Country>> {
    return prisma.country.findMany({orderBy: { order: "desc" }});
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
