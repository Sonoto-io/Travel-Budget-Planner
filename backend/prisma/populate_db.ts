import { PrismaClient } from "@generated/client";
import {
  categories,
  country,
  currencies,
  subcategories,
  users,
} from "./default_data";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({
  adapter
});

async function main() {
  const countryExists = await prisma.country.findFirst({where: {label: country.label}});

  if (countryExists === null) {
    await prisma.currency.createMany({ skipDuplicates: true, data: currencies });
    const createdCurrency = await prisma.currency.findFirst({where: { label: "Euro" } });
    const countryWithCurrency = {
      ...country,
      currencyId: createdCurrency?.id ?? "",
    }
    try {
      await prisma.country.create({ data: countryWithCurrency });
    }catch {
      console.log("Country already exists, skipping creation.");
    }
    await prisma.category.createManyAndReturn({
      skipDuplicates: true,
      data: categories,
    });
    await prisma.user.createMany({ skipDuplicates: true, data: users });
    const createdCategory = await prisma.category.findFirst({where: {label: "Transport"}})
    await prisma.subcategory.createMany({
      skipDuplicates: true,
      data: subcategories.map((subcat) => {
        subcat.categoryId = createdCategory?.id ?? "";
        return subcat;
      }),
    });
  }
}

main();
