import React from 'react';
import BrandLogo from '../Header/BrandLogo';

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-content-wrap">
        <div className="footer-brand-line">
          <BrandLogo size={24} />
          <strong style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>Brand Finance</strong>
          <span>&bull; Soluções Globais de Câmbio &amp; Tecnologia Financeira</span>
        </div>
        <p className="footer-disclaimer">
          Single Page Application em React 19 &bull; Dados oficiais do Banco Central Europeu via{' '}
          <a
            href="https://api.frankfurter.app"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}
          >
            Frankfurter API
          </a>{' '}
          &bull; Desenvolvido para fins educacionais e profissionais &bull; Senac SP 2026
        </p>
      </div>
    </footer>
  );
}
