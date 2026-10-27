import React, { useState, useMemo } from 'react';
import { Plane, Calculator, Hotel, Utensils, Bus, Music, ShoppingBag, RefreshCw } from 'lucide-react';
import { useExchangeRates } from '../../hooks/useExchangeRates';

const FLAG_MAP = {
  USD: '🇺🇸', EUR: '🇪🇺', BRL: '🇧🇷', GBP: '🇬🇧', JPY: '🇯🇵',
  CAD: '🇨🇦', CHF: '🇨🇭', AUD: '🇦🇺', CNY: '🇨🇳', MXN: '🇲🇽',
  ARS: '🇦🇷', KRW: '🇰🇷', INR: '🇮🇳', SGD: '🇸🇬', TRY: '🇹🇷',
};

const CURRENCIES = ['BRL', 'USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'ARS', 'MXN', 'KRW', 'INR', 'SGD', 'TRY'];

const CATEGORIES = [
  { id: 'accommodation', label: 'Hospedagem', icon: Hotel, defaultPercent: 35, color: '#6366f1', emoji: '🏨' },
  { id: 'food', label: 'Alimentação', icon: Utensils, defaultPercent: 25, color: '#f59e0b', emoji: '🍽️' },
  { id: 'transport', label: 'Transporte', icon: Bus, defaultPercent: 15, color: '#06b6d4', emoji: '🚌' },
  { id: 'entertainment', label: 'Entretenimento', icon: Music, defaultPercent: 15, color: '#ec4899', emoji: '🎭' },
  { id: 'shopping', label: 'Compras', icon: ShoppingBag, defaultPercent: 10, color: '#10b981', emoji: '🛍️' },
];

function formatMoney(val, currency) {
  if (isNaN(val) || val === null) return '—';
  const decimals = ['JPY', 'KRW'].includes(currency) ? 0 : 2;
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(val);
}

export default function TravelCalculator() {
  const [budget, setBudget] = useState(10000);
  const [fromCurrency, setFromCurrency] = useState('BRL');
  const [toCurrency, setToCurrency] = useState('USD');
  const [days, setDays] = useState(10);
  const [percentages, setPercentages] = useState(
    Object.fromEntries(CATEGORIES.map(c => [c.id, c.defaultPercent]))
  );

  const { conversion, isLoading } = useExchangeRates(fromCurrency, toCurrency, budget);
  const convertedTotal = conversion?.result || 0;
  const rate = conversion?.rate || 0;
  const dailyTotal = days > 0 ? convertedTotal / days : 0;

  const totalPercent = Object.values(percentages).reduce((s, v) => s + v, 0);

  const categoryData = useMemo(() =>
    CATEGORIES.map(cat => ({
      ...cat,
      percent: percentages[cat.id],
      totalInTarget: (convertedTotal * percentages[cat.id]) / 100,
      totalInSource: (budget * percentages[cat.id]) / 100,
      perDay: days > 0 ? (convertedTotal * percentages[cat.id]) / 100 / days : 0,
    })),
    [convertedTotal, budget, percentages, days]
  );

  const handlePercentChange = (id, rawValue) => {
    const newVal = Math.max(0, Math.min(100, parseInt(rawValue) || 0));
    setPercentages(prev => ({ ...prev, [id]: newVal }));
  };

  const handleReset = () => {
    setPercentages(Object.fromEntries(CATEGORIES.map(c => [c.id, c.defaultPercent])));
  };

  return (
    <div className="travel-layout animate-fade-in">
      {/* Input Panel */}
      <div className="glass-panel travel-input-panel">
        <h2 className="card-title" style={{ marginBottom: '1.5rem' }}>
          <Plane size={20} color="var(--primary)" />
          Calculadora de Viagem
        </h2>

        <div className="input-group">
          <label className="input-label">Orçamento Total</label>
          <div className="amount-input-wrapper">
            <span className="amount-currency-symbol">{FLAG_MAP[fromCurrency] || '$'}</span>
            <input
              type="number"
              className="amount-input"
              value={budget}
              min="0"
              onChange={e => setBudget(parseFloat(e.target.value) || 0)}
            />
          </div>
        </div>

        <div className="currency-pair-row" style={{ marginBottom: '1.25rem' }}>
          <div>
            <label className="input-label">Sua Moeda</label>
            <div className="select-wrapper">
              <select className="currency-select" value={fromCurrency} onChange={e => setFromCurrency(e.target.value)}>
                {CURRENCIES.map(c => (
                  <option key={c} value={c}>{FLAG_MAP[c] || ''} {c}</option>
                ))}
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '0.75rem' }}>
            <Plane size={20} color="var(--text-dim)" />
          </div>
          <div>
            <label className="input-label">Moeda do Destino</label>
            <div className="select-wrapper">
              <select className="currency-select" value={toCurrency} onChange={e => setToCurrency(e.target.value)}>
                {CURRENCIES.map(c => (
                  <option key={c} value={c}>{FLAG_MAP[c] || ''} {c}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="input-group">
          <label className="input-label">Duração da Viagem</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <input
              type="range"
              min="1"
              max="90"
              value={days}
              onChange={e => setDays(parseInt(e.target.value))}
              style={{ flex: 1, accentColor: 'var(--primary)' }}
            />
            <div style={{ background: 'var(--surface-inner)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)', padding: '0.4rem 0.75rem', minWidth: '70px', textAlign: 'center', fontWeight: 700, color: 'var(--primary)' }}>
              {days} dias
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="travel-summary-box">
          <div className="travel-summary-item">
            <span className="travel-summary-label">Total convertido</span>
            <span className="travel-summary-value">
              {isLoading ? '...' : `${formatMoney(convertedTotal, toCurrency)} ${toCurrency}`}
            </span>
          </div>
          <div className="travel-summary-divider" />
          <div className="travel-summary-item">
            <span className="travel-summary-label">Por dia</span>
            <span className="travel-summary-value" style={{ color: 'var(--accent-cyan)' }}>
              {isLoading ? '...' : `${formatMoney(dailyTotal, toCurrency)} ${toCurrency}`}
            </span>
          </div>
          <div className="travel-summary-divider" />
          <div className="travel-summary-item">
            <span className="travel-summary-label">Taxa de câmbio</span>
            <span className="travel-summary-value" style={{ fontSize: '0.875rem' }}>
              1 {fromCurrency} = {rate ? rate.toFixed(4) : '—'} {toCurrency}
            </span>
          </div>
        </div>

        {totalPercent !== 100 && (
          <div className="travel-percent-warning">
            ⚠️ Percentuais somam {totalPercent}% — ajuste para 100%
          </div>
        )}
      </div>

      {/* Breakdown Panel */}
      <div className="glass-panel travel-breakdown-panel">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 className="card-title">
            <Calculator size={20} color="var(--accent-green)" />
            Distribuição do Orçamento
          </h2>
          <button
            className="chip-btn"
            onClick={handleReset}
            style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-main)' }}
          >
            <RefreshCw size={12} /> Resetar
          </button>
        </div>

        <div className="travel-categories">
          {categoryData.map(cat => {
            const Icon = cat.icon;
            const barWidth = Math.min(100, Math.max(0, cat.percent));
            return (
              <div key={cat.id} className="travel-category-row">
                <div className="travel-cat-top">
                  <div className="travel-cat-info">
                    <div className="travel-cat-icon" style={{ background: cat.color + '22', color: cat.color }}>
                      <Icon size={16} />
                    </div>
                    <div>
                      <div className="travel-cat-label">{cat.emoji} {cat.label}</div>
                      <div className="travel-cat-values">
                        <span style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '0.9rem' }}>
                          {formatMoney(cat.totalInTarget, toCurrency)} {toCurrency}
                        </span>
                        <span style={{ color: 'var(--text-dim)', fontSize: '0.72rem', marginLeft: '0.35rem' }}>
                          ({formatMoney(cat.totalInSource, fromCurrency)} {fromCurrency})
                        </span>
                      </div>
                      <div className="travel-cat-daily">
                        ≈ {formatMoney(cat.perDay, toCurrency)} {toCurrency}/dia
                      </div>
                    </div>
                  </div>
                  <div className="travel-cat-controls">
                    <input
                      type="number"
                      className="travel-percent-input"
                      value={cat.percent}
                      min="0"
                      max="100"
                      onChange={e => handlePercentChange(cat.id, e.target.value)}
                    />
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>%</span>
                  </div>
                </div>
                <div className="travel-cat-bar-wrapper">
                  <div
                    className="travel-cat-bar"
                    style={{ width: `${barWidth}%`, background: cat.color }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Visual legend */}
        <div className="travel-legend">
          <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Distribuição visual
          </p>
          <div className="travel-bar-visual">
            {categoryData.map(cat => (
              <div
                key={cat.id}
                className="travel-bar-segment"
                style={{ flex: cat.percent, background: cat.color, minWidth: cat.percent > 0 ? '4px' : 0 }}
                title={`${cat.label}: ${cat.percent}%`}
              />
            ))}
          </div>
          <div className="travel-pie-legend">
            {categoryData.map(cat => (
              <div key={cat.id} className="travel-pie-legend-item">
                <span className="travel-pie-dot" style={{ background: cat.color }} />
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  {cat.emoji} {cat.label} {cat.percent}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
