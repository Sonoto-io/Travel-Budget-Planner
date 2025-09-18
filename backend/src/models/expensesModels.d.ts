interface IRepartition {
    name: string;
    totalExpenses: number;
    countExpenses: number;
    subcategories?: Array<IRepartition>
}

interface ISummary {
    totalExpenses: number;
    countExpenses: number;
    expectedCountDays: number;
    countDays: number;
    dailyExpenses: number;
    expectedDailyExpenses: number;
    totalExpectedExpense?: number;
    repartition: Array<IRepartition>;
}