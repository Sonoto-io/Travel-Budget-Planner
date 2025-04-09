import { Elysia } from "elysia";
import CategoryRepository from "@repositories/categories";

const categories = new CategoryRepository();

export const categoryRoutes = new Elysia({ prefix: "/categories" })
  .get("/", () => categories.getAll())
  .post("/", ({ body }) => {
    return { message: "User created", data: body };
  });
