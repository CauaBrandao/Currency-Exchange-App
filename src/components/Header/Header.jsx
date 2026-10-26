import React from 'react';
import { Coins, Sun, Moon } from 'lucide-react';

export default function Header({ isDark = true, onToggleTheme, statusText = "API Frankfurter (Simulada)" }) {
  return (
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
            <span>{statusText}</span>
          </div>
          <button 
            className="theme-btn" 
            title="Alternar tema" 
            aria-label="Alternar tema"
            onClick={onToggleTheme}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}
