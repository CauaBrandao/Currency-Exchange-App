import React from 'react';

export default function TimeframeTabs({ 
  timeframes = ['7D', '15D', '30D', '90D', '1A', '5A'], 
  selectedTimeframe, 
  onSelectTimeframe 
}) {
  return (
    <div className="timeframe-selector" role="tablist" aria-label="Seletor de período">
      {timeframes.map((tf) => (
        <button 
          key={tf} 
          className={`timeframe-btn ${selectedTimeframe === tf ? 'active' : ''}`}
          role="tab"
          aria-selected={selectedTimeframe === tf}
          onClick={() => onSelectTimeframe && onSelectTimeframe(tf)}
          type="button"
        >
          {tf}
        </button>
      ))}
    </div>
  );
}
