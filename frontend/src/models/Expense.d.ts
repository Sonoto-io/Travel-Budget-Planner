interface Expense {
  id: string;
  country_id: string,
  date: string;
  price: number;
  currency: {
    id: string;
    name: string;
    displayName: string;
    conversion: number;
  };
  category: { label: string };
  subcategory: { label: string };
  user: { label: string };
  note: string;
  location: string;
}
