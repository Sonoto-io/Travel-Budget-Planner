import { PrismaClient, type Expense } from ".prisma/client";

const prisma = new PrismaClient();

export const expenseRepository = {
  getAll(): Promise<Array<Expense>> {
    return prisma.expense.findMany();
  },
  getForCountry(countryId:  string): Promise<Array<Expense>>{
    return prisma.expense.findMany({where: {countryId : countryId}})
  }
}
