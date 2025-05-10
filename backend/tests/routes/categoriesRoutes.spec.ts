import { describe, expect, it } from "bun:test";

import { treaty } from "@elysiajs/eden";
import type { App } from "@index";

const api = treaty<App>("localhost:3000");

describe("Category", () => {
  it("create a Category success", async () => {
    const response = await api.categories.post({ name: "test" });
    expect(response.data.message).toBe("Category test created");
  });
  it("Get all Category objects success", async () => {
    const response = await api.categories.get();
    expect(response.data.message).toBe("Category test created");
  });
});
