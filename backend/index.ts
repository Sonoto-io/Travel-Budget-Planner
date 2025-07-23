import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { configureAllRoutes } from "@routes";

const app = new Elysia()
  .use(swagger())
  .use(configureAllRoutes)
  .get("/", () => "Hello from root !")
  .listen({
    port: 3000,
    hostname: "0.0.0.0",
  });

console.log(`🔥 Server running at http://localhost:3000`);

export type App = typeof app;
