import { describe, expect, it } from "bun:test";

import { treaty } from "@elysiajs/eden";
import type { App } from "@index";
const api = treaty<App>("localhost:3000");

describe("Elysia", () => {
  it("return a response", async () => {
    const { data } = await api.index.get();

    expect(data).toBe("Hello from root!");
  });
});
