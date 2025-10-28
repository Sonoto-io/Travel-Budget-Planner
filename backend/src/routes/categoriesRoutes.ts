import { Elysia, t } from "elysia";
import { categoriesController } from "@controllers/categoriesController";

export const configureCategoriesRoutes = (app: Elysia) => app.group(
  "/categories",
  (app) =>
    app
      .get("/", () => categoriesController.getAll())
      .guard(
        { body: t.Object({id: t.Optional(t.String()), label: t.String()}) },
        (guardApp) =>
          guardApp
            .post("/", ({ body }) => categoriesController.create(body))
            .post(
              "/:id",
              ({ body, params }) => {
                return categoriesController.update(params.id, body)
              },
              {
                params: t.Object({
                  id: t.String(),
                }),
              }
            )
      )
      .delete("/:id", ({ params }) => categoriesController.delete(params.id), {
        params: t.Object({
          id: t.String(),
        }),
      })
);
