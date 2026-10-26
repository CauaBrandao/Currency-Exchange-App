import React from 'react';

export default function AmountInput({ 
  amount, 
  onChange, 
  currency = "USD", 
  label = "Valor a converter",
  disabled = false 
}) {
  return (
    <div className="input-group">
      <label htmlFor="amount-input-field" className="input-label">{label}</label>
      <div className="amount-input-wrapper">
        <span className="amount-currency-symbol">
          {currency === 'BRL' ? 'R$' : currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '$'}
        </span>
        <input 
          id="amount-input-field"
          type="number" 
          className="amount-input" 
          value={amount} 
          onChange={onChange}
          placeholder="0.00"
          min="0.01"
          step="any"
          disabled={disabled}
        />
      </div>
    </div>
  );
}
