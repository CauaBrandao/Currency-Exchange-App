import React, { useState, useMemo } from 'react';
import { Globe, RefreshCw, Search, Pin, TrendingUp, Copy, Check } from 'lucide-react';
import { useMultiRates, MULTI_CURRENCY_LIST } from '../../hooks/useMultiRates';

const FLAG_MAP = {
  USD: '🇺🇸', EUR: '🇪🇺', BRL: '🇧🇷', GBP: '🇬🇧', JPY: '🇯🇵',
  CAD: '🇨🇦', CHF: '🇨🇭', AUD: '🇦🇺', CNY: '🇨🇳', ARS: '🇦🇷',
  MXN: '🇲🇽', KRW: '🇰🇷', INR: '🇮🇳', TRY: '🇹🇷', ZAR: '🇿🇦',
  SGD: '🇸🇬', HKD: '🇭🇰', NOK: '🇳🇴', SEK: '🇸🇪', NZD: '🇳🇿',
};

const CURRENCY_NAMES = {
  USD: 'Dólar Americano', EUR: 'Euro', BRL: 'Real Brasileiro',
  GBP: 'Libra Esterlina', JPY: 'Iene Japonês', CAD: 'Dólar Canadense',
  CHF: 'Franco Suíço', AUD: 'Dólar Australiano', CNY: 'Yuan Chinês',
  ARS: 'Peso Argentino', MXN: 'Peso Mexicano', KRW: 'Won Sul-Coreano',
  INR: 'Rúpia Indiana', TRY: 'Lira Turca', ZAR: 'Rand Sul-Africano',
  SGD: 'Dólar de Singapura', HKD: 'Dólar de Hong Kong', NOK: 'Coroa Norueguesa',
  SEK: 'Coroa Sueca', NZD: 'Dólar Neozelandês',
};

function CurrencyCard({ currency, rate, converted, fromCurrency, isPinned, onTogglePin, decimals }) {
  const [copied, setCopied] = useState(false);

  const formattedConverted = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(converted);

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedConverted + ' ' + currency).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className={`mc-card animate-fade-in ${isPinned ? 'mc-card--pinned' : ''}`}>
      <div className="mc-card-top">
        <div className="mc-card-flag-name">
          <span className="mc-card-flag">{FLAG_MAP[currency] || '🏳️'}</span>
          <div>
            <div className="mc-card-code">{currency}</div>
            <div className="mc-card-name">{CURRENCY_NAMES[currency] || currency}</div>
          </div>
        </div>
        <button
          className={`mc-pin-btn ${isPinned ? 'mc-pin-btn--active' : ''}`}
          title={isPinned ? 'Desafixar' : 'Fixar no topo'}
          onClick={onTogglePin}
        >
          <Pin size={12} fill={isPinned ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="mc-card-converted">{formattedConverted}</div>
      <div className="mc-card-rate">
        <TrendingUp size={11} />
        1 {fromCurrency} = {rate.toFixed(4)} {currency}
      </div>
      <button className="mc-copy-btn" onClick={handleCopy} title="Copiar valor">
        {copied ? <Check size={11} color="var(--accent-green)" /> : <Copy size={11} />}
        {copied ? 'Copiado!' : 'Copiar'}
      </button>
    </div>
  );
}

