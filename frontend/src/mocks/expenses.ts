import { http, HttpResponse } from "msw";

export const expensesHandlers = [
  http.get("/api/expenses/", () => {
    return new HttpResponse(
      JSON.stringify([
        {
          id: "1",
          date: "2025-01-01",
          price: 120.0,
          currency: {
            label: "Dollar Américain",
            ident: "en-US",
            name: "USD",
            conversion: 0.88,
          },
          category: { id: "1", label: "Transport" },
          subcategory: { id: "1", label: "Plane", category_id: "1" },
          user: { id: "1", label: "Sonoto" }, // TODO: put id as string
          note: "This is a note",
          location: "New York",
        },
      ]),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  }),
];
