import { PrismaClient, type Expense, Prisma } from ".prisma/client";

const prisma = new PrismaClient();

export const expenseRepository = {
  getAll(): Promise<Array<Expense>> {
    return prisma.expense.findMany();
  },
  getForCountry(countryId:  string): Promise<Array<Expense>>{
    return prisma.expense.findMany({where: {countryId : countryId}})
  },
    async create(expense: Prisma.ExpenseCreateInput) {
      return await prisma.expense.create({ data: expense });
    },
    async update(expenseId: string, expense: Prisma.ExpenseUpdateInput) {
      return await prisma.expense.update({
        where: {
          id: expenseId,
        },
        data: expense,
      });
    },
    async delete(expenseId: string) {
        return await prisma.expense.delete({ where: { id: expenseId } });
    },
}
