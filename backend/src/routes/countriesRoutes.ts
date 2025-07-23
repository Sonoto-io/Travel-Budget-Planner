import { Elysia, t } from "elysia";
import { countriesController } from "@controllers/countriesController";

export const configureCountriesRoutes = (app: Elysia) => app.group(
  "/countries",
  (app) =>
    app
      .get("/", () => countriesController.getAll())
);
