import React from 'react';
import { Clock } from 'lucide-react';

export default function ConversionResult({ 
  result, 
  rate, 
  fromCurrency, 
  toCurrency, 
  date,
  isLoading = false 
}) {
  const formatCurrency = (val, curr) => {
    try {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: curr
      }).format(val);
    } catch {
      return `${curr} ${Number(val).toFixed(2)}`;
    }
  };

  return (
    <div className="result-box">
      <div className="result-label">Valor Convertido Estimado</div>
      {isLoading ? (
        <div className="skeleton" style={{ height: '2.5rem', width: '70%', margin: '0.25rem 0' }}></div>
      ) : (
        <div className="result-value">
          {formatCurrency(result, toCurrency)}
        </div>
      )}
      <div className="result-rate">
        <Clock size={14} />
        <span>1 {fromCurrency} = {rate ? rate.toFixed(4) : '---'} {toCurrency}</span>
        {date && (
          <span style={{ color: 'var(--text-dim)', marginLeft: 'auto' }}>
            {date}
          </span>
        )}
      </div>
    </div>
  );
}
