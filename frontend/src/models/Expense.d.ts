interface Expense {
  id: string;
  date: string;
  price: number;
  currency: {
    ident: string;
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
