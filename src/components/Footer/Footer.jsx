import React from 'react';

export default function Footer() {
  return (
    <footer className="app-footer">
      <p>
        <strong>Currency Exchange App</strong> &bull; Single Page Application em React &bull; Dados Oficiais do Banco Central Europeu via 
        <a 
          href="https://api.frankfurter.app" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ color: 'var(--primary)', marginLeft: '0.35rem', textDecoration: 'none', fontWeight: 600 }}
        >
          Frankfurter API
        </a> &bull; Senac SP 2026
      </p>
    </footer>
  );
}
