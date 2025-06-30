import { expect, test } from "vitest";
import { fetchSubCategories } from "@/utils/SubcategoryUtils";

test("fetchSubCategories add a sub str to category name", () => {
  expect(fetchSubCategories("category")[0].label).toBe("category sub");
});
