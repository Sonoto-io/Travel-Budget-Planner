import type { Country, Expense } from "@prisma/client";
import { countryRepository } from "@repositories/countriesRepository";
import { expenseRepository } from "@repositories/expensesRepository";
import { userRepository } from "@repositories/usersRepository";

export class ExpensesSummaryService {

  static calculateSummary(expenses: Expense[]): ISummary {

    const totalExpenses = expenses.reduce((acc, expense) => acc + expense.price * expense.currency.conversion, 0);
    const countExpenses = expenses.length;

    const allCountries = ExpensesSummaryService.getCountriesList(expenses);
    const expectedCountDays = allCountries.reduce((acc: number, country: Country) => acc + country.expected_count_days, 0);
    let daysSet = new Set<string>()
    expenses.forEach(expense => {
      daysSet.add(new Date(expense.date).toISOString().split('T')[0]);
    })

    const totalExpectedDays = allCountries.reduce((acc: number, country: Country) => acc + country.expected_count_days, 0);
    const expectedDailyExpenses = allCountries.reduce(
      (acc: number, country: Country) => acc + country.expected_daily_expenses * country.expected_count_days, 0
    ) / totalExpectedDays;
    
    let dailyExpenses = totalExpenses / daysSet.size;
    

    return {
      totalExpenses,
      countExpenses,
      expectedCountDays,
      countDays: daysSet.size,
      dailyExpenses: dailyExpenses ?? 0,
      expectedDailyExpenses: expectedDailyExpenses ?? 0,
      repartition: ExpensesSummaryService.calculateRepartition(expenses)
    };
  }
  static getDailyExpensesPerUser(expenses:Expense[], countDaysPerUser: Map<string, number>) {
    const totalExpensesPerUser = new Map<string, number>();
    
    expenses.forEach(expense => {
      const userId = expense.user.id;
      const expenseAmount = expense.price * expense.currency.conversion;
      if (!totalExpensesPerUser.has(userId)) {
        totalExpensesPerUser.set(userId, 0);
      }
      totalExpensesPerUser.set(userId, totalExpensesPerUser.get(userId)! + expenseAmount);
    });

    const dailyExpensesPerUser = new Map<string, number>();
    totalExpensesPerUser.forEach((total, userId) => {
      const days = countDaysPerUser.get(userId) || 1; // avoid division by zero
      dailyExpensesPerUser.set(userId, total / days);
    });

    return dailyExpensesPerUser;

  }

  static getCountDaysPerUser(expenses: Expense[]): Map<string, number> {
    // Count every day that has an expense for each user
    const userDatesMap: Map<string, Set<string>> = new Map();
    expenses.forEach(expense => {
      const userId = expense.user.id;
      const dateStr = new Date(expense.date).toISOString().split('T')[0];
      if (!userDatesMap.has(userId)) {
        userDatesMap.set(userId, new Set());
      }
      userDatesMap.get(userId)!.add(dateStr);
    })

    // Count daily expenses per user
    const userDailyExpenses = new Map<string, number>();

    userDatesMap.forEach((datesSet, userId) => {
      userDailyExpenses.set(userId, datesSet.size);
    })
    
    return userDailyExpenses;
  }

  static async getSummaryByCountry(expenses: Expense[]): Promise<Record<string, ISummary> | { message: string, status: number }> {
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

      // sort by most expenses
      const sortedSummaries = Object.fromEntries(
        Object.entries(summaries).sort(([, a], [, b]) => b.totalExpenses - a.totalExpenses)
      );

      return sortedSummaries;
    } catch (error) {
      console.error("Error fetching countries summary:", error);
      return { message: "Error fetching countries summary: " + error, status: 500 };
    }
  }

  static getCountriesList(expenses: Expense[]): Array<Country> {
    const countriesMap = new Map<string, Country>();
    expenses.forEach(expense => {
      if (expense.country && !countriesMap.has(expense.country.id)) {
        countriesMap.set(expense.country.id, expense.country);
      }
    });
    return Array.from(countriesMap.values());
  }
  static calculateRepartition(expenses: Expense[]): IRepartition[] {
    const repartitionMap = new Map<string, IRepartition>();

    expenses.forEach(expense => {
      const categoryLabel = expense.category.label;
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

  static async getSummaryByUser(expenses: Expense[]): Promise<Record<string, ISummary> | { message: string, status: number }> {
    try {
      const users = await userRepository.getAll();
      const summaries: Record<string, ISummary> = {};

      users.forEach(user => {
        const userExpenses = expenses.filter(expense => expense.user.id === user.id);
        const summary = ExpensesSummaryService.calculateSummary(userExpenses);
        summaries[user.label ?? ""] = summary;
      });

      // sort by most expenses
      const sortedSummaries = Object.fromEntries(
        Object.entries(summaries).sort(([, a], [, b]) => b.totalExpenses - a.totalExpenses)
      );

      return sortedSummaries;
    } catch (error) {
      console.error("Error fetching users summary:", error);
      return { message: "Error fetching users summary: " + error, status: 500 };
    }
  }

  static async getExpensesWithFilters(query: SummaryQuery): Promise<Expense[]> {
    let options = query.withoutExceptions ? {
      where: {
        exception: false
      }
    } : {}
    
    if (query.countryId) {
      options = {
        ...options,
        where: {
          ...options.where,
          countryId: query.countryId,
        }
      }
    }

    if (query.startDate || query.endDate) {
      const sinceDate = new Date(0, 0, 1, 0, 0, 1);
      const endDate = new Date("9999-01-01");
      if (query.startDate) {
        sinceDate.setTime(query.startDate.getTime());
      }
      if (query.endDate) {
        endDate.setTime(query.endDate.getTime());
      }

      options = {
        ...options,
        where: {
          ...options.where,
          date: {
            gte: sinceDate,
            lte: endDate,
          },
        },
      };
    }
    return await expenseRepository.getAll(options)
  }
}