import React from 'react';
import {
  ArrowRight, ShieldCheck, Globe, CreditCard, TrendingUp,
  Percent, Smartphone, CheckCircle, Zap, Star, Sparkles
} from 'lucide-react';
import BrandLogo from '../Header/BrandLogo';

export default function NomadLandingPage({ onStartUsing, onOpenAuth }) {
  return (
    <div className="nomad-landing-container animate-fade-in">
      {/* ================= HERO SECTION (ESTILO NOMAD) ================= */}
      <section className="nomad-hero">
        <div className="nomad-hero-content">
          <div className="nomad-badge">
            <Sparkles size={14} color="var(--primary)" />
            <span>Conta Global &bull; Câmbio Comercial &bull; IOF 1.1%</span>
          </div>

          <h1 className="nomad-hero-title">
            Sua vida financeira global, <br />
            <span className="nomad-hero-gradient">simples como deve ser.</span>
          </h1>

          <p className="nomad-hero-subtitle">
            Abra sua conta internacional em minutos, converta moedas em tempo real com spread reduzido,
            economize em compras no exterior e viaje pelo mundo com cartão aceito em mais de 180 países.
          </p>

          <div className="nomad-hero-cta-group">
            <button className="nomad-cta-primary" onClick={onStartUsing}>
              <span>Acessar Plataforma de Câmbio</span>
              <ArrowRight size={18} />
            </button>
            <button className="nomad-cta-secondary" onClick={() => onOpenAuth('register')}>
              <span>Abrir Conta Grátis</span>
            </button>
          </div>

          <div className="nomad-hero-social-proof">
            <div className="proof-avatars">
              <span className="proof-avatar" style={{ background: '#3b82f6' }}>🇺🇸</span>
              <span className="proof-avatar" style={{ background: '#10b981' }}>🇧🇷</span>
              <span className="proof-avatar" style={{ background: '#8b5cf6' }}>🇪🇺</span>
              <span className="proof-avatar" style={{ background: '#f59e0b' }}>🇬🇧</span>
            </div>
            <div className="proof-text">
              <div className="proof-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>
              <span>Mais de <strong>2.5 milhões</strong> de conversões realizadas com segurança</span>
            </div>
          </div>
        </div>

        {/* Hero Preview Card Interativo estilo Cartão Nomad */}
        <div className="nomad-hero-visual">
          <div className="nomad-glass-card">
            {/* Visual do Cartão Brand Finance Nomad */}
            <div className="nomad-virtual-card">
              <div className="nomad-card-top">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <BrandLogo size={28} />
                  <span style={{ fontWeight: 800, fontSize: '0.9rem', letterSpacing: '-0.02em', color: '#fff' }}>
                    Brand Finance
                  </span>
                </div>
                <span className="card-chip-badge">DEBIT GLOBAL</span>
              </div>

              <div className="nomad-card-chip"></div>

              <div className="nomad-card-number">
                &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; 2026
              </div>

              <div className="nomad-card-bottom">
                <div>
                  <div className="card-label">TITULAR</div>
                  <div className="card-val">GLOBAL CITIZEN</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="card-label">VALIDADE</div>
                  <div className="card-val">10/32</div>
                </div>
              </div>
            </div>

            {/* Cotação Comparativa Nomad */}
            <div className="nomad-comparison-box">
              <div className="comparison-header">
                <span className="comp-badge-save">ECONOMIA DE ATÉ 10%</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>vs. Bancos Tradicionais</span>
              </div>
              <div className="comparison-row">
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>Dólar Comercial Brand Finance</div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--accent-green)' }}>
                    R$ 5,58 <span style={{ fontSize: '0.75rem', fontWeight: 500 }}>(IOF 1.1%)</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>Cartão de Crédito Comum</div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--accent-red)', textDecoration: 'line-through' }}>
                    R$ 6,05 <span style={{ fontSize: '0.75rem', fontWeight: 500 }}>(IOF 4.38%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= BENEFÍCIOS NOMAD BENTO GRID ================= */}
      <section className="nomad-benefits-section">
        <div className="section-center-header">
          <h2 className="section-main-heading">Por que escolher o Brand Finance?</h2>
          <p className="section-sub-heading">
            Tudo o que você precisa para gerenciar dinheiro pelo mundo em uma única plataforma moderna.
          </p>
        </div>

        <div className="nomad-bento-grid">
          <div className="bento-item glass-panel">
            <div className="bento-icon-wrapper" style={{ background: 'rgba(56, 189, 248, 0.15)', color: 'var(--primary)' }}>
              <Percent size={24} />
            </div>
            <h3>Câmbio com Dólar Comercial</h3>
            <p>
              Esqueça o dólar turismo abusivo. Economize muito mais convertendo com a cotação comercial oficial do mercado internacional.
            </p>
          </div>

          <div className="bento-item glass-panel">
            <div className="bento-icon-wrapper" style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-green)' }}>
              <Globe size={24} />
            </div>
            <h3>Aceito em mais de 180 Países</h3>
            <p>
              Use seu saldo para compras online em sites internacionais ou presencialmente em viagens, com conversão automática sem taxas surpresa.
            </p>
          </div>

          <div className="bento-item glass-panel">
            <div className="bento-icon-wrapper" style={{ background: 'rgba(245, 158, 11, 0.15)', color: 'var(--accent-amber)' }}>
              <ShieldCheck size={24} />
            </div>
            <h3>Garantia &amp; Segurança Bancária</h3>
            <p>
              Seus fundos são assegurados com proteção equivalente às principais instituições financeiras globais e criptografia de ponta.
            </p>
          </div>

          <div className="bento-item glass-panel">
            <div className="bento-icon-wrapper" style={{ background: 'rgba(129, 140, 248, 0.15)', color: 'var(--accent-violet)' }}>
              <Zap size={24} />
            </div>
            <h3>Conversões Instantâneas</h3>
            <p>
              Câmbio em segundos no aplicativo ou web. Salve suas moedas favoritas e defina alertas de cotação para não perder o melhor momento.
            </p>
          </div>
        </div>
      </section>

      {/* ================= PASSO A PASSO COMO FUNCIONA ================= */}
      <section className="nomad-steps-section">
        <div className="section-center-header">
          <h2 className="section-main-heading">Como funciona o Brand Finance</h2>
          <p className="section-sub-heading">Em apenas 3 passos você já está pronto para converter e economizar.</p>
        </div>

        <div className="nomad-steps-grid">
          <div className="step-card glass-panel">
            <div className="step-number">01</div>
            <h4>Crie sua Conta Global</h4>
            <p>Faça seu cadastro 100% digital e gratuito em menos de 2 minutos usando apenas seu documento.</p>
          </div>

          <div className="step-card glass-panel">
            <div className="step-number">02</div>
            <h4>Adicione Saldo via PIX</h4>
            <p>Transfira em reais instantaneamente sem custo e tenha seu dinheiro pronto para conversão a qualquer hora.</p>
          </div>

          <div className="step-card glass-panel">
            <div className="step-number">03</div>
            <h4>Converta e Aproveite</h4>
            <p>Converta para USD, EUR, GBP e mais de 20 moedas com cotação comercial garantida e use onde quiser.</p>
          </div>
        </div>
      </section>

      {/* ================= CTA FINAL NOMAD ================= */}
      <section className="nomad-final-cta-section glass-panel">
        <div className="final-cta-content">
          <h2>Pronto para economizar no câmbio?</h2>
          <p>
            Experimente agora o conversor em tempo real do Brand Finance ou abra sua conta gratuita hoje mesmo.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1.5rem' }}>
            <button className="nomad-cta-primary" onClick={onStartUsing}>
              Abrir Conversor Agora
            </button>
            <button className="nomad-cta-secondary" onClick={() => onOpenAuth('payment')}>
              Ver Planos Black &amp; Benefícios
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

