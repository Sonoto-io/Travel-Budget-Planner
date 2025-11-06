import { describe, expect, it, mock } from "bun:test";
import { api } from "../setup";

describe("Category", () => {
  // it("create a Category success", async () => {
  //   const response = await api.categories.post({ name: "test" });
  //   console.log("response : ", response)
  //   expect(response.data.message).toBe("Category test created");
  // });
  it("Get all Category objects success", async () => {
    const response = await api.categories.get();
    console.log("response : ", response)
    expect(response.data.message).toBe("Category test created");
  });
});
