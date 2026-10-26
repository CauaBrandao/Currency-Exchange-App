import React from 'react';

export default function CurrencySelect({ 
  label, 
  value, 
  onChange, 
  currencies = {}, 
  ariaLabel 
}) {
  return (
    <div className="select-wrapper">
      <label className="input-label" style={{ marginBottom: '0.2rem' }}>{label}</label>
      <select 
        className="currency-select" 
        value={value} 
        onChange={onChange}
        aria-label={ariaLabel || label}
      >
        {Object.entries(currencies).map(([code, name]) => (
          <option key={code} value={code}>
            {code} - {name}
          </option>
        ))}
      </select>
    </div>
  );
}
