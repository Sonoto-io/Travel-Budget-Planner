import { expenseRepository } from "@repositories/expensesRepository";
import { Prisma } from ".prisma/client";
import { status } from "elysia";
import { ExpensesSummaryService } from "@services/ExpensesSummaryService";

export const expensesController = {
  async getAll(countryId?: string) {
    if (countryId) {
      return {expenses: await expenseRepository.getForCountry(countryId)};
    }
    return {expenses: await expenseRepository.getAll()};
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

  // SUMMARIES ---------------------
  async getSummary(query : SummaryQuery): Promise<{ expenses_summary: ISummary; } > {
    const expenses = await ExpensesSummaryService.getExpensesWithFilters(query)
        
    return { expenses_summary : ExpensesSummaryService.calculateSummary(expenses) }
  },
  async getSummaryByCountry(query: SummaryQuery) {
    const expenses = await ExpensesSummaryService.getExpensesWithFilters(query)

    return {summaryByCountry: await ExpensesSummaryService.getSummaryByCountry(expenses)};
  },
  async getSummaryByUser(query: SummaryQuery) {
    const expenses = await ExpensesSummaryService.getExpensesWithFilters(query)

    return {summaryByUser: await ExpensesSummaryService.getSummaryByUser(expenses)};
  },
  
}