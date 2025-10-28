import { http, HttpResponse } from "msw";
import * as expensesData from './fixtures/expenses.json';

export const expenses: { expenses: Array<any> } = { expenses: expensesData.expenses }

const repartition = [
  {
    name: "Transport",
    totalExpenses: 300,
    countExpenses: 3,
    subcategories: [
      {
        name: "Plane",
        totalExpenses: 250,
        countExpenses: 2,
      },
      {
        name: "Train",
        totalExpenses: 50,
        countExpenses: 1,
      },
    ],
  },
  {
    name: "Food",
    totalExpenses: 339.56,
    countExpenses: 5,
    subcategories: [
      {
        name: "Restaurant",
        totalExpenses: 250,
        countExpenses: 2,
      },
      {
        name: "Groceries",
        totalExpenses: 89.56,
        countExpenses: 3,
      },
    ],
  },
]

export const expensesHandlers = [
  http.get("/api/expenses/", ({ request }) => {
    const url = new URL(request.url);
    const countryId = url.searchParams.get("countryId");
    let result = expenses;
    if (countryId) {
      result = {
        expenses: expenses.expenses.filter(
          (expense) => expense.countryId === countryId,
        ),
      };
    }

    return new HttpResponse(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }),
  /* METADATA **********************/
  http.get("/api/expenses/summary", ({ request }) => {
    const url = new URL(request.url);
    const countryId = url.searchParams.get("countryId");
    let result = expenses;
    if (countryId) {
      result = {
        expenses: expenses.expenses.filter(
          (expense) => expense.countryId === countryId,
        ),
      };
    }

    const total = result.expenses.reduce(
      (acc, expense) => acc + expense.price * expense.currency.conversion,
      0,
    );
    const nbExpenses = result.expenses.length;

    const summary = {
      expenses_summary: {
        totalExpenses: total,
        countExpenses: nbExpenses,
        dailyExpenses: 0,
        dailyExpectedExpenses: 0,
        repartition,
      }
    }
    return new HttpResponse(JSON.stringify(summary), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }),
];
