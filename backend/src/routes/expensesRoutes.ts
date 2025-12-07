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
      .guard(
        {
          query: t.Object({
            countryId: t.Optional(t.String()),
            startDate: t.Optional(t.Date()),
            endDate: t.Optional(t.Date()),
            withoutExceptions: t.Optional(t.Boolean()),
          }),
        },
        (guardApp) =>
          guardApp
        .onBeforeHandle(({query}) => {
            // Convert startDate and endDate strings to Date objects
            query.startDate = query.startDate ? new Date(query.startDate) : undefined;
            query.endDate = query.endDate ? new Date(query.endDate) : undefined;
            query.endDate?.setHours(12)
            
          })
        .get("/summary", ({ query }) => expensesController.getSummary(query))
        .get("/summary/by-country", ({ query }) => expensesController.getSummaryByCountry(query))
        .get("/summary/by-user", ({ query }) => expensesController.getSummaryByUser(query))
      )
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
            exception: t.Optional(t.Boolean()),
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