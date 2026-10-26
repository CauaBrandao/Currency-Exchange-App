import React from 'react';
import { Calendar, ArrowUpDown, Download, Search } from 'lucide-react';

export default function RatesTable({ 
  data = [], 
  fromCurrency, 
  toCurrency, 
  amount = 100, 
  searchTerm = '', 
  onSearchChange,
  sortField = 'date',
  sortOrder = 'desc',
  onSort,
  onExportCsv,
  isLoading = false 
}) {
  return (
    <div>
      <div className="table-controls">
        <div className="search-input-wrapper">
          <Search 
            size={16} 
            style={{ 
              position: 'absolute', 
              left: '0.75rem', 
              top: '50%', 
              transform: 'translateY(-50%)', 
              color: 'var(--text-dim)' 
            }} 
          />
          <input 
            type="text" 
            placeholder="Filtrar por data (ex: 2026-10)..." 
            className="search-input"
            value={searchTerm}
            onChange={onSearchChange}
            aria-label="Filtrar registros por data"
          />
        </div>

        <button 
          className="export-csv-btn" 
          onClick={onExportCsv}
          type="button"
          disabled={data.length === 0}
        >
          <Download size={16} />
          Exportar CSV
        </button>
      </div>

      <div className="data-table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th onClick={() => onSort && onSort('date')}>
                Data <Calendar size={13} style={{ display: 'inline', verticalAlign: 'middle' }} />
                {sortField === 'date' && (
                  <span style={{ fontSize: '0.7rem', marginLeft: '0.25rem' }}>
                    {sortOrder === 'asc' ? '▲' : '▼'}
                  </span>
                )}
              </th>
              <th>Moeda Base</th>
              <th>Moeda Alvo</th>
              <th onClick={() => onSort && onSort('rate')}>
                Taxa de Câmbio <ArrowUpDown size={13} style={{ display: 'inline', verticalAlign: 'middle' }} />
                {sortField === 'rate' && (
                  <span style={{ fontSize: '0.7rem', marginLeft: '0.25rem' }}>
                    {sortOrder === 'asc' ? '▲' : '▼'}
                  </span>
                )}
              </th>
              <th>Total ({amount})</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>
                  <div className="skeleton" style={{ height: '1.5rem', width: '60%', margin: '0 auto' }}></div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                  Nenhum registro encontrado para o filtro aplicado.
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr key={row.date}>
                  <td>{row.date}</td>
                  <td><strong>{fromCurrency}</strong></td>
                  <td><strong>{toCurrency}</strong></td>
                  <td>{row.rate.toFixed(4)}</td>
                  <td>
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: toCurrency }).format(row.rate * amount)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
