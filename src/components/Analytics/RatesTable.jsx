import React, { useState } from 'react';
import { Calendar, ArrowUpDown, Download, ChevronLeft, ChevronRight, TrendingUp, TrendingDown, FileSpreadsheet } from 'lucide-react';
import TableFilters from './TableFilters';

export default function RatesTable({ 
  data = [], 
  totalCount = 0,
  fromCurrency, 
  toCurrency, 
  amount = 100, 
  searchTerm = '', 
  onSearchChange,
  minRateFilter = '',
  onMinRateChange,
  maxRateFilter = '',
  onMaxRateChange,
  onClearFilters,
  sortField = 'date',
  sortOrder = 'desc',
  onSort,
  onExportCsv,
  isLoading = false 
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Calculo de paginacao
  const totalPages = Math.ceil(data.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = data.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const rates = data.map(d => d.rate);
  const minRate = rates.length > 0 ? Math.min(...rates) : 0;
  const maxRate = rates.length > 0 ? Math.max(...rates) : 0;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FileSpreadsheet size={18} color="var(--primary)" />
          Tabela Histórica de Cotações
        </h3>

        <button 
          className="export-csv-btn" 
          onClick={onExportCsv}
          type="button"
          disabled={data.length === 0}
          title="Exportar registros filtrados em CSV"
        >
          <Download size={16} />
          Exportar CSV ({data.length})
        </button>
      </div>

      {/* Componente de Filtros Avançados */}
      <TableFilters 
        searchTerm={searchTerm}
        onSearchChange={(e) => {
          setCurrentPage(1);
          onSearchChange && onSearchChange(e);
        }}
        minRateFilter={minRateFilter}
        onMinRateChange={(e) => {
          setCurrentPage(1);
          onMinRateChange && onMinRateChange(e);
        }}
        maxRateFilter={maxRateFilter}
        onMaxRateChange={(e) => {
          setCurrentPage(1);
          onMaxRateChange && onMaxRateChange(e);
        }}
        onClearFilters={() => {
          setCurrentPage(1);
          onClearFilters && onClearFilters();
        }}
        totalRecords={totalCount}
        filteredRecords={data.length}
      />

      <div className="data-table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th onClick={() => onSort && onSort('date')} title="Clique para alternar ordenação por data">
                Data <Calendar size={13} style={{ display: 'inline', verticalAlign: 'middle' }} />
                {sortField === 'date' && (
                  <span style={{ fontSize: '0.7rem', marginLeft: '0.25rem', color: 'var(--primary)' }}>
                    {sortOrder === 'asc' ? '▲' : '▼'}
                  </span>
                )}
              </th>
              <th>Par Cambial</th>
              <th onClick={() => onSort && onSort('rate')} title="Clique para alternar ordenação por taxa">
                Taxa de Câmbio <ArrowUpDown size={13} style={{ display: 'inline', verticalAlign: 'middle' }} />
                {sortField === 'rate' && (
                  <span style={{ fontSize: '0.7rem', marginLeft: '0.25rem', color: 'var(--primary)' }}>
                    {sortOrder === 'asc' ? '▲' : '▼'}
                  </span>
                )}
              </th>
              <th>Variação</th>
              <th>Total ({amount})</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              [1, 2, 3, 4, 5].map((i) => (
                <tr key={i}>
                  <td colSpan="5">
                    <div className="skeleton" style={{ height: '1.25rem', width: '90%', margin: '0 auto' }}></div>
                  </td>
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>
                  Nenhum registro encontrado para os filtros selecionados.
                </td>
              </tr>
            ) : (
              currentItems.map((row, idx) => {
                const prevRow = currentItems[idx + 1];
                const diff = prevRow ? row.rate - prevRow.rate : 0;
                const isRateMax = row.rate === maxRate && minRate !== maxRate;
                const isRateMin = row.rate === minRate && minRate !== maxRate;

                return (
                  <tr key={row.date}>
                    <td>
                      <span style={{ fontFamily: 'monospace', fontWeight: 500 }}>{row.date}</span>
                    </td>
                    <td>
                      <strong>{fromCurrency}</strong> &rarr; <strong>{toCurrency}</strong>
                    </td>
                    <td>
                      <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>
                        {row.rate.toFixed(4)}
                      </span>
                      {isRateMax && (
                        <span style={{ fontSize: '0.65rem', marginLeft: '0.4rem', color: 'var(--accent-green)', background: 'var(--accent-green-bg)', padding: '0.1rem 0.35rem', borderRadius: '4px' }}>
                          MÁX
                        </span>
                      )}
                      {isRateMin && (
                        <span style={{ fontSize: '0.65rem', marginLeft: '0.4rem', color: 'var(--accent-red)', background: 'var(--accent-red-bg)', padding: '0.1rem 0.35rem', borderRadius: '4px' }}>
                          MÍN
                        </span>
                      )}
                    </td>
                    <td>
                      {diff !== 0 ? (
                        <span style={{ 
                          display: 'inline-flex', 
                          alignItems: 'center', 
                          gap: '0.2rem', 
                          fontSize: '0.75rem',
                          color: diff > 0 ? 'var(--accent-green)' : 'var(--accent-red)'
                        }}>
                          {diff > 0 ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                          {diff > 0 ? `+${diff.toFixed(4)}` : diff.toFixed(4)}
                        </span>
                      ) : (
                        <span style={{ color: 'var(--text-dim)', fontSize: '0.75rem' }}>---</span>
                      )}
                    </td>
                    <td>
                      <strong>
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: toCurrency }).format(row.rate * (Number(amount) || 1))}
                      </strong>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Controles de Paginação */}
      {data.length > itemsPerPage && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem', padding: '0.5rem 0.25rem' }}>
          <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            Mostrando <strong>{startIndex + 1}</strong> a <strong>{Math.min(startIndex + itemsPerPage, data.length)}</strong> de <strong>{data.length}</strong> registros
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button 
              className="chip-btn" 
              onClick={handlePrevPage} 
              disabled={currentPage === 1}
              style={{ opacity: currentPage === 1 ? 0.4 : 1, display: 'flex', alignItems: 'center', gap: '0.25rem' }}
            >
              <ChevronLeft size={14} /> Anterior
            </button>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, padding: '0 0.5rem' }}>
              {currentPage} / {totalPages}
            </span>
            <button 
              className="chip-btn" 
              onClick={handleNextPage} 
              disabled={currentPage === totalPages}
              style={{ opacity: currentPage === totalPages ? 0.4 : 1, display: 'flex', alignItems: 'center', gap: '0.25rem' }}
            >
              Próximo <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
