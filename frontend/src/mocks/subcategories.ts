import { http, HttpResponse } from "msw";

const subcategories = {
  subcategories: [
    { id: "1", label: "Plane", categoryId: "1" },
    { id: "2", label: "Train", categoryId: "1" },
    { id: "3", label: "Taxi", categoryId: "1" },
    { id: "4", label: "Restaurant", categoryId: "2" },
    { id: "5", label: "Groceries", categoryId: "2" },
    { id: "6", label: "Cinema", categoryId: "3" },
    { id: "7", label: "Concert", categoryId: "3" },
  ],
};

export const subcategoriesHandlers = [
  http.get<{ id: string }>("/api/subcategories/", ({ request }) => {
    const url = new URL(request.url);
    const categoryId = url.searchParams.get("categoryId");
    const result = {
      subcategories: subcategories.subcategories.filter(
        (subcategory) => subcategory.categoryId === categoryId,
      ),
    };
    return new HttpResponse(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }),
];
