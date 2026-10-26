import { useState, useEffect, useCallback } from 'react';
import { getCurrencies } from '../services/api';
import { MOCK_CURRENCIES } from '../data/mockData';

export function useCurrencies() {
  const [currencies, setCurrencies] = useState(MOCK_CURRENCIES);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCurrenciesList = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getCurrencies();
      if (data && typeof data === 'object' && Object.keys(data).length > 0) {
        setCurrencies(data);
      }
    } catch (err) {
      console.warn("Falha ao carregar moedas da API, utilizando fallback:", err.message);
      setError(err.message);
      // Mantém MOCK_CURRENCIES como fallback gracioso
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCurrenciesList();
  }, [fetchCurrenciesList]);

  return {
    currencies,
    isLoading,
    error,
    refetch: fetchCurrenciesList
  };
}
