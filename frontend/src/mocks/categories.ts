import { http, HttpResponse } from "msw";

const categories = {
  categories: [
    { id: "1", label: "Transport" },
    { id: "2", label: "Food" },
    { id: "3", label: "Entertainment" },
  ],
};

export const categoriesHandlers = [
  http.get("/api/categories/", () => {
    return new HttpResponse(JSON.stringify(categories), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }),
];
