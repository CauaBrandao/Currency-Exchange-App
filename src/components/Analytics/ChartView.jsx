import React from 'react';

export default function ChartView({ 
  data = [], 
  fromCurrency = 'USD', 
  toCurrency = 'BRL',
  isLoading = false 
}) {
  if (isLoading) {
    return (
      <div className="chart-container">
        <div className="skeleton" style={{ height: '220px', width: '100%' }}></div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="chart-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '220px', color: 'var(--text-muted)' }}>
        Nenhum dado histórico disponível para exibição.
      </div>
    );
  }

  const rates = data.map(d => d.rate);
  const min = Math.min(...rates);
  const max = Math.max(...rates);
  const range = max - min || 1;

  // Gerar coordenadas para o viewBox 0 0 600 200
  const width = 600;
  const height = 200;
  const paddingX = 40;
  const paddingY = 30;
  const innerWidth = width - paddingX * 2;
  const innerHeight = height - paddingY * 2;

  const points = data.map((d, index) => {
    const x = paddingX + (index / (data.length - 1 || 1)) * innerWidth;
    const y = height - paddingY - ((d.rate - min) / range) * innerHeight;
    return { x, y, date: d.date, rate: d.rate };
  });

  const pathD = points.reduce((acc, pt, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`, '');
  const areaD = `${pathD} L ${points[points.length - 1].x.toFixed(1)} ${height - paddingY} L ${points[0].x.toFixed(1)} ${height - paddingY} Z`;

  return (
    <div className="chart-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '0.5rem' }}>
        <span>Alta: {max.toFixed(4)} {toCurrency}</span>
        <span>Média: {((max + min) / 2).toFixed(4)} {toCurrency}</span>
        <span>Baixa: {min.toFixed(4)} {toCurrency}</span>
      </div>

      <svg className="chart-svg" viewBox={`0 0 ${width} ${height}`}>
        <defs>
          <linearGradient id="chartGradientLine" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Linhas de grade sutis */}
        <line x1={paddingX} y1={paddingY} x2={width - paddingX} y2={paddingY} stroke="var(--border-subtle)" strokeDasharray="3 3" />
        <line x1={paddingX} y1={height / 2} x2={width - paddingX} y2={height / 2} stroke="var(--border-subtle)" strokeDasharray="3 3" />
        <line x1={paddingX} y1={height - paddingY} x2={width - paddingX} y2={height - paddingY} stroke="var(--border-subtle)" />

        {/* Area preenchida */}
        <path d={areaD} fill="url(#chartGradientLine)" />

        {/* Linha principal */}
        <path 
          d={pathD} 
          fill="none" 
          stroke="#38bdf8" 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />

        {/* Pontos interativos com tooltip nativo */}
        {points.map((pt, i) => (
          <g key={i}>
            <circle 
              cx={pt.x} 
              cy={pt.y} 
              r="4.5" 
              fill="#38bdf8" 
              stroke="var(--bg-app)" 
              strokeWidth="2"
              style={{ cursor: 'pointer', transition: 'r 0.15s ease' }}
            >
              <title>{`${pt.date}: 1 ${fromCurrency} = ${pt.rate.toFixed(4)} ${toCurrency}`}</title>
            </circle>
          </g>
        ))}
      </svg>
    </div>
  );
}
