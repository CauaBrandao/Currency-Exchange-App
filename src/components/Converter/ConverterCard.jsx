import React from 'react';
import { Coins, ArrowRightLeft } from 'lucide-react';
import AmountInput from './AmountInput';
import CurrencySelect from './CurrencySelect';
import ConversionResult from './ConversionResult';
import PopularPairs from './PopularPairs';
import RecentConversions from './RecentConversions';

export default function ConverterCard({
  amount,
  onAmountChange,
  fromCurrency,
  onFromCurrencyChange,
  toCurrency,
  onToCurrencyChange,
  onSwap,
  currencies,
  conversion,
  popularPairs,
  onSelectPair,
  recents = [],
  favorites = [],
  onToggleFavorite,
  isLoading = false,
  subtitle = "Taxas de Câmbio"
}) {
  return (
    <div className="glass-panel converter-card">
      <div className="card-header">
        <h2 className="card-title">
          <Coins size={20} color="var(--primary)" />
          Conversor de Câmbio
        </h2>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
          {subtitle}
        </span>
      </div>

      <AmountInput 
        amount={amount} 
        onChange={onAmountChange} 
        currency={fromCurrency}
      />

      <div className="currency-pair-row">
        <CurrencySelect 
          label="De" 
          value={fromCurrency} 
          onChange={onFromCurrencyChange} 
          currencies={currencies} 
        />

        <button 
          className="swap-button" 
          title="Inverter moedas" 
          aria-label="Inverter moedas"
          onClick={onSwap}
          type="button"
        >
          <ArrowRightLeft size={18} />
        </button>

        <CurrencySelect 
          label="Para" 
          value={toCurrency} 
          onChange={onToCurrencyChange} 
          currencies={currencies} 
        />
      </div>

      <ConversionResult 
        result={conversion.result}
        rate={conversion.rate}
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        date={conversion.date}
        isLoading={isLoading}
      />

      <PopularPairs 
        pairs={popularPairs} 
        onSelectPair={onSelectPair} 
      />

      <RecentConversions 
        recents={recents}
        favorites={favorites}
        onSelectPair={onSelectPair}
        onToggleFavorite={onToggleFavorite}
        currentFrom={fromCurrency}
        currentTo={toCurrency}
      />
    </div>
  );
}
