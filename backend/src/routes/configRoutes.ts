import { Elysia, t } from "elysia";
import { configController } from "@controllers/configController";

export const configureConfigRoutes = (app: Elysia) =>
  app.group("/config", (app) =>
    app
      .get("/", () => configController.get())
      .guard(
        {
          body: t.Object({
            currencyId: t.Optional(t.String()),
            enableBackground: t.Optional(t.Boolean()),
          }),
        },
        (guardApp) =>
          guardApp
            .post("/", ({ body }) => configController.update(body))
      )
  );
