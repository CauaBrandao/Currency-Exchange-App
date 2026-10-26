import React from 'react';
import './App.css';
import { 
  MOCK_CURRENCIES, 
  MOCK_POPULAR_PAIRS, 
  MOCK_LATEST_CONVERSION, 
  MOCK_HISTORICAL_DATA 
} from './data/mockData';
import { 
  ArrowRightLeft, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Download, 
  Search, 
  Moon, 
  Sun, 
  Coins, 
  BarChart3, 
  Clock 
} from 'lucide-react';

export default function App() {
  const isDark = true;
  const fromCurrency = "USD";
  const toCurrency = "BRL";
  const amount = 100;
  const conversion = MOCK_LATEST_CONVERSION;
  const history = MOCK_HISTORICAL_DATA;

  // Calculos estaticos de demonstracao
  const rates = history.map(item => item.rate);
  const minRate = Math.min(...rates);
  const maxRate = Math.max(...rates);
  const avgRate = (rates.reduce((a, b) => a + b, 0) / rates.length).toFixed(4);
  const firstRate = rates[0];
  const lastRate = rates[rates.length - 1];
  const percentChange = (((lastRate - firstRate) / firstRate) * 100).toFixed(2);
  const isPositive = percentChange >= 0;

  return (
    <div className="app-container" data-theme={isDark ? 'dark' : 'light'}>
      {/* Header */}
      <header className="app-header">
        <div className="header-inner">
          <div className="brand-wrapper">
            <div className="brand-icon">
              <Coins size={22} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="brand-title">Currency Exchange</span>
                <span className="brand-badge">SPA</span>
              </div>
            </div>
          </div>

          <div className="header-actions">
            <div className="status-indicator">
              <span className="status-dot"></span>
              <span>API Frankfurter (Simulada)</span>
            </div>
            <button className="theme-btn" title="Alternar tema" aria-label="Alternar tema">
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
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
          {/* Card 1: Conversor de Moedas */}
          <div className="glass-panel converter-card">
            <div className="card-header">
              <h2 className="card-title">
                <Coins size={20} color="var(--primary)" />
                Conversor de Câmbio
              </h2>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                Dados fictícios (Card 03)
              </span>
            </div>

            <div className="input-group">
              <label htmlFor="amount-input" className="input-label">Valor a converter</label>
              <div className="amount-input-wrapper">
                <span className="amount-currency-symbol">$</span>
                <input 
                  id="amount-input"
                  type="number" 
                  className="amount-input" 
                  defaultValue={amount} 
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="currency-pair-row">
              <div className="select-wrapper">
                <label className="input-label" style={{ marginBottom: '0.2rem' }}>De</label>
                <select className="currency-select" defaultValue={fromCurrency} aria-label="Moeda de origem">
                  {Object.entries(MOCK_CURRENCIES).map(([code, name]) => (
                    <option key={code} value={code}>{code} - {name}</option>
                  ))}
                </select>
              </div>

              <button className="swap-button" title="Inverter moedas" aria-label="Inverter moedas">
                <ArrowRightLeft size={18} />
              </button>

              <div className="select-wrapper">
                <label className="input-label" style={{ marginBottom: '0.2rem' }}>Para</label>
                <select className="currency-select" defaultValue={toCurrency} aria-label="Moeda de destino">
                  {Object.entries(MOCK_CURRENCIES).map(([code, name]) => (
                    <option key={code} value={code}>{code} - {name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Resultado da Conversão */}
            <div className="result-box">
              <div className="result-label">Valor Convertido Estimado</div>
              <div className="result-value">
                R$ {conversion.result.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <div className="result-rate">
                <Clock size={14} />
                <span>1 {fromCurrency} = {conversion.rate.toFixed(4)} {toCurrency}</span>
                <span style={{ color: 'var(--text-dim)', marginLeft: 'auto' }}>{conversion.date}</span>
              </div>
            </div>

            {/* Pares Populares */}
            <div className="popular-pairs-section">
              <span className="input-label">Pares Frequentes</span>
              <div className="popular-chips">
                {MOCK_POPULAR_PAIRS.map(pair => (
                  <button key={pair.label} className="chip-btn">
                    {pair.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2: Análise e Histórico */}
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

              <div className="timeframe-selector" role="tablist">
                {['7D', '15D', '30D', '90D', '1A'].map((tf, idx) => (
                  <button 
                    key={tf} 
                    className={`timeframe-btn ${idx === 0 ? 'active' : ''}`}
                    role="tab"
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>

            {/* Métricas Resumidas */}
            <div className="metrics-grid">
              <div className="metric-card">
                <div className="metric-label">Menor Taxa</div>
                <div className="metric-value">{minRate.toFixed(4)}</div>
              </div>
              <div className="metric-card">
                <div className="metric-label">Maior Taxa</div>
                <div className="metric-value">{maxRate.toFixed(4)}</div>
              </div>
              <div className="metric-card">
                <div className="metric-label">Taxa Média</div>
                <div className="metric-value">{avgRate}</div>
              </div>
              <div className="metric-card">
                <div className="metric-label">Variação</div>
                <div className={`metric-value trend-badge ${isPositive ? 'trend-up' : 'trend-down'}`}>
                  {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  {isPositive ? `+${percentChange}%` : `${percentChange}%`}
                </div>
              </div>
            </div>

            {/* Gráfico Estático com SVG (Demonstração Card 03) */}
            <div className="chart-container">
              <svg className="chart-svg" viewBox="0 0 600 200">
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path 
                  d="M 50 160 L 110 140 L 170 120 L 230 150 L 290 110 L 350 75 L 410 70 L 470 60 L 530 50 L 530 180 L 50 180 Z" 
                  fill="url(#chartGrad)" 
                />
                <path 
                  d="M 50 160 L 110 140 L 170 120 L 230 150 L 290 110 L 350 75 L 410 70 L 470 60 L 530 50" 
                  fill="none" 
                  stroke="#38bdf8" 
                  strokeWidth="3" 
                  strokeLinecap="round"
                />
                {[
                  { x: 50, y: 160, val: '5.48' },
                  { x: 170, y: 120, val: '5.52' },
                  { x: 290, y: 110, val: '5.53' },
                  { x: 410, y: 70, val: '5.57' },
                  { x: 530, y: 50, val: '5.58' }
                ].map((pt, i) => (
                  <circle key={i} cx={pt.x} cy={pt.y} r="5" fill="#38bdf8" stroke="#0f172a" strokeWidth="2" />
                ))}
              </svg>
            </div>

            {/* Controles da Tabela */}
            <div className="table-controls">
              <div className="search-input-wrapper">
                <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                <input 
                  type="text" 
                  placeholder="Filtrar por data..." 
                  className="search-input"
                  aria-label="Filtrar tabela"
                />
              </div>

              <button className="export-csv-btn">
                <Download size={16} />
                Exportar CSV
              </button>
            </div>

            {/* Tabela de Dados */}
            <div className="data-table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Data <Calendar size={13} style={{ display: 'inline', verticalAlign: 'middle' }} /></th>
                    <th>Moeda Base</th>
                    <th>Moeda Alvo</th>
                    <th>Taxa Unitária</th>
                    <th>Valor Convertido (100)</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((row) => (
                    <tr key={row.date}>
                      <td>{row.date}</td>
                      <td><strong>{fromCurrency}</strong></td>
                      <td><strong>{toCurrency}</strong></td>
                      <td>{row.rate.toFixed(4)}</td>
                      <td>R$ {(row.rate * 100).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>
          <strong>Currency Exchange App</strong> &bull; Projeto de Single Page Application em React &bull; API Frankfurter &bull; Senac SP 2026
        </p>
      </footer>
    </div>
  );
}
