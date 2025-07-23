import { countryRepository } from "@repositories/countriesRepository";

export const countriesController = {
  async getAll() {
    return {countries: await countryRepository.getAll()};
  },
}