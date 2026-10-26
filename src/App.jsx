import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import ConverterCard from './components/Converter/ConverterCard';
import AnalyticsSection from './components/Analytics/AnalyticsSection';
import Footer from './components/Footer/Footer';
import { 
  MOCK_CURRENCIES, 
  MOCK_POPULAR_PAIRS, 
  MOCK_CONVERSION_USD_BRL, 
  MOCK_HISTORICAL_SERIES 
} from './data/mockData';

export default function App() {
  // Propriedades estaticas demonstrando o fluxo unidirecional de dados (Card 05)
  const isDark = true;
  const currentPair = {
    from: "USD",
    to: "BRL",
    amount: 100
  };
  const conversionData = MOCK_CONVERSION_USD_BRL;
  const historySeries = MOCK_HISTORICAL_SERIES;

  // Calculos analiticos derivados passados como props para os filhos
  const ratesList = historySeries.map(item => item.rate);
  const minRate = Math.min(...ratesList);
  const maxRate = Math.max(...ratesList);
  const avgRate = (ratesList.reduce((acc, curr) => acc + curr, 0) / ratesList.length).toFixed(4);
  const firstRate = ratesList[0];
  const lastRate = ratesList[ratesList.length - 1];
  const percentChange = (((lastRate - firstRate) / firstRate) * 100).toFixed(2);

  const derivedMetrics = {
    minRate,
    maxRate,
    avgRate,
    percentChange
  };

  return (
    <div className="app-container" data-theme={isDark ? 'dark' : 'light'}>
      <Header 
        isDark={isDark} 
        statusText="Fluxo de Dados com Props (Card 05)" 
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
            amount={currentPair.amount}
            fromCurrency={currentPair.from}
            toCurrency={currentPair.to}
            currencies={MOCK_CURRENCIES}
            conversion={conversionData}
            popularPairs={MOCK_POPULAR_PAIRS}
            subtitle="Demonstração de Props e Map (Card 05)"
          />

          <AnalyticsSection 
            fromCurrency={currentPair.from}
            toCurrency={currentPair.to}
            amount={currentPair.amount}
            timeframe="15D"
            metrics={derivedMetrics}
            historyData={historySeries}
            filteredHistoryData={historySeries}
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
