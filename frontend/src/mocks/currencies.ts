import { http, HttpResponse } from "msw";
import type { Currency } from "../models/Currency";

const currencies = {
  currencies: [
    {
      label: "Dollar Américain",
      id: "en-US",
      name: "USD",
      conversion: 0.88,
    },
    { label: "Euro", id: "fr-FR", name: "EUR", conversion: 1 },
    {
      label: "Livre Sterling",
      id: "en-GB",
      name: "GBP",
      conversion: 1.19,
    },
    {
      label: "Yen Japonais",
      id: "ja-JP",
      name: "JPY",
      conversion: 0.0061,
    },
  ],
};

export const currenciesHandlers = [
  http.get<{ currency_id: string }>("/api/currencies/", ({ request }) => {
    const url = new URL(request.url);
    const currencyId = url.searchParams.get("currency_id");
    let res = currencies;
    if (currencyId) {
      res = {
        currencies: currencies.currencies.filter(
          (currency: Currency) => (currency.id = currencyId),
        ),
      };
    }
    return new HttpResponse(JSON.stringify(res), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }),
  http.get<{ id: string }>("/api/currencies/:id", ({ params }) => {
    const { id } = params;
    const res = {
      currency: currencies.currencies.filter(
        (currency) => currency.id == id,
      )[0],
    };

    return new HttpResponse(JSON.stringify(res), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }),
];
