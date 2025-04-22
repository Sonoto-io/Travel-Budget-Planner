import { Elysia } from "elysia";

export const userRoutes = new Elysia({ prefix: "/users" })
  .get("/", () => "All users")
  .post("/", ({ body }) => {
    return { message: "User created", data: body };
  });
