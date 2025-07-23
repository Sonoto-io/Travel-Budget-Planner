import { Elysia, t } from "elysia";
import { subcategoriesController } from "@controllers/subcategoriesController";

export const configureSubcategoriesRoutes = (app: Elysia) => app.group(
  "/subcategories",
  (app) =>
    app
      .get("/", () => subcategoriesController.getAll())
);
