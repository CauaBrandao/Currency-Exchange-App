import React from 'react';
import { Wifi, WifiOff, User, CreditCard, Sparkles } from 'lucide-react';
import BrandLogo from './BrandLogo';
import CurrencyClockSelector from './CurrencyClockSelector';
import ThemePaletteSelector from './ThemePaletteSelector';

export default function Header({
  theme = 'dark',
  onSelectTheme,
  statusText = 'API Frankfurter Conectada',
  apiOnline = true,
  currencies = {},
  selectedClocks = ['BRL', 'USD', 'EUR'],
  onToggleClock,
  onOpenAuth,
  onNavigateHome,
  onNavigateApp,
  currentView = 'app'
}) {
  return (
    <header className="app-header">
      <div className="header-inner">
        {/* Brand Logo & Name */}
        <div className="brand-wrapper" onClick={onNavigateHome} style={{ cursor: 'pointer' }}>
          <BrandLogo size={40} />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="brand-title">Brand Finance</span>
              <span className="brand-badge">GLOBAL</span>
            </div>
            <div className="brand-tagline">
              Câmbio Comercial &amp; Soluções Financeiras
            </div>
          </div>
        </div>

        {/* Global Navigation Link (Landing vs App) */}
        <div className="header-center-nav">
          <button
            className={`nav-link-btn ${currentView === 'landing' ? 'active' : ''}`}
            onClick={onNavigateHome}
          >
            Início
          </button>
          <button
            className={`nav-link-btn ${currentView === 'app' ? 'active' : ''}`}
            onClick={onNavigateApp}
          >
            Plataforma &amp; Câmbio
          </button>
        </div>

        {/* Header Right Actions: Login, Pagamento, Temas, Status */}
        <div className="header-actions">
          {/* Status API */}
          <div className={`status-indicator ${apiOnline ? '' : 'status-indicator--offline'}`}>
            {apiOnline
              ? <Wifi size={13} color="var(--accent-green)" />
              : <WifiOff size={13} color="var(--accent-red)" />
            }
            <span className={`status-dot ${apiOnline ? '' : 'status-dot--offline'}`} />
            <span className="status-label-text">{statusText}</span>
          </div>

          {/* Seleção de Paleta de Temas Modernos */}
          <ThemePaletteSelector
            currentTheme={theme}
            onSelectTheme={onSelectTheme}
          />

          {/* Botão de Pagamento / Assinatura */}
          <button
            className="header-payment-btn"
            onClick={() => onOpenAuth('payment')}
            title="Planos e Pagamento Internacional Brand Finance"
          >
            <CreditCard size={15} />
            <span>Planos &amp; Pagamento</span>
          </button>

          {/* Botão de Login / Conta */}
          <button
            className="header-login-btn"
            onClick={() => onOpenAuth('login')}
            title="Acessar sua conta"
          >
            <User size={15} />
            <span>Entrar</span>
          </button>
        </div>
      </div>

      {/* Relógios Mundiais em tempo real logo abaixo do Header */}
      <div className="header-clocks-wrapper">
        <div className="header-clocks-inner">
          <CurrencyClockSelector
            currencies={currencies}
            selectedCurrencies={selectedClocks}
            onToggleCurrency={onToggleClock}
          />
        </div>
      </div>
    </header>
  );
}
