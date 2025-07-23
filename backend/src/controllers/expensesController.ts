import { expenseRepository } from "@repositories/expensesRepository";

export const expensesController = {
  async getAll() {
    return {expenses: await expenseRepository.getAll()};
  },
  async getSummary(countryId: string | undefined): {expenses_summary: ISummary} {

    let expenses
    if (countryId){
      expenses = await expenseRepository.getForCountry(countryId)
      if (expenses.length > 0) {

      }
      
    }else {
      expenses = await expenseRepository.getAll()
    }

    const totalExpenses = expenses.reduce((acc, expense) => acc + expense.price, 0)
    const countExpenses = expenses.length
    const dailyExpenses = countExpenses > 0 ? totalExpenses / countExpenses : 0

    return {
      expenses_summary : {
        totalExpenses: totalExpenses,
        countExpenses: countExpenses,
        countDays: 0,
        dailyExpenses: dailyExpenses,
        dailyExpectedExpenses: 0,
        repartition: []
      }
    }
  }
}