import { Elysia, t } from "elysia";
import { usersController } from "@controllers/usersController";

export const configureUsersRoutes = (app: Elysia) => app.group(
  "/users",
  (app) =>
    app
      .get("/", () => usersController.getAll())
);
