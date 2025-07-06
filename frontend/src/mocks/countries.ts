import { http, HttpResponse } from "msw";

export const countriesHandlers = [
  http.get("/api/countries/", () => {
    return new HttpResponse(
      JSON.stringify([
        {
          id: "1",
          label: "France",
          main_currency: "fr-FR",
          shortname: "fr"
        },
        {
          id: "2",
          label: "Etats-Unis",
          main_currency: "en-US",
          shortname: "us"
        },
        {
          id: "3",
          label: "Japon",
          main_currency: "ja-JP",
          shortname: "jp"
        },
        {
          id: "3",
          label: "Allemagne",
          main_currency: "eu-DE",
          shortname: "de"
        },
      ]),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  }),
];
