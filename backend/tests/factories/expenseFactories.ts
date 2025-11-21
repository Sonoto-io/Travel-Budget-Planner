import type { Prisma, Expense } from "@prisma/client";
import { randomUUIDv7 } from "bun";

// interface IRepartition {
//     name: string;
//     totalExpenses: number;
//     countExpenses: number;
//     subcategories?: Array<IRepartition>
// }

// export function summaryFactory(overrides: Partial<ISummary> = {}): ISummary {
//   return {
//     totalExpenses: 100.5,
//     countExpenses: 1,
//     expectedCountDays: 
//     countDays: number;
//     dailyExpenses: number;
//     expectedDailyExpenses: number;
//     totalExpectedExpense?: number;
//     repartition: Array<IRepartition>
//   }
// }

// interface ISummary {
//   totalExpenses: number;
//   countExpenses: number;
//   expectedCountDays: number;
//   countDays: number;
//   dailyExpenses: number;
//   expectedDailyExpenses: number;
//   totalExpectedExpense?: number;
//   repartition: Array<IRepartition>;
// }


export const DEFAULT_PRICE = 12.34;

export function expensesFactory(overrides: Partial<Prisma.ExpenseCreateInput> = {}): Expense {
  return {
    id: randomUUIDv7(),
    country: {
      id: randomUUIDv7(),
      name: "testCountry",
    },
    user: {
      id: randomUUIDv7(),
      label: "testUsername",
    },
    category: {
      id: randomUUIDv7(),
      label: "testCategory",
    },
    subcategory: {
      id: randomUUIDv7(),
      label: "testSubacategory",
    },
    currency: {
      id: randomUUIDv7(),
      locale: "fr-FR",
      name: "testCurrencyName",
      label: "testCurrencyLabel",
      conversion: 1.00,
    },
    note: "testNote",
    price: DEFAULT_PRICE,
    date: new Date(),
    location: "testLocation",
    exception: false,
    ...overrides,
  };
}
