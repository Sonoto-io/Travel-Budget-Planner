import { currencyRepository } from "@repositories/currenciesRepository";

export const currenciesController = {
  async getAll() {
    return {currencies: await currencyRepository.getAll()};
  },
  async get(id: string) {
    return {currency: await currencyRepository.get(id)}
  }
}