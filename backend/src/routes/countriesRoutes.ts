import { Elysia, t } from "elysia";
import { countriesController } from "@controllers/countriesController";

export const configureCountriesRoutes = (app: Elysia) =>
  app.group("/countries", (app) =>
    app
      .get("/", () => countriesController.getAll())
      .guard(
        {
          body: t.Object({
            id: t.Optional(t.String()),
            label: t.String(),
            daily_expected_expenses: t.Optional(t.Number()),
            count_days: t.Number(),
            shortname: t.String(),
            currencyId: t.String(),
            order: t.Optional(t.Number()),
          }),
        },
        (guardApp) =>
          guardApp
            .post("/", ({ body }) => countriesController.create(body))
            .post(
              "/:id",
              ({ body, params }) => {
                return countriesController.update(params.id, body);
              },
              {
                params: t.Object({
                  id: t.String(),
                }),
              }
            )
      )
      .delete("/:id", ({ params }) => countriesController.delete(params.id), {
        params: t.Object({
          id: t.String(),
        }),
      })
  );
