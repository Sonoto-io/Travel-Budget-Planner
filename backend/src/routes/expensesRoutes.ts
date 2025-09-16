import { Elysia, t } from "elysia";
import { expensesController } from "@controllers/expensesController";

export const configureExpensesRoutes = (app: Elysia) =>
  app.group("/expenses", (app) =>
    app
      .get("/", ({ query }) => expensesController.getAll(query.countryId), {
        query: t.Object({
          countryId: t.Optional(t.String()),
        }),
      })
      .get("/summary", ({ query }) => expensesController.getSummary(query), {
        query: t.Object({
          countryId: t.Optional(t.String()),
          withoutExceptions: t.Optional(t.Boolean()),
        }),
      })
      .get("/summary/by-country", ({ query }) => expensesController.getSummaryByCountry(query), {
        query: t.Object({
          withoutExceptions: t.Optional(t.Boolean()),
        }
      )})
      .get("/summary/by-user", ({ query }) => expensesController.getSummaryByUser(query), {
          query: t.Object({
            year: t.Optional(t.Number()),
            month: t.Optional(t.Number()),
            day: t.Optional(t.Number()),
            withoutExceptions: t.Optional(t.Boolean()),
          }),
        })
      .guard(
        {
          body: t.Object({
            id: t.Optional(t.String()),
            note: t.Optional(t.String()),
            price: t.Number(),
            date: t.Date(),
            location: t.Optional(t.String()),
            country: t.Any(),
            user: t.Any(),
            category: t.Any(),
            subcategory: t.Any(),
            currency: t.Any(),
          }),
        },
        (guardApp) =>
          guardApp
            .post("/", ({ body }) => expensesController.create(body))
            .post(
              "/:id",
              ({ body, params }) => {
                return expensesController.update(params.id, body);
              },
              {
                params: t.Object({
                  id: t.String(),
                }),
              }
            )
      )
      .delete("/:id", ({ params }) => expensesController.delete(params.id), {
        params: t.Object({
          id: t.String(),
        }),
      })
  )