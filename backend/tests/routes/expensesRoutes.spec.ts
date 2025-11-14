import { describe, expect, it, mock } from "bun:test";
import { api } from "../setup";
import type { Expense, Prisma } from "@prisma/client";
import { expensesFactory } from "../factories/expenseFactories";

mock.module("@/repositories/expensesRepository.ts", () => ({
  expenseRepository: {
    async getAll(options?: Prisma.ExpenseFindManyArgs): Promise<Array<Expense>> {
      return [expensesFactory()]
    },
    async getForCountry(countryId: string): Promise<Array<Expense>> {
      return [expensesFactory({country: { id: countryId }})]
    },
    async create(expense: Prisma.ExpenseCreateInput): Promise<Expense> {
      return expensesFactory({...expense})
    },
    async update(expenseId: string, expense: Prisma.ExpenseUpdateInput) {
      return expensesFactory({ id: expenseId, ...expense })
    },
    async delete(expenseId: string) {
      return expensesFactory({ id: expenseId })
    }
  }
}))




describe("Expense", () => {
  it("creates an expense successfully", async () => {
    const response = await api.expenses.post(expensesFactory({ price: 150.75, note: "New Expense" }));
    expect(response.status).toBe(200);
    expect(response.data.message).toBe("Expense created");
    expect(response.data.data.expense.price).toBe(150.75);
    expect(response.data.data.expense.note).toBe("New Expense")
  });

  it("retrieves all expenses successfully", async () => {
    const response = await api.expenses.get();
    expect(response.status).toBe(200);
    expect(response.data.expenses).toBeArray();
  });

  it("updates an expense successfully", async () => {
    const response = await api.expenses["123"].post({
      price: 1234,
      date: new Date()
    });
    console.log(response.error)
    expect(response.status).toBe(200);
    expect(response.data.message).toBe("Expense updated");
  });
  
  it("deletes an expense successfully", async () => {
    const response = await api.expenses["123"].delete();
    expect(response.status).toBe(200);
    expect(response.data.message).toBe("Expense deleted");
  });

  // Summaries

  // TODO: after summary refacto, do tests
});