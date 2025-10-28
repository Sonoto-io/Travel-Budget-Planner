import type { Prisma } from "@prisma/client";
import { countryRepository } from "@repositories/countriesRepository";
import { status } from "elysia";

export const countriesController = {
  async getAll() {
    return { countries: await countryRepository.getAll() };
  },
  async create(body: Partial<Prisma.CountryCreateInput>) {
    if (body) {
      try {
        const res = await countryRepository.create(body);
        return {
          message: `Country ${body.label} created`,
          data: res,
          status: status(201),
        };
      } catch {
        return {
          status: status(400),
          message: `A country with label "${body.label}" already exists.`,
        };
      }
    } else {
      return { message: "Country is undefined", status: status(400) };
    }
  },
  async delete(id: string) {
    try {
      const res = await countryRepository.delete(id);
      return {
        message: `Country ${res.label} deleted`,
        data: res,
        status: status(200),
      };
    } catch (error) {
      return { message: error, status: status(400) };
    }
  },
  async update(id: string, country: Prisma.CountryUpdateInput) {
    const res = await countryRepository.update(id, country);
    return {
      message: `Country ${country.label} updated`,
      data: res,
      status: status(200),
    };
  },
};