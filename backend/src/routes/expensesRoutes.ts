import { Elysia, t } from "elysia";
import { expensesController } from "@controllers/expensesController";

export const configureExpensesRoutes = (app: Elysia) =>
  app.group("/expenses", (app) =>
    app
      .get("/", () => expensesController.getAll())

      .get("/summary", ({ query }) => expensesController.getSummary(query.country_id), {
        query: t.Object({
          country_id: t.Optional(t.String()),
        }),
      })
  );
