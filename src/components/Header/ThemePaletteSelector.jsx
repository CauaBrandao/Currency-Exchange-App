import React, { useState } from 'react';
import { Palette, Check } from 'lucide-react';
import { THEME_PRESETS } from '../../data/mockData';

export default function ThemePaletteSelector({ currentTheme, onSelectTheme }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="theme-palette-wrapper">
      <button
        className="theme-palette-btn"
        onClick={() => setIsOpen(!isOpen)}
        title="Alterar tema e cores do Brand Finance"
        aria-label="Selecionar tema"
      >
        <Palette size={16} />
        <span className="theme-palette-label">Temas</span>
      </button>

      {isOpen && (
        <div className="theme-palette-dropdown animate-scale-in">
          <div className="theme-dropdown-title">Paleta de Cores & Estilo</div>
          <div className="theme-palette-list">
            {THEME_PRESETS.map((t) => {
              const isSelected = currentTheme === t.id;
              return (
                <button
                  key={t.id}
                  className={`theme-palette-item ${isSelected ? 'active' : ''}`}
                  onClick={() => {
                    onSelectTheme(t.id);
                    setIsOpen(false);
                  }}
                >
                  <div
                    className="theme-swatch"
                    style={{
                      background: t.preview,
                      border: `2px solid ${t.accent}`
                    }}
                  >
                    <span
                      className="theme-swatch-dot"
                      style={{ background: t.accent }}
                    />
                  </div>
                  <span className="theme-item-name">{t.name}</span>
                  {isSelected && <Check size={14} color="var(--primary)" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

