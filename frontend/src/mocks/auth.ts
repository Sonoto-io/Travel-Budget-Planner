import { http, HttpResponse } from "msw";

export const authHandlers = [
  http.post("/api/auth/refresh", () => {
    return new HttpResponse(JSON.stringify({ access_token: "1234" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }),

];
