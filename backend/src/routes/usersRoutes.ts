import { Elysia, t } from "elysia";
import { usersController } from "@controllers/usersController";

export const configureUsersRoutes = (app: Elysia) => app.group(
  "/users",
  (app) =>
    app
      .get("/", () => usersController.getAll())
      .guard(
              { body: t.Object({id: t.Optional(t.String()), label: t.String()}) },
              (guardApp) =>
                guardApp
                  .post("/", ({ body }) => usersController.create(body))
                  .post(
                    "/:id",
                    ({ body, params }) => {
                      return usersController.update(params.id, body)
                    },
                    {
                      params: t.Object({
                        id: t.String(),
                      }),
                    }
                  )
            )
            .delete("/:id", ({ params }) => usersController.delete(params.id), {
              params: t.Object({
                id: t.String(),
              }),
            })
);
