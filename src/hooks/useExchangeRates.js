import { useState, useEffect, useCallback } from 'react';
import { getLatestRate } from '../services/api';
import { useDebounce } from './useDebounce';

export function useExchangeRates(fromCurrency, toCurrency, amount) {
  const [conversion, setConversion] = useState({
    amount: amount || 1,
    base: fromCurrency,
    target: toCurrency,
    rate: 1,
    result: amount || 1,
    date: new Date().toISOString().split('T')[0]
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const debouncedAmount = useDebounce(amount, 350);

  const fetchRates = useCallback(async () => {
    if (!fromCurrency || !toCurrency) return;

    if (fromCurrency === toCurrency) {
      const numVal = parseFloat(debouncedAmount) || 0;
      setConversion({
        amount: numVal,
        base: fromCurrency,
        target: toCurrency,
        rate: 1,
        result: numVal,
        date: new Date().toISOString().split('T')[0]
      });
      setError(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const numAmount = parseFloat(debouncedAmount);
      const validAmount = isNaN(numAmount) || numAmount <= 0 ? 1 : numAmount;

      const data = await getLatestRate(fromCurrency, toCurrency, validAmount);
      
      const rate = data.rates[toCurrency] ? (data.rates[toCurrency] / validAmount) : 1;
      const totalResult = isNaN(numAmount) || numAmount <= 0 ? 0 : data.rates[toCurrency];

      setConversion({
        amount: numAmount || 0,
        base: data.base || fromCurrency,
        target: toCurrency,
        rate: rate,
        result: totalResult,
        date: data.date
      });
    } catch (err) {
      console.error("Erro ao converter moeda:", err);
      setError(err.message || "Erro ao obter cotação.");
    } finally {
      setIsLoading(false);
    }
  }, [fromCurrency, toCurrency, debouncedAmount]);

  useEffect(() => {
    fetchRates();
  }, [fetchRates]);

  return {
    conversion,
    isLoading,
    error,
    refetch: fetchRates
  };
}
