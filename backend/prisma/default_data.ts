export const currencies = [
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
  {
  label: "Euro Allemand",
  id: "de-DE",
  name: "EUR",
  conversion: 1
}

];

export const countries = [
        {
          label: "France",
          main_currency: "fr-FR",
          shortname: "fr",
          daily_expected_expenses: 55,
          count_days: 30,
        },
        {
          label: "Etats-Unis",
          main_currency: "en-US",
          shortname: "us",
          daily_expected_expenses: 70,
          count_days: 3,
        },
        {
          label: "Japon",
          main_currency: "ja-JP",
          shortname: "jp",
          daily_expected_expenses: 42,
          count_days: 21,
        },
        {
          label: "Allemagne",
          main_currency: "de-DE",
          shortname: "de",
          daily_expected_expenses: 33,
          count_days: 5,
        },
      ]

export const categories = [
        { label: "Transport" },
        { label: "Food" },
        { label: "Entertainment" },
      ]

export const users = [
        { label: "Sonoto" },
        { label: "Jane Smith" },
        { label: "Alice Johnson" },
      ]
      
export const subcategories = [
        { label: "Plane", categoryId: "" },
        { label: "Train", categoryId: ""  },
        { label: "Bus", categoryId: ""  },
      ]