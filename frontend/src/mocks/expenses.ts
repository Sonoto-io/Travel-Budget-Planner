import { http, HttpResponse } from 'msw'

export const expensesHandlers = [
  http.get('/api/expenses/', () => {
    return new HttpResponse(
      JSON.stringify([
        {
            id: "1",
            date: "2025-01-01",
            price: 120.0,
            currency: {
                ident: "us-US",
                name: "USD",
                displayName: "Dollar",
                conversion: 0.9,
            },
            category: { id: 1, label: 'Transport' },
            subcategory: { id: 1, label: 'Plane' },
            user: { id: 1, label: "Sonoto" },
            note: "This is a note",
            location: "Paris (mais on a pas dit lequel)",
        }
      ]),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
      
    );
  }),
]
