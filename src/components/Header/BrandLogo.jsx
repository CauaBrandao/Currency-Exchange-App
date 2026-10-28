import React from 'react';

export default function BrandLogo({ size = 38, className = "" }) {
  return (
    <div
      className={`brand-logo-container ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        flexShrink: 0
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="bfGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>
          <linearGradient id="bfGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
          <filter id="bfGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#38bdf8" floodOpacity="0.35" />
          </filter>
        </defs>

        {/* Outer squircle background */}
        <rect
          x="2"
          y="2"
          width="40"
          height="40"
          rx="12"
          fill="url(#bfGrad1)"
          filter="url(#bfGlow)"
        />

        {/* Global coin / orbits ring overlay */}
        <ellipse
          cx="22"
          cy="22"
          rx="15"
          ry="7"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1.2"
          transform="rotate(-25 22 22)"
          fill="none"
        />

        {/* Dynamic Stylized Monogram B & F intertwined */}
        {/* Modern geometric B stem */}
        <path
          d="M13 11H22C24.5 11 26 12.3 26 14.5C26 16.2 24.8 17.4 23.2 17.8C25.3 18.2 26.8 19.6 26.8 22C26.8 24.8 24.6 26.5 21.6 26.5H13V11ZM17.2 14.5V17.2H21.2C22.2 17.2 22.8 16.7 22.8 15.8C22.8 15 22.2 14.5 21.2 14.5H17.2ZM17.2 20.2V23.2H21.8C22.8 23.2 23.5 22.6 23.5 21.7C23.5 20.8 22.8 20.2 21.8 20.2H17.2Z"
          fill="#ffffff"
        />

        {/* Currency Ascending Slash / Arrow symbol for F & Growth */}
        <path
          d="M23 27L29 11H33L27 27H23Z"
          fill="url(#bfGrad2)"
        />
        <path
          d="M24 19H32V22.2H24V19Z"
          fill="#ffffff"
          opacity="0.9"
        />

        {/* Glowing node at the top right */}
        <circle cx="31" cy="11" r="2.2" fill="#ffffff" />
      </svg>
    </div>
  );
}

