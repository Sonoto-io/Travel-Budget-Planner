import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { configureAllRoutes } from "@routes";
import { cookie } from "@elysiajs/cookie";
import { authService } from "@controllers/authController";
import { LogsService } from "@services/logsService";
import { cors } from '@elysiajs/cors'


export const createApp = () => {
  return new Elysia()
    // Enable CORS
    .use(
      cors({
        origin: [
          "https://localhost", // Capacitor Android WebView
          "capacitor://localhost",
          "http://localhost:5173", // Vite dev (optional)
          "https://travelbudget.ensibf-holdings.fr", // prod frontend
        ],
        credentials: true,
      })
    )
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
    // TODO: remove after logs
    .onAfterHandle(({ set }) => {
      console.log("cookies after", set.headers['set-cookie']);
    })
    .use(configureAllRoutes)
    .get("/", () => "Hello from root !")
};
