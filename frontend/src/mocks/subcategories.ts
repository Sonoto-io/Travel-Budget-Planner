import { http, HttpResponse } from "msw";

const subcategories = [
  { id: "1", label: "Plane", category_id: "1" },
  { id: "2", label: "Train", category_id: "1" },
  { id: "3", label: "Taxi", category_id: "1" },
  { id: "4", label: "Restaurant", category_id: "2" },
  { id: "5", label: "Groceries", category_id: "2" },
  { id: "6", label: "Cinema", category_id: "3" },
  { id: "7", label: "Concert", category_id: "3" },
];

export const subcategoriesHandlers = [
  http.get<{ id: string }>("/api/subcategories/", ({ request }) => {
    const url = new URL(request.url);
    const categoryId = url.searchParams.get("category_id");
    const result = subcategories.filter(
      (subcategory) => subcategory.category_id === categoryId,
    );
    return new HttpResponse(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }),
];
