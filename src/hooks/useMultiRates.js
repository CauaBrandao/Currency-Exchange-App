import { useState, useEffect, useCallback } from 'react';
import { getMultiRates } from '../services/api';

export const MULTI_CURRENCY_LIST = [
  'USD', 'EUR', 'BRL', 'GBP', 'JPY', 'CAD', 'CHF', 'AUD',
  'CNY', 'ARS', 'MXN', 'KRW', 'INR', 'TRY', 'ZAR', 'SGD', 'HKD', 'NOK', 'SEK', 'NZD'
];

/**
 * Hook para buscar taxas de câmbio de UMA moeda para todas as demais
 * Utilizado pelo Multi-Câmbio Global
 */
export function useMultiRates(fromCurrency) {
  const [rates, setRates] = useState({});
  const [date, setDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchRates = useCallback(async () => {
    if (!fromCurrency) return;
    setIsLoading(true);
    setError(null);

    try {
      const targets = MULTI_CURRENCY_LIST.filter(c => c !== fromCurrency);
      const data = await getMultiRates(fromCurrency, targets);
      if (data && data.rates) {
        setRates(data.rates);
        setDate(data.date || null);
        setLastUpdated(new Date());
      }
    } catch (err) {
      setError(err.message || 'Erro ao buscar taxas múltiplas');
      setRates({});
    } finally {
      setIsLoading(false);
    }
  }, [fromCurrency]);

  useEffect(() => {
    fetchRates();
  }, [fetchRates]);

  return { rates, date, isLoading, error, lastUpdated, refetch: fetchRates };
}
