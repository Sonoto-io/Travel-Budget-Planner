// tests/setup.ts
import { mock } from "bun:test";
import { treaty } from "@elysiajs/eden";

// 1️⃣ Mock AuthService globally for all tests
mock.module("@/services/authService.ts", () => ({
  AuthService: class {
    async authMiddleware(ctx: any) {
      ctx.request.user = { id: "test-user", name: "TestUser" };
    }
  },
}));

// 2️⃣ Import the factory *after* the mock
const { createApp } = await import("../app.ts");

// 3️⃣ Create an Elysia instance with the mock
export const app = createApp();

// 4️⃣ Create a Treaty client bound to this app
export const api = treaty<typeof app>(app);
