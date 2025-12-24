interface Expense {
  id: string;
  countrId: string;
  date: string;
  order: number;
  price: number;
  currency: {
    id: string;
    name: string;
    displayName: string;
    conversion: number;
  };
  category: { label: string };
  subcategory: { label: string };
  user: { label: string };
  note: string;
  location: string;
  exception: boolean;
}


interface Repartition {
    name: string;
    totalExpenses: number;
    countExpenses: number;
    subcategories?: Array<IRepartition>
}

interface Summary {
    totalExpenses: number;
    countExpenses: number;
    expectedCountDays: number;
    countDays: number;
    dailyExpenses: number;
    expectedDailyExpenses: number;
    totalExpectedExpense?: number;
    repartition: Array<IRepartition>;
}