export default function MultiConverter() {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [amount, setAmount] = useState(1000);
  const [searchTerm, setSearchTerm] = useState('');
  const [pinnedCurrencies, setPinnedCurrencies] = useState(['BRL', 'EUR', 'GBP', 'JPY']);
  const [sortBy, setSortBy] = useState('pin'); // 'pin' | 'value-asc' | 'value-desc' | 'alpha'

  const { rates, date, isLoading, error, lastUpdated, refetch } = useMultiRates(fromCurrency);

  const handleTogglePin = (currency) => {
    setPinnedCurrencies(prev =>
      prev.includes(currency) ? prev.filter(c => c !== currency) : [...prev, currency]
    );
  };

  const availableTargets = useMemo(
    () => Object.keys(rates).filter(c => c !== fromCurrency),
    [rates, fromCurrency]
  );

  const filteredSorted = useMemo(() => {
    let targets = availableTargets;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      targets = targets.filter(c =>
        c.toLowerCase().includes(q) ||
        (CURRENCY_NAMES[c] || '').toLowerCase().includes(q)
      );
    }
    return [...targets].sort((a, b) => {
      if (sortBy === 'pin') {
        const aPinned = pinnedCurrencies.includes(a);
        const bPinned = pinnedCurrencies.includes(b);
        if (aPinned !== bPinned) return aPinned ? -1 : 1;
        return a.localeCompare(b);
      }
      if (sortBy === 'value-desc') return (rates[b] || 0) - (rates[a] || 0);
      if (sortBy === 'value-asc') return (rates[a] || 0) - (rates[b] || 0);
      return a.localeCompare(b);
    });
  }, [availableTargets, searchTerm, pinnedCurrencies, sortBy, rates]);

  return (
    <div className="glass-panel multi-converter-panel animate-fade-in">
      {/* Panel Header */}
      <div className="mc-header">
        <div>
          <h2 className="card-title">
            <Globe size={20} color="var(--accent-cyan)" />
            Multi-Câmbio Global
          </h2>
          <p className="mc-subtitle">Converta para todas as moedas do mundo de uma só vez</p>
        </div>
        <div className="mc-header-actions">
          {lastUpdated && (
            <span className="mc-last-updated">
              Cotação BCE: {date || '—'}
            </span>
          )}
          <button
            className="chip-btn"
            onClick={refetch}
            style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-main)' }}
          >
            <RefreshCw size={12} />
            Atualizar
          </button>
        </div>
      </div>

      {/* Controls Row */}
      <div className="mc-controls">
        <div className="mc-from-group">
          <label className="input-label">Moeda de Origem</label>
          <div className="mc-from-selector">
            <span className="mc-flag-selector">{FLAG_MAP[fromCurrency] || '🏳️'}</span>
            <div className="select-wrapper" style={{ flex: 1 }}>
              <select
                className="currency-select"
                value={fromCurrency}
                onChange={e => setFromCurrency(e.target.value)}
              >
                {MULTI_CURRENCY_LIST.map(c => (
                  <option key={c} value={c}>{c} — {CURRENCY_NAMES[c] || c}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mc-amount-group">
          <label className="input-label">Valor a Converter</label>
          <input
            type="number"
            className="amount-input"
            value={amount}
            min="0"
            onChange={e => setAmount(parseFloat(e.target.value) || 0)}
            style={{ paddingLeft: '1rem' }}
          />
        </div>

        <div className="mc-search-group">
          <label className="input-label">Filtrar Moeda</label>
          <div className="search-input-wrapper">
            <Search size={14} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)', pointerEvents: 'none' }} />
            <input
              type="text"
              className="search-input"
              placeholder="USD, Euro, Libra..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <label className="input-label">Ordenar por</label>
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            {[
              { key: 'pin', label: 'Fixados' },
              { key: 'value-desc', label: 'Maior valor' },
              { key: 'alpha', label: 'A–Z' },
            ].map(opt => (
              <button
                key={opt.key}
                className={`timeframe-btn ${sortBy === opt.key ? 'active' : ''}`}
                onClick={() => setSortBy(opt.key)}
                style={{ fontSize: '0.7rem', padding: '0.3rem 0.55rem' }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {error && (
        <div style={{ padding: '0.75rem 1rem', background: 'var(--accent-red-bg)', border: '1px solid var(--accent-red)', borderRadius: 'var(--radius-md)', color: 'var(--accent-red)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
          ⚠️ {error}
        </div>
      )}

      {/* Stats Summary */}
      {!isLoading && Object.keys(rates).length > 0 && (
        <div className="mc-stats-bar">
          <div className="mc-stat">
            <span className="mc-stat-label">Moedas disponíveis</span>
            <span className="mc-stat-value">{Object.keys(rates).length}</span>
          </div>
          <div className="mc-stat">
            <span className="mc-stat-label">Maior valor</span>
            <span className="mc-stat-value" style={{ color: 'var(--accent-green)' }}>
              {(() => {
                const maxEntry = Object.entries(rates).sort(([, a], [, b]) => b - a)[0];
                return maxEntry ? `${(maxEntry[1] * amount).toFixed(0)} ${maxEntry[0]}` : '—';
              })()}
            </span>
          </div>
          <div className="mc-stat">
            <span className="mc-stat-label">Exibindo</span>
            <span className="mc-stat-value">{filteredSorted.length} moedas</span>
          </div>
        </div>
      )}

      {/* Cards Grid */}
      <div className="mc-grid">
        {isLoading ? (
          Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="skeleton" style={{ height: '110px', borderRadius: 'var(--radius-md)' }} />
          ))
        ) : filteredSorted.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            Nenhuma moeda encontrada para "{searchTerm}"
          </div>
        ) : (
          filteredSorted.map((currency, idx) => {
            const rate = rates[currency] || 0;
            const converted = rate * (parseFloat(amount) || 0);
            const decimals = ['JPY', 'KRW'].includes(currency) ? 0 : 2;
            return (
              <CurrencyCard
                key={currency}
                currency={currency}
                rate={rate}
                converted={converted}
                fromCurrency={fromCurrency}
                isPinned={pinnedCurrencies.includes(currency)}
                onTogglePin={() => handleTogglePin(currency)}
                decimals={decimals}
              />
            );
          })
        )}
      </div>

      <div className="mc-footer">
        <span>Fonte: Banco Central Europeu (BCE) via Frankfurter API</span>
        <span>{pinnedCurrencies.length} fixadas · {filteredSorted.length} exibidas</span>
      </div>
    </div>
  );
}
