import React from 'react';
import { Search, SlidersHorizontal, RotateCcw } from 'lucide-react';

export default function TableFilters({
  searchTerm,
  onSearchChange,
  minRateFilter,
  onMinRateChange,
  maxRateFilter,
  onMaxRateChange,
  onClearFilters,
  totalRecords,
  filteredRecords
}) {
  const hasActiveFilters = Boolean(searchTerm || minRateFilter || maxRateFilter);

  return (
    <div style={{ background: 'var(--surface-inner)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '1rem', marginBottom: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-main)' }}>
          <SlidersHorizontal size={15} color="var(--primary)" />
          Filtros Avançados
          <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-dim)', marginLeft: '0.5rem' }}>
            ({filteredRecords} de {totalRecords} exibidos)
          </span>
        </div>

        {hasActiveFilters && (
          <button 
            onClick={onClearFilters}
            className="chip-btn"
            style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', color: 'var(--accent-red)' }}
            type="button"
          >
            <RotateCcw size={12} /> Limpar Filtros
          </button>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
        {/* Busca por Data */}
        <div className="search-input-wrapper" style={{ minWidth: 'unset' }}>
          <Search 
            size={14} 
            style={{ position: 'absolute', left: '0.65rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} 
          />
          <input 
            type="text" 
            placeholder="Filtrar por data (ex: 2026-10)..." 
            className="search-input"
            value={searchTerm}
            onChange={onSearchChange}
            style={{ fontSize: '0.8125rem', padding: '0.5rem 0.65rem 0.5rem 2rem' }}
            aria-label="Filtrar data"
          />
        </div>

        {/* Taxa Mínima */}
        <div>
          <input 
            type="number" 
            placeholder="Taxa Mínima..." 
            className="search-input"
            value={minRateFilter}
            onChange={onMinRateChange}
            step="any"
            style={{ fontSize: '0.8125rem', padding: '0.5rem 0.75rem' }}
            aria-label="Filtrar taxa mínima"
          />
        </div>

        {/* Taxa Máxima */}
        <div>
          <input 
            type="number" 
            placeholder="Taxa Máxima..." 
            className="search-input"
            value={maxRateFilter}
            onChange={onMaxRateChange}
            step="any"
            style={{ fontSize: '0.8125rem', padding: '0.5rem 0.75rem' }}
            aria-label="Filtrar taxa máxima"
          />
        </div>
      </div>
    </div>
  );
}
