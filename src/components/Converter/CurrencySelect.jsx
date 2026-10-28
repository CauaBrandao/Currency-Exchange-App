import React from 'react';
import { Star } from 'lucide-react';
import { CURRENCY_METADATA } from '../../data/mockData';

export default function CurrencySelect({ 
  label, 
  value, 
  onChange, 
  currencies = {}, 
  ariaLabel,
  isFavorite = false,
  onToggleFavorite
}) {
  const meta = CURRENCY_METADATA[value] || { flag: '🌐' };

  return (
    <div className="select-wrapper">
      <div className="select-header-row">
        <label className="input-label" style={{ marginBottom: 0 }}>{label}</label>
        {onToggleFavorite && (
          <button
            type="button"
            className={`currency-star-btn ${isFavorite ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleFavorite(value);
            }}
            title={isFavorite ? `Remover ${value} dos favoritos` : `Favoritar moeda ${value}`}
          >
            <Star size={13} fill={isFavorite ? 'var(--accent-amber)' : 'none'} color={isFavorite ? 'var(--accent-amber)' : 'var(--text-dim)'} />
          </button>
        )}
      </div>

      <div className="select-inner-container">
        <select 
          className="currency-select" 
          value={value} 
          onChange={onChange}
          aria-label={ariaLabel || label}
        >
          {Object.entries(currencies).map(([code, name]) => {
            return (
              <option key={code} value={code}>
                {code} — {name}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}
