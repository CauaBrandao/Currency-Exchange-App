import React, { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import ConverterCard from './components/Converter/ConverterCard';
import AnalyticsSection from './components/Analytics/AnalyticsSection';
import Footer from './components/Footer/Footer';
import { 
  MOCK_CURRENCIES, 
  MOCK_POPULAR_PAIRS, 
  MOCK_HISTORICAL_SERIES 
} from './data/mockData';

// Taxas simuladas relativas para demonstrar interatividade no Card 06
const MOCK_BASE_RATES = {
  USD: 1.0,
  BRL: 5.5884,
  EUR: 0.9215,
  GBP: 0.7680,
  JPY: 152.45,
  CAD: 1.3850,
  CHF: 0.8650,
  AUD: 1.5120,
  CNY: 7.1230,
  ARS: 985.50
};

export default function App() {
  // Gerenciamento de Estado com useState (Card 06)
  const [isDark, setIsDark] = useState(true);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('BRL');
  const [amount, setAmount] = useState(100);
  const [timeframe, setTimeframe] = useState('15D');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  // Alternar Tema
  const handleToggleTheme = () => {
    setIsDark(prev => !prev);
  };

  // Alterar valor
  const handleAmountChange = (e) => {
    const val = parseFloat(e.target.value);
    setAmount(isNaN(val) ? '' : val);
  };

  // Inverter moedas (Swap - Lifting State Up)
  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  // Selecionar par rapido
  const handleSelectPopularPair = (from, to) => {
    setFromCurrency(from);
    setToCurrency(to);
  };

  // Calcular taxa e resultado reativamente
  const fromRateUSD = MOCK_BASE_RATES[fromCurrency] || 1;
  const toRateUSD = MOCK_BASE_RATES[toCurrency] || 1;
  const currentRate = fromCurrency === toCurrency ? 1 : (toRateUSD / fromRateUSD);
  const calculatedResult = (typeof amount === 'number' && amount > 0) ? amount * currentRate : 0;

  const currentConversion = {
    amount: amount || 0,
    base: fromCurrency,
    target: toCurrency,
    rate: currentRate,
    result: calculatedResult,
    date: '2026-10-26'
  };

  // Gerar dados historicos simulados para o par atual
  const multiplier = currentRate / (MOCK_BASE_RATES.BRL / MOCK_BASE_RATES.USD);
  const currentHistory = MOCK_HISTORICAL_SERIES.map(item => ({
    date: item.date,
    rate: Number((item.rate * multiplier).toFixed(4))
  }));

  // Metricas
  const ratesList = currentHistory.map(item => item.rate);
  const minRate = Math.min(...ratesList);
  const maxRate = Math.max(...ratesList);
  const avgRate = (ratesList.reduce((acc, curr) => acc + curr, 0) / ratesList.length).toFixed(4);
  const firstRate = ratesList[0];
  const lastRate = ratesList[ratesList.length - 1];
  const percentChange = (((lastRate - firstRate) / firstRate) * 100).toFixed(2);

  const metrics = {
    minRate,
    maxRate,
    avgRate,
    percentChange
  };

  // Ordenacao e Filtro
  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const filteredHistory = currentHistory
    .filter(item => item.date.includes(searchTerm.trim()))
    .sort((a, b) => {
      if (sortField === 'date') {
        return sortOrder === 'asc' ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date);
      } else {
        return sortOrder === 'asc' ? a.rate - b.rate : b.rate - a.rate;
      }
    });

  return (
    <div className="app-container" data-theme={isDark ? 'dark' : 'light'}>
      <Header 
        isDark={isDark} 
        onToggleTheme={handleToggleTheme}
        statusText="Interatividade com useState (Card 06)" 
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

        <div className="dashboard-grid">
          <ConverterCard 
            amount={amount}
            onAmountChange={handleAmountChange}
            fromCurrency={fromCurrency}
            onFromCurrencyChange={(e) => setFromCurrency(e.target.value)}
            toCurrency={toCurrency}
            onToCurrencyChange={(e) => setToCurrency(e.target.value)}
            onSwap={handleSwapCurrencies}
            currencies={MOCK_CURRENCIES}
            conversion={currentConversion}
            popularPairs={MOCK_POPULAR_PAIRS}
            onSelectPair={handleSelectPopularPair}
            subtitle="Estado Reativo (Card 06)"
          />

          <AnalyticsSection 
            fromCurrency={fromCurrency}
            toCurrency={toCurrency}
            amount={amount || 1}
            timeframe={timeframe}
            onTimeframeChange={setTimeframe}
            metrics={metrics}
            historyData={currentHistory}
            filteredHistoryData={filteredHistory}
            searchTerm={searchTerm}
            onSearchChange={(e) => setSearchTerm(e.target.value)}
            sortField={sortField}
            sortOrder={sortOrder}
            onSort={handleSort}
            onExportCsv={() => alert(`Exportação de CSV ativada no Card 10 (${filteredHistory.length} registros).`)}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
