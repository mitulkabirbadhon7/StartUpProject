'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Currency = 'EUR' | 'GBP' | 'CHF';

// European Central Bank (ECB) benchmark market rates
export const EXCHANGE_RATES: Record<Currency, number> = {
  EUR: 1.0,     // Base Currency
  GBP: 0.855,   // €1.00 EUR = ~£0.855 GBP
  CHF: 0.965,   // €1.00 EUR = ~CHF 0.965 CHF
};

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  EUR: '€',
  GBP: '£',
  CHF: 'CHF ',
};

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (priceCentsEUR: number) => string;
  convertPrice: (priceCentsEUR: number) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>('EUR');
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
    const stored = localStorage.getItem('european_dining_currency');
    if (stored === 'EUR' || stored === 'GBP' || stored === 'CHF') {
      setCurrencyState(stored as Currency);
    }
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    try {
      localStorage.setItem('european_dining_currency', c);
    } catch {
      // Ignore private browsing storage errors
    }
  };

  const convertPrice = (priceCentsEUR: number): number => {
    const rate = EXCHANGE_RATES[currency] || 1.0;
    return Math.round(priceCentsEUR * rate);
  };

  const formatPrice = (priceCentsEUR: number): string => {
    const convertedCents = convertPrice(priceCentsEUR);
    const amount = convertedCents / 100;
    const symbol = CURRENCY_SYMBOLS[currency];
    return `${symbol}${amount.toFixed(2)}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, convertPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    // Graceful fallback for non-provider usage
    return {
      currency: 'EUR' as Currency,
      setCurrency: () => {},
      convertPrice: (c: number) => c,
      formatPrice: (c: number) => `€${(c / 100).toFixed(2)}`,
    };
  }
  return context;
}
