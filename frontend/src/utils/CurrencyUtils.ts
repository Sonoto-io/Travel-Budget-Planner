import type { Currency } from "@/models/Currency";

export const formatCurrency = (value: number, currency: Currency): string => {
  if (!currency.signId || !currency.name) {
    return value.toString(); // Fallback if currency is not defined
  }
  return new Intl.NumberFormat(currency.signId, {
    style: "currency",
    currency: currency.name,
  }).format(value);
};

export const convertValueToCurrency = (
  value: number,
  currency: Currency,
  targetCurrency: Currency,
): string => {
  if (!targetCurrency.signId || !targetCurrency.name) {
    return (value * currency.conversion).toString(); // Fallback if currency is not defined
  }
  return new Intl.NumberFormat(targetCurrency.signId, {
    style: "currency",
    currency: targetCurrency.name,
  }).format(value * currency.conversion);
};

export const calculTotal = (expenses: Expense[]) => {
  const res = expenses.reduce(
    (acc, expense) => acc + expense.price * expense.currency.conversion,
    0,
  );
  return convertValueToCurrency(res, expenses[0].currency, {
    label: "Euro",
    signId: "fr-FR",
    name: "EUR",
    conversion: 1,
  }); // TODO: get from store
};
