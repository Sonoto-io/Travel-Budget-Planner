import { Elysia, t } from "elysia";
import { subcategoriesController } from "@controllers/subcategoriesController";

export const configureSubcategoriesRoutes = (app: Elysia) => app.group(
  "/subcategories",
  (app) =>
    app
      .get("/", ({ query }) => subcategoriesController.getAll(query.categoryId), {
              query: t.Object({
                categoryId: t.Optional(t.String()),
              }),
            })
      .guard(
              {
                body: t.Object({
                  id: t.Optional(t.String()),
                  label: t.String(),
                  categoryId: t.String(),
                }),
              },
              (guardApp) =>
                guardApp
                  .post("/", ({ body }) => subcategoriesController.create(body))
                  .post(
                    "/:id",
                    ({ body, params }) => {
                      return subcategoriesController.update(params.id, body);
                    },
                    {
                      params: t.Object({
                        id: t.String(),
                      }),
                    }
                  )
            )
            .delete("/:id", ({ params }) => subcategoriesController.delete(params.id), {
              params: t.Object({
                id: t.String(),
              }),
            })
);
