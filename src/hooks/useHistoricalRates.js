import { useState, useEffect, useCallback, useMemo } from 'react';
import { getHistoricalRates } from '../services/api';

export function useHistoricalRates(fromCurrency, toCurrency, timeframe = '15D') {
  const [historyData, setHistoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Calcula data inicial baseada no timeframe selecionado
  const { startDate, endDate } = useMemo(() => {
    const end = new Date();
    const start = new Date();

    switch (timeframe) {
      case '7D':
        start.setDate(end.getDate() - 7);
        break;
      case '15D':
        start.setDate(end.getDate() - 15);
        break;
      case '30D':
        start.setDate(end.getDate() - 30);
        break;
      case '90D':
        start.setDate(end.getDate() - 90);
        break;
      case '1A':
        start.setFullYear(end.getFullYear() - 1);
        break;
      default:
        start.setDate(end.getDate() - 15);
    }

    return {
      startDate: start.toISOString().split('T')[0],
      endDate: end.toISOString().split('T')[0]
    };
  }, [timeframe]);

  const fetchHistory = useCallback(async () => {
    if (!fromCurrency || !toCurrency) return;

    if (fromCurrency === toCurrency) {
      setHistoryData([{ date: endDate, rate: 1.0 }]);
      setError(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await getHistoricalRates(fromCurrency, toCurrency, startDate, endDate);
      
      if (data && data.rates) {
        // Converte objeto { "YYYY-MM-DD": { "BRL": 5.58 } } em array [{ date, rate }]
        const formatted = Object.entries(data.rates).map(([date, rateObj]) => ({
          date,
          rate: rateObj[toCurrency] || 1
        })).sort((a, b) => a.date.localeCompare(b.date));

        setHistoryData(formatted);
      } else {
        setHistoryData([]);
      }
    } catch (err) {
      console.error("Erro ao carregar série histórica:", err);
      setError(err.message || "Erro ao consultar histórico.");
      setHistoryData([]);
    } finally {
      setIsLoading(false);
    }
  }, [fromCurrency, toCurrency, startDate, endDate]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  // Metricas derivadas
  const metrics = useMemo(() => {
    if (!historyData || historyData.length === 0) {
      return { minRate: 0, maxRate: 0, avgRate: 0, percentChange: 0 };
    }

    const rates = historyData.map(d => d.rate);
    const minRate = Math.min(...rates);
    const maxRate = Math.max(...rates);
    const avgRate = (rates.reduce((a, b) => a + b, 0) / rates.length).toFixed(4);
    const firstRate = rates[0];
    const lastRate = rates[rates.length - 1];
    const percentChange = (((lastRate - firstRate) / firstRate) * 100).toFixed(2);

    return {
      minRate,
      maxRate,
      avgRate,
      percentChange
    };
  }, [historyData]);

  return {
    historyData,
    metrics,
    isLoading,
    error,
    refetch: fetchHistory
  };
}
