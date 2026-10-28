import React from 'react';
import { Coins, ArrowRightLeft, Star } from 'lucide-react';
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
  favoriteCurrencies = ['USD', 'BRL', 'EUR'],
  onToggleCurrencyFavorite,
  isLoading = false,
  subtitle = "Taxas de Câmbio Comerciais"
}) {
  return (
    <div className="glass-panel converter-card">
      <div className="card-header">
        <div>
          <h2 className="card-title">
            <Coins size={20} color="var(--primary)" />
            Conversor Oficial Brand Finance
          </h2>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
            {subtitle}
          </span>
        </div>

        {/* Atalhos para moedas favoritas rápidas */}
        {favoriteCurrencies && favoriteCurrencies.length > 0 && (
          <div className="favorite-currencies-bar">
            <span className="fav-label"><Star size={11} fill="var(--accent-amber)" color="var(--accent-amber)" /> Favoritas:</span>
            <div className="fav-chips-group">
              {favoriteCurrencies.map(curr => (
                <button
                  key={curr}
                  type="button"
                  className={`fav-chip ${toCurrency === curr ? 'active' : ''}`}
                  onClick={() => onToCurrencyChange({ target: { value: curr } })}
                  title={`Converter para ${curr}`}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <AmountInput 
        amount={amount} 
        onChange={onAmountChange} 
        currency={fromCurrency}
      />

      <div className="currency-pair-row">
        <CurrencySelect 
          label="DE (ORIGEM)" 
          value={fromCurrency} 
          onChange={onFromCurrencyChange} 
          currencies={currencies}
          isFavorite={favoriteCurrencies.includes(fromCurrency)}
          onToggleFavorite={onToggleCurrencyFavorite}
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
          label="PARA (DESTINO)" 
          value={toCurrency} 
          onChange={onToCurrencyChange} 
          currencies={currencies}
          isFavorite={favoriteCurrencies.includes(toCurrency)}
          onToggleFavorite={onToggleCurrencyFavorite}
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
