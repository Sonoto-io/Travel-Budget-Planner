import type { Category } from "@prisma/client";
import { randomUUIDv7 } from "bun";
import { randomId } from "elysia/utils";

export function categoriesFactory(overrides: Partial<Category> = {}): Category {
  return {
    id: randomUUIDv7(),
    name: "Test Category Name",
    ...overrides,
  };
}
