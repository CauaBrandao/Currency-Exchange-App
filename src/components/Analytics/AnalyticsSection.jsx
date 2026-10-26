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
  searchTerm,
  onSearchChange,
  sortField,
  sortOrder,
  onSort,
  onExportCsv,
  isLoading = false
}) {
  return (
    <div className="glass-panel analytics-card">
      <div className="analytics-header">
        <div>
          <h2 className="card-title">
            <BarChart3 size={20} color="var(--accent-cyan)" />
            Evolução Histórica ({fromCurrency} / {toCurrency})
          </h2>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            Acompanhamento de taxa de câmbio dos últimos dias
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
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        amount={amount}
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        sortField={sortField}
        sortOrder={sortOrder}
        onSort={onSort}
        onExportCsv={onExportCsv}
        isLoading={isLoading}
      />
    </div>
  );
}
