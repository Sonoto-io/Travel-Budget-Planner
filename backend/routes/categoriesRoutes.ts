import { Elysia, t } from "elysia";
import { categoriesController } from "@controllers/CategoriesController";

export const configureCategoriesRoutes = new Elysia({ prefix: "/categories" })
  .get("/", () => categoriesController.getAll)
  .guard({ body: categoriesController.validateUpsertCategory }, (guardApp) =>
    guardApp
      .post("/", categoriesController.create)
      .post("/:id", categoriesController.update, {
        params: t.Object({
          id: t.Numeric(),
        }),
      })
  )
  .delete("/:id", categoriesController.delete, {
    params: t.Object({
      id: t.Numeric(),
    }),
  });
