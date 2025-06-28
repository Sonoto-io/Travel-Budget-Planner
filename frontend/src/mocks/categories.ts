import { http, HttpResponse } from 'msw'

export const categoriesHandlers = [
  http.get('/api/categories/', () => {
    return new HttpResponse(
      JSON.stringify([
        { id: '1', label: 'Transport' },
        { id: '2', label: 'Food' },
        { id: '3', label: 'Entertainment' },
      ]),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }),
]
