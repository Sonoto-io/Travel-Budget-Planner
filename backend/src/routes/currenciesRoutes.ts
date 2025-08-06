import { Elysia, t } from "elysia";
import { currenciesController } from "@controllers/currenciesController";

export const configureCurrenciesRoutes = (app: Elysia) =>
  app.group("/currencies", (app) =>
    app
      .get("/", () => currenciesController.getAll())
      .get("/:id", ({ params: { id } }) => currenciesController.get(id))
      .guard(
        {
          body: t.Object({
            id: t.Optional(t.String()),
            label: t.String(),
            name: t.String(),
            conversion: t.Number(),
          }),
        },
        (guardApp) =>
          guardApp
            .post("/", ({ body }) => currenciesController.create(body))
            .post(
              "/:id",
              ({ body, params }) => {
                return currenciesController.update(params.id, body);
              },
              {
                params: t.Object({
                  id: t.String(),
                }),
              }
            )
      )
      .delete("/:id", ({ params }) => currenciesController.delete(params.id), {
        params: t.Object({
          id: t.String(),
        }),
      })
  );
