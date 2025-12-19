import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { configureAllRoutes } from "@routes";
import { cookie } from "@elysiajs/cookie";
import { authService } from "@controllers/authController";
import { LogsService } from "@services/logsService";

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
      path: '/swagger',
    }))
    .use(cookie())
    .onBeforeHandle((ctx) => authService.authMiddleware(ctx))
    .onBeforeHandle((ctx) => {
      if (ctx.path !== "/" && !ctx.path.startsWith('/swagger')) {
        new LogsService().info(`Incoming request: ${ctx.request.method} ${ctx.path}`,
          { user: (ctx.request.user?.nickname || ctx.request.user?.preferred_username || ctx.request.user?.email || 'guest') })
      }
    })
    .use(configureAllRoutes)
    .get("/", () => "Hello from root !")
};
