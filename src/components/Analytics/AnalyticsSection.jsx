import React from 'react';
import { BarChart3 } from 'lucide-react';
import TimeframeTabs from './TimeframeTabs';
import MetricCards from './MetricCards';
import ChartView from './ChartView';
import RatesTable from './RatesTable';

export default function AnalyticsSection({
  fromCurrency,
  toCurrency,
  amount,
  timeframe,
  onTimeframeChange,
  metrics,
  historyData,
  filteredHistoryData,
  totalCount,
  searchTerm,
  onSearchChange,
  minRateFilter,
  onMinRateChange,
  maxRateFilter,
  onMaxRateChange,
  onClearFilters,
  sortField,
  sortOrder,
  onSort,
  onExportCsv,
  isLoading = false
}) {
  const timeframeDescriptions = {
    '7D': 'Acompanhamento dos últimos 7 dias',
    '15D': 'Acompanhamento dos últimos 15 dias',
    '30D': 'Acompanhamento do último mês (30 dias)',
    '90D': 'Acompanhamento do último trimestre (90 dias)',
    '1A': 'Acompanhamento do último ano',
    '5A': 'Acompanhamento histórico dos últimos 5 anos'
  };

  return (
    <div className="glass-panel analytics-card">
      <div className="analytics-header">
        <div>
          <h2 className="card-title">
            <BarChart3 size={20} color="var(--accent-cyan)" />
            Evolução Histórica ({fromCurrency} / {toCurrency})
          </h2>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            {timeframeDescriptions[timeframe] || 'Acompanhamento de taxa de câmbio'}
          </p>
        </div>

        <TimeframeTabs 
          selectedTimeframe={timeframe} 
          onSelectTimeframe={onTimeframeChange} 
        />
      </div>

      <MetricCards 
        minRate={metrics.minRate}
        maxRate={metrics.maxRate}
        avgRate={metrics.avgRate}
        percentChange={metrics.percentChange}
        isLoading={isLoading}
      />

      <ChartView 
        data={historyData}
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        amount={amount}
        isLoading={isLoading}
      />

      <RatesTable 
        data={filteredHistoryData}
        totalCount={totalCount || historyData.length}
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        amount={amount}
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        minRateFilter={minRateFilter}
        onMinRateChange={onMinRateChange}
        maxRateFilter={maxRateFilter}
        onMaxRateChange={onMaxRateChange}
        onClearFilters={onClearFilters}
        sortField={sortField}
        sortOrder={sortOrder}
        onSort={onSort}
        onExportCsv={onExportCsv}
        isLoading={isLoading}
      />
    </div>
  );
}
