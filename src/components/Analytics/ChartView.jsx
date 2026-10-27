import React, { useState, useRef, useEffect } from 'react';

export default function ChartView({
  data = [],
  fromCurrency = 'USD',
  toCurrency = 'BRL',
  amount = 1,
  isLoading = false
}) {
  const [hoverIndex, setHoverIndex] = useState(null);
  const [animated, setAnimated] = useState(false);
  const svgRef = useRef(null);
  const pathRef = useRef(null);

  // Trigger animation when data loads
  useEffect(() => {
    if (data && data.length > 0) {
      setAnimated(false);
      const id = requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimated(true));
      });
      return () => cancelAnimationFrame(id);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="chart-container">
        <div className="skeleton" style={{ height: '240px', width: '100%', borderRadius: 'var(--radius-md)' }} />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="chart-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '240px', color: 'var(--text-muted)' }}>
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

  const lastRate = rates[rates.length - 1];
  const firstRate = rates[0];
  const trendUp = lastRate >= firstRate;

  const width = 640;
  const height = 230;
  const paddingLeft = 62;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 38;
  const innerWidth = width - paddingLeft - paddingRight;
  const innerHeight = height - paddingTop - paddingBottom;

  const toX = (index) => paddingLeft + (index / Math.max(data.length - 1, 1)) * innerWidth;
  const toY = (rate) => paddingTop + innerHeight - ((rate - min) / range) * innerHeight;

  const points = data.map((d, i) => ({ x: toX(i), y: toY(d.rate), date: d.date, rate: d.rate }));

  // Smooth cubic bezier path
  const pathD = points.reduce((acc, pt, i) => {
    if (i === 0) return `M ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`;
    const prev = points[i - 1];
    const cpX = (prev.x + pt.x) / 2;
    return `${acc} C ${cpX.toFixed(1)} ${prev.y.toFixed(1)}, ${cpX.toFixed(1)} ${pt.y.toFixed(1)}, ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x.toFixed(1)} ${height - paddingBottom} L ${points[0].x.toFixed(1)} ${height - paddingBottom} Z`;

  const lineColor = trendUp ? '#10b981' : '#f43f5e';
  const gradientId = trendUp ? 'chartGradientGreen' : 'chartGradientRed';
  const lineStart = trendUp ? '#34d399' : '#f87171';
  const lineEnd = trendUp ? '#059669' : '#e11d48';

  // Y axis labels (4 ticks)
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map(t => min + t * range);

  const activePoint = hoverIndex !== null && points[hoverIndex] ? points[hoverIndex] : null;

  return (
    <div className="chart-container" style={{ position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <div style={{ display: 'flex', gap: '1.25rem', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
          <span>Par: <strong style={{ color: 'var(--text-main)' }}>{fromCurrency}/{toCurrency}</strong></span>
          <span>Média: <strong style={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>{avg.toFixed(4)}</strong></span>
          <span>Pontos: <strong style={{ color: 'var(--text-muted)' }}>{data.length}</strong></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: lineColor, display: 'inline-block', boxShadow: `0 0 6px ${lineColor}` }} />
          <span style={{ color: trendUp ? 'var(--accent-green)' : 'var(--accent-red)', fontWeight: 600 }}>
            {trendUp ? '▲ Em alta' : '▼ Em baixa'}
          </span>
        </div>
      </div>

      <svg
        ref={svgRef}
        className="chart-svg"
        viewBox={`0 0 ${width} ${height}`}
        onMouseLeave={() => setHoverIndex(null)}
      >
        <defs>
          <linearGradient id="chartGradientGreen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.32" />
            <stop offset="70%" stopColor="#059669" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id="chartGradientRed" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.28" />
            <stop offset="70%" stopColor="#e11d48" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#e11d48" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={lineStart} />
            <stop offset="100%" stopColor={lineEnd} />
          </linearGradient>
          <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor={lineColor} floodOpacity="0.55" />
          </filter>
        </defs>

        {/* Y-axis grid lines and labels */}
        {yTicks.map((tickVal, i) => {
          const yPos = toY(tickVal);
          return (
            <g key={i}>
              <line
                x1={paddingLeft}
                y1={yPos}
                x2={width - paddingRight}
                y2={yPos}
                stroke="var(--border-subtle)"
                strokeDasharray={i === 0 ? 'none' : '3 4'}
                strokeWidth={i === 0 ? 1 : 0.75}
              />
              <text
                x={paddingLeft - 6}
                y={yPos + 4}
                fill="var(--text-dim)"
                fontSize="9"
                textAnchor="end"
                fontFamily="JetBrains Mono, monospace"
              >
                {tickVal.toFixed(3)}
              </text>
            </g>
          );
        })}

        {/* Avg reference line */}
        <line
          x1={paddingLeft} y1={toY(avg)}
          x2={width - paddingRight} y2={toY(avg)}
          stroke="rgba(56,189,248,0.35)"
          strokeDasharray="5 4"
          strokeWidth="1"
        />

        {/* X axis dates */}
        <text x={paddingLeft} y={height - 18} fill="var(--text-dim)" fontSize="9.5" textAnchor="start" fontFamily="monospace">
          {data[0]?.date}
        </text>
        {data.length > 4 && (
          <text x={width / 2} y={height - 18} fill="var(--text-dim)" fontSize="9.5" textAnchor="middle" fontFamily="monospace">
            {data[Math.floor(data.length / 2)]?.date}
          </text>
        )}
        <text x={width - paddingRight} y={height - 18} fill="var(--text-dim)" fontSize="9.5" textAnchor="end" fontFamily="monospace">
          {data[data.length - 1]?.date}
        </text>

        {/* Area fill */}
        <path d={areaD} fill={`url(#${gradientId})`} style={{ transition: 'opacity 0.4s ease' }} />

        {/* Main line with animation */}
        <path
          ref={pathRef}
          d={pathD}
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="2.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glowEffect)"
          style={{
            strokeDasharray: animated ? 'none' : '1000',
            strokeDashoffset: animated ? '0' : '1000',
            transition: animated ? 'stroke-dashoffset 1.2s ease-in-out, stroke-dasharray 1.2s' : 'none',
          }}
        />

        {/* Vertical crosshair */}
        {activePoint && (
          <line
            x1={activePoint.x} y1={paddingTop}
            x2={activePoint.x} y2={height - paddingBottom}
            stroke="rgba(56,189,248,0.5)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
        )}

        {/* Hover zones and dots */}
        {points.map((pt, i) => (
          <g key={i}>
            <circle
              cx={pt.x} cy={pt.y}
              r={hoverIndex === i ? 6 : (data.length > 30 ? 0 : 3)}
              fill={hoverIndex === i ? '#ffffff' : lineColor}
              stroke={hoverIndex === i ? lineColor : '#0f172a'}
              strokeWidth="2"
              style={{ transition: 'r 0.12s ease' }}
            />
            <rect
              x={pt.x - innerWidth / (data.length * 2)}
              y={0}
              width={innerWidth / data.length || 20}
              height={height}
              fill="transparent"
              style={{ cursor: 'crosshair' }}
              onMouseEnter={() => setHoverIndex(i)}
            />
          </g>
        ))}
      </svg>

      {/* Tooltip */}
      {activePoint && (
        <div
          className="glass-panel"
          style={{
            position: 'absolute',
            left: `${(activePoint.x / width) * 100}%`,
            top: `${((activePoint.y / height) * 100) - 8}%`,
            transform: 'translate(-50%, -100%)',
            pointerEvents: 'none',
            padding: '0.6rem 0.875rem',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.75rem',
            minWidth: '145px',
            boxShadow: 'var(--shadow-lg)',
            zIndex: 20,
            border: `1px solid ${lineColor}`,
            background: 'var(--surface-card)',
          }}
        >
          <div style={{ color: 'var(--text-muted)', fontSize: '0.68rem', marginBottom: '0.2rem' }}>{activePoint.date}</div>
          <div style={{ fontWeight: 800, color: 'var(--text-main)', fontSize: '0.9375rem', fontFamily: 'JetBrains Mono, monospace' }}>
            {activePoint.rate.toFixed(4)}
          </div>
          <div style={{ color: 'var(--text-dim)', fontSize: '0.68rem', marginTop: '0.15rem' }}>
            1 {fromCurrency} = {activePoint.rate.toFixed(4)} {toCurrency}
          </div>
          {amount > 1 && (
            <div style={{ color: lineColor, fontSize: '0.75rem', marginTop: '0.25rem', fontWeight: 700 }}>
              {new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 }).format(activePoint.rate * amount)} {toCurrency}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
