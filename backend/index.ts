import { Elysia } from "elysia";
import { configureCategoriesRoutes } from "@routes/categoriesRoutes";
import { swagger } from "@elysiajs/swagger";

const app = new Elysia()
  .use(
    swagger({
      path: "/v1/swagger",
    })
  )
  .use(configureCategoriesRoutes)
  .get("/", () => "Hello from root!")
  .listen({
    port: 3000,
    hostname: "0.0.0.0",
  });

console.log(`🔥 Server running at http://localhost:3000`);
