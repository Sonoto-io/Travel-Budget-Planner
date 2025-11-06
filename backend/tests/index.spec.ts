import { describe, expect, it } from "bun:test";

import { api } from "./setup";

describe("Elysia", () => {
  it("return a response", async () => {
    const { data } = await api.index.get();

    expect(data).toBe("Hello from root !");
  });
});
