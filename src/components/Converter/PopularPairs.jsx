import React from 'react';

export default function PopularPairs({ pairs = [], onSelectPair }) {
  return (
    <div className="popular-pairs-section">
      <span className="input-label">Pares Frequentes</span>
      <div className="popular-chips">
        {pairs.map((pair) => (
          <button 
            key={pair.label} 
            className="chip-btn"
            onClick={() => onSelectPair && onSelectPair(pair.from, pair.to)}
            type="button"
          >
            {pair.label}
          </button>
        ))}
      </div>
    </div>
  );
}
