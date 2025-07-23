import { Elysia, t } from "elysia";
import { currenciesController } from "@controllers/currenciesController";

export const configureCurrenciesRoutes = (app: Elysia) =>
  app.group("/currencies", (app) =>
    app
      .get("/", () => currenciesController.getAll())
      .get("/:id", ({ params: { id } }) => currenciesController.get(id))
  );
