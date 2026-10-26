import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import ConverterCard from './components/Converter/ConverterCard';
import AnalyticsSection from './components/Analytics/AnalyticsSection';
import Footer from './components/Footer/Footer';
import { 
  MOCK_CURRENCIES, 
  MOCK_POPULAR_PAIRS, 
  MOCK_LATEST_CONVERSION, 
  MOCK_HISTORICAL_DATA 
} from './data/mockData';

export default function App() {
  const isDark = true;
  const fromCurrency = "USD";
  const toCurrency = "BRL";
  const amount = 100;
  const conversion = MOCK_LATEST_CONVERSION;
  const historyData = MOCK_HISTORICAL_DATA;

  const rates = historyData.map(item => item.rate);
  const minRate = Math.min(...rates);
  const maxRate = Math.max(...rates);
  const avgRate = (rates.reduce((a, b) => a + b, 0) / rates.length).toFixed(4);
  const firstRate = rates[0];
  const lastRate = rates[rates.length - 1];
  const percentChange = (((lastRate - firstRate) / firstRate) * 100).toFixed(2);

  const metrics = {
    minRate,
    maxRate,
    avgRate,
    percentChange
  };

  return (
    <div className="app-container" data-theme={isDark ? 'dark' : 'light'}>
      <Header isDark={isDark} statusText="Componentes Modularizados (Card 04)" />

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
            fromCurrency={fromCurrency}
            toCurrency={toCurrency}
            currencies={MOCK_CURRENCIES}
            conversion={conversion}
            popularPairs={MOCK_POPULAR_PAIRS}
            subtitle="Estrutura Componentizada (Card 04)"
          />

          <AnalyticsSection 
            fromCurrency={fromCurrency}
            toCurrency={toCurrency}
            amount={amount}
            timeframe="7D"
            metrics={metrics}
            historyData={historyData}
            filteredHistoryData={historyData}
            searchTerm=""
            sortField="date"
            sortOrder="desc"
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
