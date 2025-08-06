import { http, HttpResponse } from "msw";

const countries = {
  countries: [
    {
      id: "1",
      label: "France",
      currencyId: "fr-FR",
      shortname: "fr",
    },
    {
      id: "2",
      label: "Etats-Unis",
      currencyId: "en-US",
      shortname: "us",
    },
    {
      id: "3",
      label: "Japon",
      currencyId: "ja-JP",
      shortname: "jp",
    },
    {
      id: "4",
      label: "Allemagne",
      currencyId: "eu-DE",
      shortname: "de",
    },
  ],
};

export const countriesHandlers = [
  http.get("/api/countries/", () => {
    return new HttpResponse(JSON.stringify(countries), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }),
];
