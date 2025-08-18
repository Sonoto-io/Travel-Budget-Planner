interface IRepartition {
    name: string;
    totalExpenses: number;
    countExpenses: number;
    subcategories?: Array<IRepartition>
}

interface ISummary {
    totalExpenses: number;
    countExpenses: number;
    countDays: number;
    dailyExpenses: number;
    dailyExpectedExpenses: number;
    totalExpectedExpense?: number;
    repartition: Array<IRepartition>;
}