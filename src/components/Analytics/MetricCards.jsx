import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function MetricCards({ 
  minRate, 
  maxRate, 
  avgRate, 
  percentChange, 
  isLoading = false 
}) {
  const isPositive = Number(percentChange) >= 0;

  if (isLoading) {
    return (
      <div className="metrics-grid">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="metric-card">
            <div className="skeleton" style={{ height: '0.8rem', width: '50%', marginBottom: '0.5rem' }}></div>
            <div className="skeleton" style={{ height: '1.5rem', width: '75%' }}></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="metrics-grid">
      <div className="metric-card">
        <div className="metric-label">Menor Taxa</div>
        <div className="metric-value">{minRate ? Number(minRate).toFixed(4) : '---'}</div>
      </div>
      <div className="metric-card">
        <div className="metric-label">Maior Taxa</div>
        <div className="metric-value">{maxRate ? Number(maxRate).toFixed(4) : '---'}</div>
      </div>
      <div className="metric-card">
        <div className="metric-label">Taxa Média</div>
        <div className="metric-value">{avgRate ? Number(avgRate).toFixed(4) : '---'}</div>
      </div>
      <div className="metric-card">
        <div className="metric-label">Variação do Período</div>
        <div className={`metric-value trend-badge ${isPositive ? 'trend-up' : 'trend-down'}`}>
          {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          {isPositive ? `+${percentChange}%` : `${percentChange}%`}
        </div>
      </div>
    </div>
  );
}
