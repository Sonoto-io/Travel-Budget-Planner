import { Elysia } from "elysia";
import { categoryRoutes } from "@routes/category";

const app = new Elysia()
  .use(categoryRoutes)
  .get("/", () => "Hello from root!")
  .listen(3000);

console.log(`🔥 Server running at http://localhost:3000`);
