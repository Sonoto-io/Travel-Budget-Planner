import { categoryRepository } from "@src/repositories/categoriesRepository";
import { describe, expect, it } from "bun:test";
import { Elysia } from "elysia";

describe("Category", () => {
  it("getAll Categories success", async () => {
    categoryRepository.getAll();

    const response = await app
      .handle(new Request("http://localhost/"))
      .then((res) => res.text());

    expect(response).toBe("hi");
  });
});
