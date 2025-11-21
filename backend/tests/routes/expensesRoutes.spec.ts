import { describe, expect, it, mock } from "bun:test";
import { api } from "../setup";
import type { Expense, Prisma } from "@prisma/client";
import { DEFAULT_PRICE, expensesFactory } from "../factories/expenseFactories";

mock.module("@/repositories/expensesRepository.ts", () => ({
  expenseRepository: {
    async getAll(): Promise<Array<Expense>> {
      return [expensesFactory()]
    },
    async getForCountry(countryId: string): Promise<Array<Expense>> {
      return [expensesFactory({ country: { id: countryId } })]
    },
    async create(expense: Prisma.ExpenseCreateInput): Promise<Expense> {
      return expensesFactory({ ...expense })
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
    expect(response.status).toBe(200);
    expect(response.data.message).toBe("Expense updated");
  });

  it("deletes an expense successfully", async () => {
    const response = await api.expenses["123"].delete();
    expect(response.status).toBe(200);
    expect(response.data.message).toBe("Expense deleted");
  });
});


describe("Expenses Summary", () => {
  mock.module("@/repositories/countriesRepository.ts", () => ({
    countryRepository: {
      async getAll(): Promise<Array<{ id: string; label: string; expected_count_days: number; expected_daily_expenses: number; }>> {
        return [{ id: "country-1", label: "Country 1", expected_count_days: 10, expected_daily_expenses: 50 }]
      }
    }
  }))

  mock.module("@/repositories/usersRepository.ts", () => ({
    userRepository: {
      async getAll(): Promise<Array<{ id: string; label: string;}>> {
        return [{ id: "user-1", label: "User 1" }]
      }
    }
  }))


  it("retrieves expenses summary successfully", async () => {

    const response = await api.expenses.summary.get();
    expect(response.status).toBe(200);
    expect(response.data.expenses_summary).toBeObject();
    expect(response.data.expenses_summary.totalExpenses).toBe(DEFAULT_PRICE)
  });

  it("retrieves expenses summary by country successfully", async () => {
    const response = await api.expenses.summary["by-country"].get();
    expect(response.status).toBe(200);
    expect(response.data.summaryByCountry).toBeObject();
    expect(response.data.summaryByCountry["Country 1"]).toBeObject();
  })

  it("retrieves expenses summary by user successfully", async () => {
    const response = await api.expenses.summary["by-user"].get();
    expect(response.status).toBe(200);
    expect(response.data.summaryByUser).toBeObject();
    expect(response.data.summaryByUser["User 1"]).toBeObject();
  })
});