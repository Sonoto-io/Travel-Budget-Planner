import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { configureAllRoutes } from "@routes";
import { cookie } from "@elysiajs/cookie";
import { authService } from "@controllers/authController";

const app = createApp().listen({
    port: 3000,
    hostname: "0.0.0.0",
  });
console.log(`🔥 Server running at http://localhost:3000`);

