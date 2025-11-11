import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { configureAllRoutes } from "@routes";
import { cookie } from "@elysiajs/cookie";
import { authService } from "@controllers/authController";

export const createApp = () => {
  return new Elysia()
  .use(swagger({
    documentation: {
      info: {
        title: 'Travel Budget Planner API',
        version: '1.0.0'
      },
      servers: [
        {
          url: '/api',
          description: 'Base path through Traefik'
        }
      ],
    },
    path: '/swagger', // default UI path (served at /swagger)
  }))
  .use(cookie())
  .onBeforeHandle((ctx) => authService.authMiddleware(ctx))
  .use(configureAllRoutes)
  .get("/", () => "Hello from root !")
};
