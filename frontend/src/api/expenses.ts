import axios from "axios";

export const getExpenses = () => {
  return [
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
      category: "test",
      subcategory: "test sub",
      user: "Sonoto",
      note: "This is a note",
      location: "Paris (mais on a pas dit lequel)",
    },
  ]; // axios.get("/api/expenses/");
};
