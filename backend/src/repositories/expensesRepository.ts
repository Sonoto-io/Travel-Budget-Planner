import { PrismaClient, type Expense, Prisma } from ".prisma/client";

const prisma = new PrismaClient();

export const expenseRepository = {
  getAll(options?: Prisma.ExpenseFindManyArgs): Promise<Expense[]> {
    return prisma.expense.findMany({
      include: {
        category: true,
        subcategory: true,
        user: true,
        currency: true,
        country: true,
      },
      orderBy: [
        { date: 'desc' },
        { order: 'desc' },
      ],
      ...options,
    })
  },
  async getNextOrderForDate(date: Date): Promise<number> {
    return prisma.expense.aggregate({
      _max: {
        order: true,
      },
      where: {
        date: date,
      },
    }).then(result => {
      return (result._max.order ?? 0) + 1;
    });
  },
  getForCountry(countryId: string): Promise<Array<Expense>> {
    return prisma.expense.findMany({
      where: { countryId: countryId }, include: {
        category: true,
        subcategory: true,
        user: true,
        currency: true,
        country: true,
      },
    })
  },
  async create(expense: Prisma.ExpenseCreateInput): Promise<Expense> {
    return await prisma.expense.create({
      data: {
        note: expense.note,
        price: expense.price,
        date: expense.date,
        order: expense.order,
        location: expense.location,
        country: { connect: { id: expense.country.id } },
        user: { connect: { id: expense.user.id } },
        category: { connect: { id: expense.category.id } },
        subcategory: { connect: { id: expense.subcategory.id } },
        currency: { connect: { id: expense.currency.id } },
        exception: expense.exception ?? false,
      }
    });
  },
  async update(expenseId: string, expense: Prisma.ExpenseUpdateInput) {
    return await prisma.expense.update({
      where: {
        id: expenseId,
      },
      data: {
        note: expense.note,
        price: expense.price,
        date: expense.date,
        order: expense.order,
        location: expense.location,
        country: { connect: { id: expense.country.id } },
        user: { connect: { id: expense.user.id } },
        category: { connect: { id: expense.category.id } },
        subcategory: { connect: { id: expense.subcategory.id } },
        currency: { connect: { id: expense.currency.id } },
        exception: expense.exception,
      }
    });
  },
  async delete(expenseId: string) {
    return await prisma.expense.delete({ where: { id: expenseId } });
  },
}
