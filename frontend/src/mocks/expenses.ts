import { http, HttpResponse } from "msw";

const expenses = [
  {
    id: "1",
    country_id: "1",
    date: "2025-01-01",
    price: 120.0,
    currency: {
      label: "Dollar Américain",
      id: "en-US",
      name: "USD",
      conversion: 0.88,
    },
    category: { id: "1", label: "Transport" },
    subcategory: { id: "1", label: "Plane", category_id: "1" },
    user: { id: "1", label: "Sonoto" },
    note: "This is a note",
    location: "New York",
  },
  {
    id: "2",
    country_id: "1",
    date: "2025-01-01",
    price: 50.0,
    currency:  {
      label: "Livre Sterling",
      id: "en-GB",
      name: "GBP",
      conversion: 1.19,
    },
    category: { id: "1", label: "Transport" },
    subcategory: { id: "1", label: "Plane", category_id: "1" },
    user: { id: "2", label: "Jane Smith" },
    note: "This is a note",
    location: "New York",
  },
  {
    id: "3",
    country_id: "2",
    date: "2025-01-01",
    price: 120.0,
    currency: {
      label: "Dollar Américain",
      id: "en-US",
      name: "USD",
      conversion: 0.88,
    },
    category: { id: "1", label: "Transport" },
    subcategory: { id: "1", label: "Plane", category_id: "1" },
    user: { id: "1", label: "Sonoto" },
    note: "This is a note",
    location: "New York",
  },
]

export const expensesHandlers = [
  http.get("/api/expenses/", ({ request }) => {
    const url = new URL(request.url);
    const countryId = url.searchParams.get("country_id");
    const result = expenses.filter(
      (expense) => expense.country_id === countryId,
    );
    return new HttpResponse(
      JSON.stringify(result),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  }),
];
