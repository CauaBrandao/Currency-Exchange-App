import React from 'react';
import { History, Star, ArrowRight } from 'lucide-react';

export default function RecentConversions({ 
  recents = [], 
  favorites = [],
  onSelectPair, 
  onToggleFavorite,
  currentFrom,
  currentTo
}) {
  const isCurrentFavorite = favorites.some(
    f => f.from === currentFrom && f.to === currentTo
  );

  return (
    <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
        <span className="input-label" style={{ marginBottom: 0, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <History size={14} color="var(--primary)" /> Histórico Recente
        </span>

        <button 
          onClick={() => onToggleFavorite && onToggleFavorite(currentFrom, currentTo)}
          className="chip-btn"
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.35rem', 
            color: isCurrentFavorite ? 'var(--accent-amber)' : 'var(--text-muted)',
            borderColor: isCurrentFavorite ? 'var(--accent-amber)' : 'var(--border-subtle)'
          }}
          title={isCurrentFavorite ? "Remover dos favoritos" : "Salvar par nos favoritos"}
          type="button"
        >
          <Star size={13} fill={isCurrentFavorite ? 'var(--accent-amber)' : 'none'} />
          {isCurrentFavorite ? 'Favorito' : 'Favoritar'}
        </button>
      </div>

      {favorites.length > 0 && (
        <div style={{ marginBottom: '0.75rem' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Meus Pares Favoritos:
          </span>
          <div className="popular-chips" style={{ marginTop: '0.25rem' }}>
            {favorites.map((fav, i) => (
              <button 
                key={i} 
                className="chip-btn" 
                onClick={() => onSelectPair(fav.from, fav.to)}
                style={{ borderColor: 'var(--accent-amber-bg)', color: 'var(--accent-amber)' }}
                type="button"
              >
                ★ {fav.from}/{fav.to}
              </button>
            ))}
          </div>
        </div>
      )}

      {recents.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', maxHeight: '140px', overflowY: 'auto' }}>
          {recents.slice(0, 5).map((item, idx) => (
            <div 
              key={idx}
              onClick={() => onSelectPair(item.from, item.to)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.45rem 0.65rem',
                background: 'var(--surface-inner)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.75rem',
                cursor: 'pointer',
                border: '1px solid var(--border-subtle)',
                transition: 'border-color 0.15s ease'
              }}
              className="recent-item-hover"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <strong>{item.amount} {item.from}</strong>
                <ArrowRight size={11} color="var(--text-dim)" />
                <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>{item.result.toFixed(2)} {item.to}</span>
              </div>
              <span style={{ color: 'var(--text-dim)', fontSize: '0.7rem' }}>
                {item.date}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontStyle: 'italic' }}>
          Suas últimas conversões aparecerão automaticamente aqui.
        </div>
      )}
    </div>
  );
}
