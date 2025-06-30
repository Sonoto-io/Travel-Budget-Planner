import { http, HttpResponse } from "msw";

export const usersHandlers = [
  http.get("/api/users/", () => {
    return new HttpResponse(
      JSON.stringify([
        { id: "1", label: "Sonoto" },
        { id: "2", label: "Jane Smith" },
        { id: "3", label: "Alice Johnson" },
      ]),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  }),
];
