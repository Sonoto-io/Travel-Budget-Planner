import { PrismaClient, type Country, Prisma } from "@generated/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({adapter})
  .$extends({
      result: {
        country: {
          total_expected_expense: {
            needs: { expected_count_days: true, expected_daily_expenses: true },
            compute(country) {
              return country.expected_count_days * country.expected_daily_expenses;
            },
          },
        },
      },
    })

export const countryRepository = {
  getAll(): Promise<Array<Country>> {
    return prisma.country.findMany({orderBy: { order: "asc" }});
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
