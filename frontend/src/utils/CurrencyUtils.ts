import type { Currency } from "@/models/Currency";

export const formatCurrency = (value: number, currency: Currency): string => {
  return new Intl.NumberFormat(currency.id, {
    style: "currency",
    currency: currency.name,
  }).format(value);
};

export const convertValueToCurrency = (
  value: number,
  currency: Currency,
  targetCurrency: Currency,
): string => {
  return new Intl.NumberFormat(targetCurrency.id, {
    style: "currency",
    currency: targetCurrency.name,
  }).format(value * currency.conversion);
};
