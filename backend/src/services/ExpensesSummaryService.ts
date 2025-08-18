import type { Country } from "@prisma/client";
import { countryRepository } from "@repositories/countriesRepository";

export class ExpensesSummaryService {
  static calculateSummary(expenses: any[]): ISummary {

    const totalExpenses = expenses.reduce((acc, expense) => acc + expense.price * expense.currency.conversion, 0);
    const countExpenses = expenses.length;
    
    const allCountries = ExpensesSummaryService.getCountriesList(expenses);
    const countDays = allCountries.reduce((acc:number, country: Country) => acc + country.count_days, 0);
    const dailyExpectedExpenses = allCountries.reduce((acc:number, country: Country) => acc + country.daily_expected_expenses, 0);
    const dailyExpenses = countExpenses > 0 ? totalExpenses / countDays : 0;

    return {
        totalExpenses,
        countExpenses,
        countDays,
        dailyExpenses,
        dailyExpectedExpenses,
        repartition: ExpensesSummaryService.calculateRepartition(expenses)    
    };
  }
  static async getSummaryByCountry(expenses: any[]): Promise<Record<string, ISummary> | {message: string, status: number}> {
    try {
      const countries = await countryRepository.getAll();
      const summaries: Record<string, ISummary> = {};

      countries.forEach(country => {
        const countryExpenses = expenses.filter(expense => expense.country.id === country.id);
        const summary = ExpensesSummaryService.calculateSummary(countryExpenses);
        summary["totalExpectedExpense"] = country.daily_expected_expenses * country.count_days;
        summary.countDays = country.count_days;
        summary.dailyExpectedExpenses = country.daily_expected_expenses;
        summaries[country.label ?? ""] = summary;
      });

      return summaries;
    } catch (error) {
      console.error("Error fetching countries summary:", error);
      return { message: "Error fetching countries summary: " + error, status: 500 };
    }
  }

  static getCountriesList(expenses: any[]): Array<Country> {
    const countriesMap = new Map<string, Country>();
    expenses.forEach(expense => {
      if (expense.country && !countriesMap.has(expense.country.id)) {
        countriesMap.set(expense.country.id, expense.country);
      }
    });
    return Array.from(countriesMap.values());
  }
  static calculateRepartition(expenses: any[]): IRepartition[] {
    const repartitionMap = new Map<string, IRepartition>();

    expenses.forEach(expense => {
      const categoryLabel= expense.category.label;
      const subcategoryLabel = expense.subcategory ? expense.subcategory.label : "Uncategorized";

      if (!repartitionMap.has(categoryLabel)) {
        repartitionMap.set(categoryLabel, {
          name: categoryLabel,
          totalExpenses: 0,
          countExpenses: 0,
          subcategories: []
        });
      }

      const category = repartitionMap.get(categoryLabel)!;
      category.totalExpenses += expense.price * expense.currency.conversion;
      category.countExpenses += 1;

      let subcategory = category.subcategories.find(sub => sub.name === subcategoryLabel);
      if (!subcategory) {
        subcategory = { name: subcategoryLabel, totalExpenses: 0, countExpenses: 0 };
        category.subcategories.push(subcategory);
      }
      subcategory.totalExpenses += expense.price * expense.currency.conversion;
      subcategory.countExpenses += 1;
    });

    return Array.from(repartitionMap.values());
  }
}