import { PrismaClient } from "@prisma/client";
import {
  categories,
  countries,
  currencies,
  subcategories,
  users,
} from "./default_data";

const prisma = new PrismaClient();

async function main() {
  // await prisma.country.deleteMany();
  // await prisma.currency.deleteMany();
  // await prisma.user.deleteMany();
  // await prisma.category.deleteMany();

  await prisma.currency.createMany({ skipDuplicates: true, data: currencies });
  await prisma.country.createMany({ skipDuplicates: true, data: countries });
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

main();
