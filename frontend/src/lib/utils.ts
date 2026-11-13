import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const EXCHANGE_RATES = {
  EUR: 1.0,
  GBP: 0.855,
  CHF: 0.965,
};

export function formatCurrency(centsEUR: number, currency: 'EUR' | 'GBP' | 'CHF' = 'EUR'): string {
  const rate = EXCHANGE_RATES[currency] || 1.0;
  const convertedCents = Math.round(centsEUR * rate);
  const amount = convertedCents / 100;
  const symbols = {
    EUR: '€',
    GBP: '£',
    CHF: 'CHF ',
  };

  return `${symbols[currency]}${amount.toFixed(2)}`;
}
