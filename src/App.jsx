import React, { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import ConverterCard from './components/Converter/ConverterCard';
import AnalyticsSection from './components/Analytics/AnalyticsSection';
import Footer from './components/Footer/Footer';
import { useCurrencies } from './hooks/useCurrencies';
import { useExchangeRates } from './hooks/useExchangeRates';
import { useHistoricalRates } from './hooks/useHistoricalRates';
import { useLocalStorage } from './hooks/useLocalStorage';
import { MOCK_POPULAR_PAIRS } from './data/mockData';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function App() {
  // Persistência de tema via LocalStorage
  const [isDark, setIsDark] = useLocalStorage('theme-dark', true);
  
  // Estados de formulário e filtros
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('BRL');
  const [amount, setAmount] = useState(100);
  const [timeframe, setTimeframe] = useState('15D');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  // Integração com API via Custom Hooks (Card 08)
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

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // Filtragem e Ordenação da Tabela
  const filteredHistory = (historyData || [])
    .filter(item => item.date.toLowerCase().includes(searchTerm.toLowerCase().trim()))
    .sort((a, b) => {
      if (sortField === 'date') {
        return sortOrder === 'asc' ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date);
      } else {
        return sortOrder === 'asc' ? a.rate - b.rate : b.rate - a.rate;
      }
    });

  const apiStatusMessage = errorCurrencies || errorConversion 
    ? "API Offline (Modo Resiliente)" 
    : "API Frankfurter Online";

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
            isLoading={isLoadingConversion || isLoadingCurrencies}
            subtitle="Dados Oficiais BCE (Card 08)"
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
            searchTerm={searchTerm}
            onSearchChange={(e) => setSearchTerm(e.target.value)}
            sortField={sortField}
            sortOrder={sortOrder}
            onSort={handleSort}
            onExportCsv={() => alert(`Exportação CSV será ativada no Card 10 (${filteredHistory.length} registros).`)}
            isLoading={isLoadingHistory}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
