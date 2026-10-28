import React, { useState } from 'react';
import { X, CheckCircle2, Lock, CreditCard, Sparkles } from 'lucide-react';

export default function AuthAndPaymentModal({
  isOpen,
  mode = 'login', // 'login' | 'payment'
  onClose
}) {
  const [activeTab, setActiveTab] = useState(mode === 'payment' ? 'payment' : 'login');
  const [isSuccess, setIsSuccess] = useState(false);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [plan, setPlan] = useState('pro');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="auth-modal-close" onClick={onClose} aria-label="Fechar">
          <X size={20} />
        </button>

        <div className="auth-modal-tabs">
          <button
            className={`auth-modal-tab ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => { setActiveTab('login'); setIsSuccess(false); }}
          >
            Entrar
          </button>
          <button
            className={`auth-modal-tab ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => { setActiveTab('register'); setIsSuccess(false); }}
          >
            Criar Conta
          </button>
          <button
            className={`auth-modal-tab ${activeTab === 'payment' ? 'active' : ''}`}
            onClick={() => { setActiveTab('payment'); setIsSuccess(false); }}
          >
            <CreditCard size={14} style={{ display: 'inline', marginRight: 4 }} />
            Pagamentos & Planos
          </button>
        </div>

        {isSuccess ? (
          <div className="auth-modal-success animate-fade-in">
            <CheckCircle2 size={48} color="var(--accent-green)" />
            <h3>
              {activeTab === 'payment'
                ? 'Assinatura Ativada com Sucesso!'
                : activeTab === 'register'
                  ? 'Conta Criada com Sucesso!'
                  : 'Login Efetuado com Sucesso!'}
            </h3>
            <p>Seus dados foram processados com segurança pelo Brand Finance.</p>
          </div>
        ) : (
          <form className="auth-modal-form" onSubmit={handleSubmit}>
            {activeTab === 'payment' && (
              <div className="payment-plans-section">
                <div className="payment-title">Escolha seu Plano Brand Finance:</div>
                <div className="payment-plans-grid">
                  <div
                    className={`payment-plan-card ${plan === 'free' ? 'selected' : ''}`}
                    onClick={() => setPlan('free')}
                  >
                    <div className="plan-name">Global Free</div>
                    <div className="plan-price">R$ 0<span>/mês</span></div>
                    <div className="plan-desc">Câmbio comercial, alertas básicos e até 5 moedas salvas.</div>
                  </div>
                  <div
                    className={`payment-plan-card ${plan === 'pro' ? 'selected' : ''}`}
                    onClick={() => setPlan('pro')}
                  >
                    <div className="plan-badge">RECOMENDADO</div>
                    <div className="plan-name">Brand Black Global</div>
                    <div className="plan-price">R$ 29,90<span>/mês</span></div>
                    <div className="plan-desc">Spread reduzido a 1%, cartão internacional sem anuidade e IOF 1.1%.</div>
                  </div>
                </div>

                <div className="input-group" style={{ marginTop: '1rem' }}>
                  <label className="input-label">Dados do Cartão de Crédito</label>
                  <input
                    type="text"
                    className="modal-text-input"
                    placeholder="4532 •••• •••• 8892"
                    required
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <div>
                    <label className="input-label">Validade</label>
                    <input
                      type="text"
                      className="modal-text-input"
                      placeholder="MM/AA"
                      required
                    />
                  </div>
                  <div>
                    <label className="input-label">CVV</label>
                    <input
                      type="text"
                      className="modal-text-input"
                      placeholder="123"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'register' && (
              <div className="input-group">
                <label className="input-label">Nome Completo</label>
                <input
                  type="text"
                  className="modal-text-input"
                  placeholder="Seu nome completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}

            {activeTab !== 'payment' && (
              <>
                <div className="input-group" style={{ marginTop: '0.75rem' }}>
                  <label className="input-label">E-mail</label>
                  <input
                    type="email"
                    className="modal-text-input"
                    placeholder="exemplo@brandfinance.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="input-group" style={{ marginTop: '0.75rem' }}>
                  <label className="input-label">Senha</label>
                  <input
                    type="password"
                    className="modal-text-input"
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </>
            )}

            <div className="modal-security-note">
              <Lock size={13} />
              <span>Conexão criptografada ponta a ponta com autenticação bancária.</span>
            </div>

            <button type="submit" className="modal-submit-btn">
              {activeTab === 'payment' ? (
                <>
                  <Sparkles size={16} /> Confirmar Assinatura
                </>
              ) : activeTab === 'register' ? (
                'Criar Conta Global Grátis'
              ) : (
                'Entrar na Plataforma'
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

