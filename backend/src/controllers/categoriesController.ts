import { categoryRepository } from "@repositories/categoriesRepository";
import { t } from "elysia";

export const categoriesController = {
  async getAll() {
    return {categories: await categoryRepository.getAll()};
  },
  // create(body: ICategoryUpsert) {
  //   const category = {
  //     name: body.name,
  //   };
  //   const res = categoryRepository.create(category);
  //   return { message: `Category ${body.name} created`, data: res };
  // },
  // validateUpsertCategory: t.Object({
  //   name: t.String(),
  // }),
  // delete(id: number) {
  //   const res = categoryRepository.delete(id);
  //   return { message: "Category deleted", data: res };
  // },
  // update(body: ICategoryUpsert, id: number) {
  //   const category = {
  //     id: id,
  //     name: body.name,
  //   };
  //   const res = categoryRepository.update(category);
  //   return { message: "Category updated", data: res };
  // },
  // validateIdParameter: t.Object({
  //   id: t.Numeric(),
  // }),
};
