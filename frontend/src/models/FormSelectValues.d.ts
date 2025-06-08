export type FormSelectValues = {
  categories: Category[];
  currencies: Currency[];
  users: User[];
};
// Select values fetch

const selectCategories = ref([
  // TODO: fetch from api
  { label: "test" },
  { label: "waf" },
  { label: "wouf" },
]);

const selectCurrencies = ref([
  // TODO: fetch from api
  { ident: "fr-FR", name: "EUR", displayName: "Euro", conversion: 1 },
  { ident: "ja-JP", name: "JPY", displayName: "Yen", conversion: 0.0061 },
  { ident: "us-US", name: "USD", displayName: "Dollar", conversion: 0.9 },
]);

const selectUsers = ref([
  // TODO: fetch from api depending on category
  { label: "Sonoto" },
  { label: "Antoine" },
]);
