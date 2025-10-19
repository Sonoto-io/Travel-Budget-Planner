import { expenseRepository } from "@repositories/expensesRepository";
import { Prisma } from ".prisma/client";
import { status, t } from "elysia";
import { ExpensesSummaryService } from "@services/ExpensesSummaryService";

export const expensesController = {
  async getAll(countryId?: string) {
    if (countryId) {
      return {expenses: await expenseRepository.getForCountry(countryId)};
    }
    return {expenses: await expenseRepository.getAll()};
  },
  async getSummary(query : {countryId: string | undefined, withoutExceptions: boolean | undefined}): Promise<{ expenses_summary: ISummary; }> {
    let expenses
    let options = query.withoutExceptions ? {
      where: {
        exception: false
      }
    } : {}
    if (query.countryId){
      options = {
        ...options,
        where: {
          ...options.where,
          countryId: query.countryId
        }
      }
    }
    expenses = await expenseRepository.getAll(options)      


    const summary = ExpensesSummaryService.calculateSummary(expenses);
    if (!summary) {
      return { message: "No expenses found", status: status(404) };
    }
    return {
      expenses_summary : summary
    }
  },
  async getSummaryByCountry(query: {withoutExceptions?: boolean}) {
    let options = query.withoutExceptions ? {
      where: {
        exception: false
      }
    } : {}
    const expenses = await expenseRepository.getAll(options)
    return {summaryByCountry: await ExpensesSummaryService.getSummaryByCountry(expenses)};
  },
  async getSummaryByUser(query: {year?: number, month?: number, day?: number, withoutExceptions?: boolean}) {
    const sinceDate = new Date(0, 0, 1, 0, 0, 1);
    const endDate = new Date("9999-01-01");

    // Set start and ending dates if needed
    // TODO: clean conditions for dates : year or year + month or year + month + day
    if (query.year) {
      sinceDate.setFullYear(query.year)
      endDate.setFullYear(query.year + 1)
    }
    if (query.month) {
      sinceDate.setMonth(query.month - 1) // Months are 0-indexed
      endDate.setMonth(query.month) // Next month
      endDate.setFullYear(query.year? query.year : sinceDate.getFullYear())
    }
    if (query.day) {
      sinceDate.setDate(query.day)
      endDate.setDate(query.day + 1)
      endDate.setFullYear(query.year ?? sinceDate.getFullYear())
      endDate.setMonth(query.month ?? sinceDate.getMonth())

    }


    const expenses = await expenseRepository.getAll({
      where: {
        date: {
          gte: sinceDate,
          lte: endDate,
        },
        ...(query.withoutExceptions ? { exception: false } : {})
      },
    });
    return {summaryByUser: await ExpensesSummaryService.getSummaryByUser(expenses)};
  },
  async create(body: Prisma.ExpenseCreateInput) {
    if (body) {
      try {
        const res = { expense: await expenseRepository.create(body)};
        return {
          message: `Expense created`,
          data: res,
          status: status(201),
        };
      } catch (error) {
        return {
          status: status(400),
          message: `A error occured when creating an expense : ${error}`,
        };
      }
    } else {
      return { message: "Expense is undefined", status: status(400) };
    }
  },

  async delete(id: string) {
    try {
      const res = await expenseRepository.delete(id);
      return {
        message: `Expense deleted`,
        data: res,
        status: status(200),
      };
    } catch (error) {      
      return { message: error, status: status(400) };
    }
  },
  async update(id: string, expense: Prisma.ExpenseUpdateInput) {
    const res = expenseRepository.update(id, expense);
    return {
      message: `Expense updated`,
      data: res,
      status: status(200),
    };
  },
}