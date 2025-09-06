"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Currency = "USD" | "INR" | "EUR" | "GBP";

type CurrencyContextType = {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  convertPrice: (priceInUSD: number) => string;
  formatCurrency: (amount: number) => string;
  currencySymbol: string;
  isLoading: boolean;
  refreshRates: () => Promise<void>;
  lastUpdated: string | null;
  rateSource: string | null;
  hasRates: boolean;
  error: string | null;
};

// Currency symbols
const currencySymbols = {
  USD: "$",
  INR: "₹",
  EUR: "€",
  GBP: "£",
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined
);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [exchangeRates, setExchangeRates] = useState<
    Record<string, number> | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState(true); // Start with loading state
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [rateSource, setRateSource] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Format the timestamp into a readable date string
  const formatTimestamp = (timestamp: number): string => {
    return new Date(timestamp).toLocaleString();
  };

  // Fetch exchange rates from API
  const fetchExchangeRates = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Use our internal API endpoint that handles the external API call
      const response = await fetch("/api/exchange-rates");

      if (!response.ok) {
        throw new Error(`Failed to fetch exchange rates: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.rates) {
        setExchangeRates(data.rates);
        setLastUpdated(formatTimestamp(data.timestamp));
        setRateSource(data.source);

        // Save to localStorage
        localStorage.setItem("exchangeRates", JSON.stringify(data.rates));
        localStorage.setItem("lastFetched", data.timestamp.toString());
        localStorage.setItem("rateSource", data.source);
      } else {
        throw new Error("Invalid response format or missing rates");
      }
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
      setError(error instanceof Error ? error.message : "Unknown error");

      // Try to load from localStorage as fallback
      const savedRates = localStorage.getItem("exchangeRates");
      const savedLastFetched = localStorage.getItem("lastFetched");
      const savedRateSource = localStorage.getItem("rateSource");

      if (savedRates && savedLastFetched) {
        setExchangeRates(JSON.parse(savedRates));
        setLastUpdated(formatTimestamp(parseInt(savedLastFetched)));
        if (savedRateSource) setRateSource(savedRateSource);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Try to load saved currency preference and exchange rates from localStorage
  useEffect(() => {
    // Load currency preference
    const savedCurrency = localStorage.getItem("preferredCurrency");
    if (savedCurrency && ["USD", "INR", "EUR", "GBP"].includes(savedCurrency)) {
      setCurrency(savedCurrency as Currency);
    }

    // Load exchange rates from localStorage if available and not too old (less than 4 hours)
    const savedRates = localStorage.getItem("exchangeRates");
    const savedLastFetched = localStorage.getItem("lastFetched");
    const savedRateSource = localStorage.getItem("rateSource");

    if (savedRates && savedLastFetched) {
      const lastFetchedTime = parseInt(savedLastFetched);
      const now = Date.now();
      const hoursSinceLastFetch = (now - lastFetchedTime) / (1000 * 60 * 60);

      setLastUpdated(formatTimestamp(lastFetchedTime));
      if (savedRateSource) setRateSource(savedRateSource);

      if (hoursSinceLastFetch < 4) {
        // Use saved rates if they're less than 4 hours old
        setExchangeRates(JSON.parse(savedRates));
        setIsLoading(false);
      } else {
        // Fetch new rates if saved rates are too old
        fetchExchangeRates();
      }
    } else {
      // Fetch new rates if none are saved
      fetchExchangeRates();
    }
  }, []);

  // Save currency preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("preferredCurrency", currency);
  }, [currency]);

  // Convert price from USD to selected currency
  const convertPrice = (priceInUSD: number): string => {
    if (!exchangeRates) {
      return `${currencySymbols.USD}${priceInUSD.toFixed(2)}`; // Return in USD if rates aren't loaded
    }

    const rate = exchangeRates[currency] || 1; // Fallback to 1 if rate for currency not found
    const convertedPrice = priceInUSD * rate;
    return formatCurrency(convertedPrice);
  };

  // Format currency with proper symbol and decimal places
  const formatCurrency = (amount: number): string => {
    const symbol = currencySymbols[currency];

    // For INR, no decimal places
    if (currency === "INR") {
      return `${symbol}${Math.round(amount).toLocaleString()}`;
    }

    // For other currencies, use 2 decimal places
    return `${symbol}${amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
  };

  const value = {
    currency,
    setCurrency,
    convertPrice,
    formatCurrency,
    currencySymbol: currencySymbols[currency],
    isLoading,
    refreshRates: fetchExchangeRates,
    lastUpdated,
    rateSource,
    hasRates: !!exchangeRates,
    error,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
