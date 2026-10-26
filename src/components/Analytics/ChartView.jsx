import React, { useState, useRef } from 'react';

export default function ChartView({ 
  data = [], 
  fromCurrency = 'USD', 
  toCurrency = 'BRL',
  amount = 1,
  isLoading = false 
}) {
  const [hoverIndex, setHoverIndex] = useState(null);
  const svgRef = useRef(null);

  if (isLoading) {
    return (
      <div className="chart-container">
        <div className="skeleton" style={{ height: '240px', width: '100%', borderRadius: 'var(--radius-md)' }}></div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div 
        className="chart-container" 
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '240px', 
          color: 'var(--text-muted)' 
        }}
      >
        <p style={{ fontWeight: 600 }}>Nenhum dado histórico disponível para este par.</p>
        <span style={{ fontSize: '0.8125rem', color: 'var(--text-dim)', marginTop: '0.25rem' }}>
          Tente selecionar outro intervalo ou outras moedas.
        </span>
      </div>
    );
  }

  const rates = data.map(d => d.rate);
  const min = Math.min(...rates);
  const max = Math.max(...rates);
  const range = max - min || (min * 0.05) || 1;
  const avg = rates.reduce((a, b) => a + b, 0) / rates.length;

  const width = 640;
  const height = 230;
  const paddingLeft = 55;
  const paddingRight = 25;
  const paddingTop = 25;
  const paddingBottom = 35;
  const innerWidth = width - paddingLeft - paddingRight;
  const innerHeight = height - paddingTop - paddingBottom;

  const points = data.map((d, index) => {
    const x = paddingLeft + (index / (data.length - 1 || 1)) * innerWidth;
    const y = paddingTop + innerHeight - ((d.rate - min) / range) * innerHeight;
    return { x, y, date: d.date, rate: d.rate };
  });

  const pathD = points.reduce((acc, pt, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`, '');
  const areaD = `${pathD} L ${points[points.length - 1].x.toFixed(1)} ${height - paddingBottom} L ${points[0].x.toFixed(1)} ${height - paddingBottom} Z`;

  // Linhas guia do Y
  const yAvg = paddingTop + innerHeight - ((avg - min) / range) * innerHeight;

  const activePoint = hoverIndex !== null && points[hoverIndex] ? points[hoverIndex] : null;

  return (
    <div className="chart-container" style={{ position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
        <div>
          <span>Par: <strong style={{ color: 'var(--text-main)' }}>{fromCurrency}/{toCurrency}</strong></span>
          <span style={{ marginLeft: '1rem' }}>Média: <strong style={{ color: 'var(--text-muted)' }}>{avg.toFixed(4)}</strong></span>
        </div>
        <div>
          <span style={{ color: 'var(--accent-cyan)' }}>● {data.length} cotações diárias</span>
        </div>
      </div>

      <svg 
        ref={svgRef}
        className="chart-svg" 
        viewBox={`0 0 ${width} ${height}`}
        onMouseLeave={() => setHoverIndex(null)}
      >
        <defs>
          <linearGradient id="chartGradientFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.38" />
            <stop offset="60%" stopColor="#3b82f6" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
          </linearGradient>
          <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#38bdf8" floodOpacity="0.5" />
          </filter>
        </defs>

        {/* Linhas de Grade Horizontais */}
        <line x1={paddingLeft} y1={paddingTop} x2={width - paddingRight} y2={paddingTop} stroke="var(--border-subtle)" strokeDasharray="3 3" />
        <text x={paddingLeft - 8} y={paddingTop + 4} fill="var(--text-dim)" fontSize="10" textAnchor="end" fontFamily="monospace">
          {max.toFixed(4)}
        </text>

        <line x1={paddingLeft} y1={yAvg} x2={width - paddingRight} y2={yAvg} stroke="rgba(59, 130, 246, 0.25)" strokeDasharray="4 4" />
        <text x={paddingLeft - 8} y={yAvg + 4} fill="var(--text-dim)" fontSize="10" textAnchor="end" fontFamily="monospace">
          {avg.toFixed(4)}
        </text>

        <line x1={paddingLeft} y1={height - paddingBottom} x2={width - paddingRight} y2={height - paddingBottom} stroke="var(--border-subtle)" />
        <text x={paddingLeft - 8} y={height - paddingBottom + 4} fill="var(--text-dim)" fontSize="10" textAnchor="end" fontFamily="monospace">
          {min.toFixed(4)}
        </text>

        {/* Eixo X - Primeira e última data */}
        <text x={paddingLeft} y={height - 12} fill="var(--text-dim)" fontSize="10" textAnchor="start">
          {data[0]?.date}
        </text>
        {data.length > 2 && (
          <text x={width / 2} y={height - 12} fill="var(--text-dim)" fontSize="10" textAnchor="middle">
            {data[Math.floor(data.length / 2)]?.date}
          </text>
        )}
        <text x={width - paddingRight} y={height - 12} fill="var(--text-dim)" fontSize="10" textAnchor="end">
          {data[data.length - 1]?.date}
        </text>

        {/* Área e Linha Principal */}
        <path d={areaD} fill="url(#chartGradientFill)" />
        <path 
          d={pathD} 
          fill="none" 
          stroke="#06b6d4" 
          strokeWidth="2.75" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          filter="url(#glowEffect)"
        />

        {/* Linha vertical do cursor / crosshair */}
        {activePoint && (
          <line 
            x1={activePoint.x} 
            y1={paddingTop} 
            x2={activePoint.x} 
            y2={height - paddingBottom} 
            stroke="#38bdf8" 
            strokeWidth="1.5" 
            strokeDasharray="3 3"
          />
        )}

        {/* Pontos Interativos e Zonas Invisíveis de Hover */}
        {points.map((pt, i) => (
          <g key={i}>
            {/* Círculo visível */}
            <circle 
              cx={pt.x} 
              cy={pt.y} 
              r={hoverIndex === i ? 6 : 3.5} 
              fill={hoverIndex === i ? '#ffffff' : '#06b6d4'} 
              stroke="#0f172a" 
              strokeWidth="2"
              style={{ transition: 'all 0.15s ease' }}
            />
            {/* Zona invisível ampla para capturar mouse touch com precisão */}
            <rect
              x={pt.x - innerWidth / (data.length * 2)}
              y={0}
              width={innerWidth / data.length || 20}
              height={height}
              fill="transparent"
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHoverIndex(i)}
            />
          </g>
        ))}
      </svg>

      {/* Tooltip Dinâmico Customizado */}
      {activePoint && (
        <div 
          className="glass-panel" 
          style={{
            position: 'absolute',
            left: `${(activePoint.x / width) * 100}%`,
            top: `${(activePoint.y / height) * 100 - 25}%`,
            transform: 'translate(-50%, -100%)',
            pointerEvents: 'none',
            padding: '0.5rem 0.75rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.75rem',
            minWidth: '130px',
            boxShadow: 'var(--shadow-md)',
            zIndex: 10,
            border: '1px solid var(--accent-cyan)'
          }}
        >
          <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>{activePoint.date}</div>
          <div style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '0.9rem', marginTop: '0.1rem' }}>
            1 {fromCurrency} = {activePoint.rate.toFixed(4)} {toCurrency}
          </div>
          {amount > 1 && (
            <div style={{ color: 'var(--accent-green)', fontSize: '0.75rem', marginTop: '0.2rem' }}>
              Total: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: toCurrency }).format(activePoint.rate * amount)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
