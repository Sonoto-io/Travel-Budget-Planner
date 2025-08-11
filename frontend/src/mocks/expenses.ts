import { http, HttpResponse } from "msw";

const expenses = {
  expenses: [
    {
      id: "1",
      countryId: "1",
      date: "2025-01-01",
      price: 120.0,
      currency: {
        label: "Dollar Américain",
        id: "en-US",
        name: "USD",
        conversion: 0.88,
      },
      category: { id: "1", label: "Transport" },
      subcategory: { id: "1", label: "Plane", categoryId: "1" },
      user: { id: "1", label: "Sonoto" },
      note: "This is a note",
      location: "New York",
    },
    {
      id: "2",
      countryId: "1",
      date: "2025-01-01",
      price: 50.0,
      currency: {
        label: "Livre Sterling",
        id: "en-GB",
        name: "GBP",
        conversion: 1.19,
      },
      category: { id: "1", label: "Transport" },
      subcategory: { id: "1", label: "Plane", categoryId: "1" },
      user: { id: "2", label: "Jane Smith" },
      note: "This is a note",
      location: "New York",
    },
    {
      id: "3",
      countryId: "2",
      date: "2025-01-01",
      price: 120.0,
      currency: {
        label: "Dollar Américain",
        id: "en-US",
        name: "USD",
        conversion: 0.88,
      },
      category: { id: "1", label: "Transport" },
      subcategory: { id: "1", label: "Plane", categoryId: "1" },
      user: { id: "1", label: "Sonoto" },
      note: "This is a note",
      location: "New York",
    },
  ],
};

const repartition = [
  { name: "Transport",
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

    const summary = { expenses_summary: {
      totalExpenses: total,
      countExpenses: nbExpenses,
      dailyExpenses: 0,
      dailyExpectedExpenses: 0,
      repartition,
    }}
    return new HttpResponse(JSON.stringify(summary), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }),
];
