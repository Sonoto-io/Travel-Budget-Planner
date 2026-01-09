import { Elysia, t } from "elysia";
import { authController } from "@controllers/authController";

export const cookieSchema = t.Cookie({
  session: t.Optional(t.String()),
});


export const configureAuthRoutes = (app: Elysia) => app.group(
  "/auth",
  (app) =>
    app
      // frontend asks to go to SSO authorization endpoint
      .get("/init", ({ query }) => authController.getAuthorization(query.native ?? false), {
        query: t.Object({
          native: t.Optional(t.Boolean()),
        }),
      })
      // SSO redirects back here with authorization code
      .get("/callback", ({ query, cookie }) => {
        return authController.callback(query.code, query.state ?? null, cookie)
      }, {
        query: t.Object({
          code: t.String(),
          state: t.Optional(t.String()),
        }),
        cookie: cookieSchema,
      })
      // frontend asks to finalize authentication with login code
      .post("/finalize", ({ body, cookie }) => authController.finalizeAuthentication(body.code, cookie), {
        body: t.Object({
          code: t.String(),
        }),
        cookie: cookieSchema,
      })
      .post("/verify-session", ({ cookie }) => {
        return authController.verifySession(cookie);
      }, {
        cookie: cookieSchema,
      })
);
