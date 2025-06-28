import { http, HttpResponse } from 'msw'

export const currenciesHandlers = [
  http.get('/api/currencies/', () => {
    return new HttpResponse(
      JSON.stringify([
        { label: "Dollar Américain", ident: "en-US", name: "USD", conversion: 0.88 },
        { label: "Euro", ident: "fr-FR", name: "EUR", conversion: 1 },
        { label: "Livre Sterling", ident: "en-GB", name: "GBP", conversion: 1.19 },
        { label: "Yen Japonais", ident: "ja-JP", name: "JPY", conversion: 0.0061 },
      ]),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }),
]
