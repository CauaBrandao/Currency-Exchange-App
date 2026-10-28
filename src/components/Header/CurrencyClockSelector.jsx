import React, { useState, useEffect } from 'react';
import {
  Clock, Globe2, ChevronDown, Check, Sparkles
} from 'lucide-react';
import { CURRENCY_METADATA } from '../../data/mockData';

export default function CurrencyClockSelector({
  currencies = {},
  selectedCurrencies = ['BRL', 'USD', 'EUR'],
  onToggleCurrency
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTimes, setCurrentTimes] = useState({});

  // Atualiza relógios a cada segundo
  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      const updated = {};

      Object.keys(CURRENCY_METADATA).forEach(code => {
        const meta = CURRENCY_METADATA[code];
        if (!meta) return;

        try {
          const timeStr = now.toLocaleTimeString('pt-BR', {
            timeZone: meta.timezone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          });

          const dateStr = now.toLocaleDateString('pt-BR', {
            timeZone: meta.timezone,
            weekday: 'short',
            day: '2-digit',
            month: 'short'
          });

          updated[code] = { time: timeStr, date: dateStr };
        } catch {
          updated[code] = {
            time: now.toLocaleTimeString('pt-BR'),
            date: ''
          };
        }
      });

      setCurrentTimes(updated);
    };

    updateTimes();
    const timer = setInterval(updateTimes, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="currency-clock-container">
      {/* Barra de exibição dos relógios selecionados */}
      <div className="active-clocks-bar">
        {selectedCurrencies.map((code) => {
          const meta = CURRENCY_METADATA[code] || { flag: '🌐', city: code };
          const timeData = currentTimes[code] || { time: '--:--:--', date: '' };
          return (
            <div key={code} className="clock-pill-item">
              <span className="clock-pill-flag">{meta.flag}</span>
              <div className="clock-pill-details">
                <div className="clock-pill-city">
                  {meta.city.split('/')[0]} ({code})
                </div>
                <div className="clock-pill-time">{timeData.time}</div>
              </div>
            </div>
          );
        })}

        <button
          className="clock-select-toggle-btn"
          onClick={() => setIsOpen(!isOpen)}
          title="Escolha quais relógios e fusos horários de moedas deseja visualizar"
        >
          <Clock size={14} />
          <span>Fuso de Moedas ({selectedCurrencies.length})</span>
          <ChevronDown
            size={13}
            style={{
              transform: isOpen ? 'rotate(180deg)' : 'none',
              transition: 'transform 0.2s ease'
            }}
          />
        </button>
      </div>

      {/* Menu dropdown para seleção de qualquer moeda */}
      {isOpen && (
        <div className="clocks-dropdown-panel animate-scale-in">
          <div className="clocks-dropdown-header">
            <div>
              <strong>Selecione Relógios Mundiais</strong>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                Exiba o horário em tempo real de cada praça financeira
              </div>
            </div>
            <button
              className="chip-btn"
              onClick={() => setIsOpen(false)}
              style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}
            >
              Pronto
            </button>
          </div>

          <div className="clocks-dropdown-grid">
            {Object.keys(CURRENCY_METADATA).map((code) => {
              const meta = CURRENCY_METADATA[code];
              const isSelected = selectedCurrencies.includes(code);
              const timeData = currentTimes[code] || { time: '--:--' };
              const currencyName = currencies[code] || code;

              return (
                <div
                  key={code}
                  className={`clock-select-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => onToggleCurrency(code)}
                >
                  <div className="clock-card-left">
                    <span className="clock-card-flag">{meta.flag}</span>
                    <div>
                      <div className="clock-card-code">
                        {code} &bull; {meta.city}
                      </div>
                      <div className="clock-card-name">{currencyName}</div>
                    </div>
                  </div>
                  <div className="clock-card-right">
                    <span className="clock-card-live-time">{timeData.time}</span>
                    <div className={`clock-check-box ${isSelected ? 'checked' : ''}`}>
                      {isSelected && <Check size={12} color="#ffffff" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

