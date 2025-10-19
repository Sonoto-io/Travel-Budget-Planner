import { Elysia, t } from "elysia";
import { authController } from "@controllers/authController";
import { Prisma } from "@prisma/client";

export const cookieSchema = t.Cookie({
  refresh_token: t.Optional(t.String()),
});


export const configureAuthRoutes = (app: Elysia) => app.group(
  "/auth",
  (app) =>
    app
      .get("/init", () => authController.getAuthorization())
      .get("/callback", ({ query, cookie }) => authController.callback(query.code, cookie), {
                query: t.Object({
                  code: t.String(),
                }),
                cookie: cookieSchema,
              })
      .post("/refresh", ({ request, cookie }) => authController.refreshToken(request, cookie))

      // .get("/", () => categoriesController.getAll())
      // .guard(
      //   { body: t.Object({id: t.Optional(t.String()), label: t.String()}) },
      //   (guardApp) =>
      //     guardApp
      //       .post("/", ({ body }) => categoriesController.create(body))
      //       .post(
      //         "/:id",
      //         ({ body, params }) => {
      //           return categoriesController.update(params.id, body)
      //         },
      //         {
      //           params: t.Object({
      //             id: t.String(),
      //           }),
      //         }
      //       )
      // )
      // .delete("/:id", ({ params }) => categoriesController.delete(params.id), {
      //   params: t.Object({
      //     id: t.String(),
      //   }),
      // })
);
