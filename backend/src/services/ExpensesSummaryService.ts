import type { Country } from "@prisma/client";
import { countryRepository } from "@repositories/countriesRepository";
import { userRepository } from "@repositories/usersRepository";

export class ExpensesSummaryService {

  static calculateSummary(expenses: any[]): ISummary {

    const totalExpenses = expenses.reduce((acc, expense) => acc + expense.price * expense.currency.conversion, 0);
    const countExpenses = expenses.length;
    
    const allCountries = ExpensesSummaryService.getCountriesList(expenses);
    const expectedCountDays = allCountries.reduce((acc:number, country: Country) => acc + country.expected_count_days, 0);
    const countDays = ExpensesSummaryService.getCountDays(expenses) ?? expectedCountDays;
    const expectedDailyExpenses = allCountries.reduce((acc:number, country: Country) => acc + country.expected_daily_expenses, 0);
    const dailyExpenses = countExpenses > 0 ? totalExpenses / countDays : 0;

    return {
        totalExpenses,
        countExpenses,
        expectedCountDays,
        countDays,
        dailyExpenses,
        expectedDailyExpenses,
        repartition: ExpensesSummaryService.calculateRepartition(expenses)    
    };
  }

  static getCountDays(expenses: any[]) : number{
    const startDate = expenses.reduce((earliest, expense) => {
      const expenseDate = new Date(expense.date);
      return expenseDate < earliest ? expenseDate : earliest;
    }, new Date());

    const lastDate = expenses.reduce((latest, expense) => {
      const expenseDate = new Date(expense.date);
      return expenseDate > latest ? expenseDate : latest;
    }, new Date(0));

    if (startDate.getTime() === new Date().getTime() || lastDate.getTime() === new Date(0).getTime()) {
      return 0; // No valid dates found
    }
    const date1 = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()).getTime();
    const date2 = new Date(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate()).getTime();
    return Math.abs(date1 - date2) / (1000 * 60 * 60 * 24) + 1;
  }

  static async getSummaryByCountry(expenses: any[]): Promise<Record<string, ISummary> | {message: string, status: number}> {
    try {
      const countries = await countryRepository.getAll();
      const summaries: Record<string, ISummary> = {};

      countries.forEach(country => {
        const countryExpenses = expenses.filter(expense => expense.country.id === country.id);
        const summary = ExpensesSummaryService.calculateSummary(countryExpenses);
        summary["totalExpectedExpense"] = country.expected_daily_expenses * country.expected_count_days;
        summary.expectedCountDays = country.expected_count_days;
        summary.expectedDailyExpenses = country.expected_daily_expenses;
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

  static async getSummaryByUser(expenses: any[]): Promise<Record<string, ISummary> | {message: string, status: number}> {
    try {
      const users = await userRepository.getAll();
      const summaries: Record<string, ISummary> = {};

      users.forEach(user => {
        const userExpenses = expenses.filter(expense => expense.user.id === user.id);
        const summary = ExpensesSummaryService.calculateSummary(userExpenses);
        summaries[user.label ?? ""] = summary;
      });

      return summaries;
    } catch (error) {
      console.error("Error fetching users summary:", error);
      return { message: "Error fetching users summary: " + error, status: 500 };
    }
  }
}