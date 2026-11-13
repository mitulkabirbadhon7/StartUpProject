import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(cents: number, currency: 'EUR' | 'GBP' | 'CHF' = 'EUR'): string {
  const amount = cents / 100;
  const symbols = {
    EUR: '€',
    GBP: '£',
    CHF: 'CHF ',
  };

  return `${symbols[currency]}${amount.toFixed(2)}`;
}
