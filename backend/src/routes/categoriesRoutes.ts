import { Elysia, t } from "elysia";
import { categoriesController } from "@controllers/categoriesController";

export const configureCategoriesRoutes = (app: Elysia) => app.group(
  "/categories",
  (app) =>
    app
      .get("/", () => categoriesController.getAll())
      // .guard(
      //   { body: categoriesController.validateUpsertCategory },
      //   (guardApp) =>
      //     guardApp
      //       .post("/", ({ body }) => categoriesController.create(body))
      //       .post(
      //         "/:id",
      //         ({ body, params }) =>
      //           categoriesController.update(body, params.id),
      //         {
      //           params: t.Object({
      //             id: t.Numeric(),
      //           }),
      //         }
      //       )
      // )
      // .delete("/:id", ({ params }) => categoriesController.delete(params.id), {
      //   params: t.Object({
      //     id: t.Numeric(),
      //   }),
      // })
);
