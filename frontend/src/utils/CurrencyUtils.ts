import type { Currency } from "@/models/Currency";

export const formatCurrency = (value: number, currency: Currency): string => {
  if (!currency.locale || !currency.name) {
    return value.toString(); // Fallback if currency is not defined
  }
  return new Intl.NumberFormat(currency.locale, {
    style: "currency",
    currency: currency.name,
  }).format(value);
};

export const convertValueToCurrency = (
  value: number,
  currency: Currency,
  targetCurrency: Currency,
): { label: string, value: number } => {
  const convertedValue = value * currency.conversion
  if (!targetCurrency.locale || !targetCurrency.name) {
    return { label: convertedValue.toString(), value: convertedValue }; // Fallback if currency is not defined
  }
  return {
    label: new Intl.NumberFormat(targetCurrency.locale, {
      style: "currency",
      currency: targetCurrency.name,
    }).format(convertedValue),
    value: convertedValue
  }
};

export const calculTotal = (expenses: Expense[]) => {
  const res = expenses.reduce(
    (acc, expense) => acc + expense.price * expense.currency.conversion,
    0,
  );
  return convertValueToCurrency(res, expenses[0].currency, {
    label: "Euro",
    locale: "fr-FR",
    name: "EUR",
    conversion: 1,
  }); // TODO: get from store
};
