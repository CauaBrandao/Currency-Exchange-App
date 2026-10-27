import React from 'react';
import { TrendingUp, TrendingDown, Minimize2, Maximize2, Activity, BarChart2 } from 'lucide-react';

const METRIC_CONFIG = [
  { key: 'min', label: 'Menor Taxa', icon: Minimize2, color: 'var(--accent-cyan)' },
  { key: 'max', label: 'Maior Taxa', icon: Maximize2, color: 'var(--accent-violet)' },
  { key: 'avg', label: 'Taxa Média', icon: Activity, color: 'var(--accent-amber)' },
  { key: 'change', label: 'Variação', icon: BarChart2, color: '' },
];

export default function MetricCards({ minRate, maxRate, avgRate, percentChange, isLoading = false }) {
  const isPositive = Number(percentChange) >= 0;

  if (isLoading) {
    return (
      <div className="metrics-grid">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="metric-card">
            <div className="skeleton" style={{ height: '0.7rem', width: '55%', marginBottom: '0.5rem' }} />
            <div className="skeleton" style={{ height: '1.5rem', width: '70%' }} />
          </div>
        ))}
      </div>
    );
  }

  const volatility = minRate && maxRate && avgRate
    ? (((Number(maxRate) - Number(minRate)) / Number(avgRate)) * 100).toFixed(2)
    : null;

  return (
    <div className="metrics-grid">
      <div className="metric-card animate-fade-in" style={{ animationDelay: '0.05s' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.5rem' }}>
          <Minimize2 size={13} color="var(--accent-cyan)" />
          <div className="metric-label">Menor Taxa</div>
        </div>
        <div className="metric-value" style={{ color: 'var(--accent-cyan)' }}>
          {minRate ? Number(minRate).toFixed(4) : '—'}
        </div>
      </div>

      <div className="metric-card animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.5rem' }}>
          <Maximize2 size={13} color="var(--accent-violet)" />
          <div className="metric-label">Maior Taxa</div>
        </div>
        <div className="metric-value" style={{ color: 'var(--accent-violet)' }}>
          {maxRate ? Number(maxRate).toFixed(4) : '—'}
        </div>
      </div>

      <div className="metric-card animate-fade-in" style={{ animationDelay: '0.15s' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.5rem' }}>
          <Activity size={13} color="var(--accent-amber)" />
          <div className="metric-label">Taxa Média</div>
        </div>
        <div className="metric-value" style={{ color: 'var(--accent-amber)' }}>
          {avgRate ? Number(avgRate).toFixed(4) : '—'}
        </div>
        {volatility && (
          <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)', marginTop: '0.2rem' }}>
            Volatilidade: {volatility}%
          </div>
        )}
      </div>

      <div className="metric-card animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.5rem' }}>
          {isPositive ? <TrendingUp size={13} color="var(--accent-green)" /> : <TrendingDown size={13} color="var(--accent-red)" />}
          <div className="metric-label">Variação do Período</div>
        </div>
        <div className={`trend-badge ${isPositive ? 'trend-up' : 'trend-down'}`} style={{ fontSize: '1rem', fontWeight: 800 }}>
          {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {isPositive ? `+${percentChange}%` : `${percentChange}%`}
        </div>
      </div>
    </div>
  );
}
