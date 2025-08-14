import type { Prisma } from "@prisma/client";
import { currencyRepository } from "@repositories/currenciesRepository";
import { status } from "elysia";

export const currenciesController = {
  async getAll() {
    return { currencies: await currencyRepository.getAll() };
  },
  async get(id: string) {
    return { currency: await currencyRepository.get(id) };
  },
  async create(body: Prisma.CurrencyCreateInput) {
    if (body) {
      try {
        const res = await currencyRepository.create(body);
        return {
          message: `Currency ${body.label} created`,
          data: res,
          status: status(201),
        };
      } catch (error) {
        console.log("error", error);
        return {
          status: status(400),
          message: `A currency with label "${body.label}" already exists.: ${error}`,
        };
      }
    } else {
      return { message: "Currency is undefined", status: status(400) };
    }
  },
  async delete(id: string) {
    try {
      const res = await currencyRepository.delete(id);
      return {
        message: `Currency ${res.label} deleted`,
        data: res,
        status: status(200),
      };
    } catch (error) {
      return { message: error, status: status(400) };
    }
  },
  async update(id: string, currency: Prisma.CurrencyUpdateInput) {
    const res = await currencyRepository.update(id, currency);
    return {
      message: `Currency ${currency.label} updated`,
      data: res,
      status: status(200),
    };
  },
};
