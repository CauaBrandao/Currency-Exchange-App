import React, { useState, useEffect } from 'react';
import { Coins, Sun, Moon, Wifi, WifiOff } from 'lucide-react';

function LiveClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="live-clock" aria-label="Horário atual">
      {time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
    </span>
  );
}

export default function Header({ isDark = true, onToggleTheme, statusText = 'API Frankfurter Conectada', apiOnline = true }) {
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
              <span className="brand-badge">LIVE</span>
            </div>
            <div style={{ fontSize: '0.6875rem', color: 'var(--text-dim)', marginTop: '0.1rem', fontFamily: 'JetBrains Mono, monospace' }}>
              <LiveClock />
            </div>
          </div>
        </div>

        <div className="header-actions">
          <div className={`status-indicator ${apiOnline ? '' : 'status-indicator--offline'}`}>
            {apiOnline
              ? <Wifi size={13} color="var(--accent-green)" />
              : <WifiOff size={13} color="var(--accent-red)" />
            }
            <span className={`status-dot ${apiOnline ? '' : 'status-dot--offline'}`} />
            <span>{statusText}</span>
          </div>
          <button
            className="theme-btn"
            title={isDark ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
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
