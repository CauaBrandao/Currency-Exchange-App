import React, { useState, useMemo, useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import ConverterCard from './components/Converter/ConverterCard';
import AnalyticsSection from './components/Analytics/AnalyticsSection';
import Footer from './components/Footer/Footer';
import { useCurrencies } from './hooks/useCurrencies';
import { useExchangeRates } from './hooks/useExchangeRates';
import { useHistoricalRates } from './hooks/useHistoricalRates';
import { useLocalStorage } from './hooks/useLocalStorage';
import { exportHistoricalRatesToCsv } from './utils/exportCsv';
import { MOCK_POPULAR_PAIRS } from './data/mockData';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function App() {
  // Persistência com LocalStorage (Card 11)
  const [isDark, setIsDark] = useLocalStorage('theme-dark', true);
  const [recents, setRecents] = useLocalStorage('recent-conversions', []);
  const [favorites, setFavorites] = useLocalStorage('favorite-pairs', [
    { from: 'USD', to: 'BRL' },
    { from: 'EUR', to: 'BRL' }
  ]);
  
  // Estados de formulário e filtros
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('BRL');
  const [amount, setAmount] = useState(100);
  const [timeframe, setTimeframe] = useState('15D');
  const [searchTerm, setSearchTerm] = useState('');
  const [minRateFilter, setMinRateFilter] = useState('');
  const [maxRateFilter, setMaxRateFilter] = useState('');
  const [sortField, setSortField] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  // Aplicar data-theme no elemento raiz HTML para consistência total de tema
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  // Integração com API via Custom Hooks
  const { 
    currencies, 
    isLoading: isLoadingCurrencies, 
    error: errorCurrencies, 
    refetch: refetchCurrencies 
  } = useCurrencies();

  const { 
    conversion, 
    isLoading: isLoadingConversion, 
    error: errorConversion, 
    refetch: refetchConversion 
  } = useExchangeRates(fromCurrency, toCurrency, amount);

  const { 
    historyData, 
    metrics, 
    isLoading: isLoadingHistory, 
    error: errorHistory, 
    refetch: refetchHistory 
  } = useHistoricalRates(fromCurrency, toCurrency, timeframe);

  // Registrar no histórico de conversões recentes quando uma conversão válida for calculada
  useEffect(() => {
    if (conversion && conversion.result > 0 && fromCurrency !== toCurrency) {
      setRecents(prev => {
        const item = {
          from: fromCurrency,
          to: toCurrency,
          amount: conversion.amount,
          result: conversion.result,
          rate: conversion.rate,
          date: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        };
        // Evita duplicata contígua imediata
        const filtered = prev.filter(r => !(r.from === item.from && r.to === item.to && r.amount === item.amount));
        return [item, ...filtered].slice(0, 8);
      });
    }
  }, [conversion.result, conversion.amount, fromCurrency, toCurrency, setRecents]);

  // Ações do Usuário
  const handleToggleTheme = () => setIsDark(prev => !prev);

  const handleAmountChange = (e) => {
    const val = parseFloat(e.target.value);
    setAmount(isNaN(val) ? '' : val);
  };

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleSelectPopularPair = (from, to) => {
    setFromCurrency(from);
    setToCurrency(to);
  };

  const handleToggleFavorite = (from, to) => {
    setFavorites(prev => {
      const exists = prev.some(f => f.from === from && f.to === to);
      if (exists) {
        return prev.filter(f => !(f.from === from && f.to === to));
      } else {
        return [...prev, { from, to }];
      }
    });
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setMinRateFilter('');
    setMaxRateFilter('');
  };

  // Filtragem e Ordenação da Tabela
  const filteredHistory = useMemo(() => {
    if (!historyData || historyData.length === 0) return [];

    const minNum = parseFloat(minRateFilter);
    const maxNum = parseFloat(maxRateFilter);

    return historyData
      .filter(item => {
        const matchesDate = !searchTerm.trim() || item.date.toLowerCase().includes(searchTerm.toLowerCase().trim());
        const matchesMin = isNaN(minNum) || item.rate >= minNum;
        const matchesMax = isNaN(maxNum) || item.rate <= maxNum;
        return matchesDate && matchesMin && matchesMax;
      })
      .sort((a, b) => {
        if (sortField === 'date') {
          return sortOrder === 'asc' ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date);
        } else {
          return sortOrder === 'asc' ? a.rate - b.rate : b.rate - a.rate;
        }
      });
  }, [historyData, searchTerm, minRateFilter, maxRateFilter, sortField, sortOrder]);

  // Exportação CSV
  const handleExportCsv = () => {
    exportHistoricalRatesToCsv({
      data: filteredHistory,
      fromCurrency,
      toCurrency,
      amount: typeof amount === 'number' && amount > 0 ? amount : 1
    });
  };

  const apiStatusMessage = errorCurrencies || errorConversion 
    ? "API Offline (Modo Resiliente)" 
    : "API Frankfurter Conectada";

  return (
    <div className="app-container" data-theme={isDark ? 'dark' : 'light'}>
      <Header 
        isDark={isDark} 
        onToggleTheme={handleToggleTheme}
        statusText={apiStatusMessage}
      />

      <main className="main-content">
        <section className="hero-section">
          <h1 className="hero-title">
            Conversão e Análise de <span className="hero-highlight">Moedas Globais</span>
          </h1>
          <p className="hero-subtitle">
            Cotações em tempo real, séries históricas oficiais do Banco Central Europeu e ferramentas financeiras analíticas.
          </p>
        </section>

        {/* Banner de Erro com Ação de Recarregar */}
        {(errorCurrencies || errorConversion || errorHistory) && (
          <div 
            className="glass-panel" 
            style={{ 
              borderLeft: '4px solid var(--accent-red)', 
              padding: '1rem 1.25rem', 
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              background: 'var(--accent-red-bg)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--accent-red)' }}>
              <AlertCircle size={20} />
              <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                {errorConversion || errorHistory || errorCurrencies}
              </span>
            </div>
            <button 
              className="chip-btn" 
              onClick={() => { refetchCurrencies(); refetchConversion(); refetchHistory(); }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-main)' }}
            >
              <RefreshCw size={14} /> Tentar Novamente
            </button>
          </div>
        )}

        <div className="dashboard-grid">
          <ConverterCard 
            amount={amount}
            onAmountChange={handleAmountChange}
            fromCurrency={fromCurrency}
            onFromCurrencyChange={(e) => setFromCurrency(e.target.value)}
            toCurrency={toCurrency}
            onToCurrencyChange={(e) => setToCurrency(e.target.value)}
            onSwap={handleSwapCurrencies}
            currencies={currencies}
            conversion={conversion}
            popularPairs={MOCK_POPULAR_PAIRS}
            onSelectPair={handleSelectPopularPair}
            recents={recents}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            isLoading={isLoadingConversion || isLoadingCurrencies}
            subtitle="Cotações Oficiais BCE"
          />

          <AnalyticsSection 
            fromCurrency={fromCurrency}
            toCurrency={toCurrency}
            amount={typeof amount === 'number' && amount > 0 ? amount : 1}
            timeframe={timeframe}
            onTimeframeChange={setTimeframe}
            metrics={metrics}
            historyData={historyData}
            filteredHistoryData={filteredHistory}
            totalCount={historyData ? historyData.length : 0}
            searchTerm={searchTerm}
            onSearchChange={(e) => setSearchTerm(e.target.value)}
            minRateFilter={minRateFilter}
            onMinRateChange={(e) => setMinRateFilter(e.target.value)}
            maxRateFilter={maxRateFilter}
            onMaxRateChange={(e) => setMaxRateFilter(e.target.value)}
            onClearFilters={handleClearFilters}
            sortField={sortField}
            sortOrder={sortOrder}
            onSort={handleSort}
            onExportCsv={handleExportCsv}
            isLoading={isLoadingHistory}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
