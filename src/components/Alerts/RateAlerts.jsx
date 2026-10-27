import React, { useState, useCallback } from 'react';
import {
  Bell, Plus, Trash2, CheckCircle2, BellOff,
  TrendingUp, TrendingDown, RefreshCw, AlertTriangle
} from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { getLatestRate } from '../../services/api';

const CURRENCIES = ['USD', 'EUR', 'BRL', 'GBP', 'JPY', 'CAD', 'CHF', 'AUD', 'CNY', 'MXN', 'ARS', 'KRW', 'INR', 'TRY', 'ZAR'];

const FLAG_MAP = {
  USD: '🇺🇸', EUR: '🇪🇺', BRL: '🇧🇷', GBP: '🇬🇧', JPY: '🇯🇵',
  CAD: '🇨🇦', CHF: '🇨🇭', AUD: '🇦🇺', CNY: '🇨🇳', ARS: '🇦🇷',
  MXN: '🇲🇽', KRW: '🇰🇷', INR: '🇮🇳', TRY: '🇹🇷', ZAR: '🇿🇦',
};

const CURRENCY_NAMES = {
  USD: 'Dólar', EUR: 'Euro', BRL: 'Real', GBP: 'Libra',
  JPY: 'Iene', CAD: 'Dólar CAD', CHF: 'Franco', AUD: 'Dólar AUD',
  CNY: 'Yuan', ARS: 'Peso ARG', MXN: 'Peso MEX', KRW: 'Won',
  INR: 'Rúpia', TRY: 'Lira', ZAR: 'Rand',
};

export default function RateAlerts() {
  const [alerts, setAlerts] = useLocalStorage('rate-alerts-v2', []);
  const [form, setForm] = useState({
    from: 'USD', to: 'BRL', condition: 'above', targetRate: '', label: ''
  });
  const [isChecking, setIsChecking] = useState(false);
  const [checkResults, setCheckResults] = useState(null);
  const [formError, setFormError] = useState('');

  const handleAddAlert = () => {
    const rate = parseFloat(form.targetRate);
    if (!rate || rate <= 0) {
      setFormError('Insira uma taxa alvo válida maior que 0.');
      return;
    }
    if (form.from === form.to) {
      setFormError('As moedas de origem e destino devem ser diferentes.');
      return;
    }
    setFormError('');
    const newAlert = {
      id: Date.now(),
      from: form.from,
      to: form.to,
      condition: form.condition,
      targetRate: rate,
      label: form.label.trim() || `${form.from}/${form.to} ${form.condition === 'above' ? '↑' : '↓'} ${rate}`,
      createdAt: new Date().toLocaleDateString('pt-BR'),
      status: 'watching',
      currentRate: null,
      checkedAt: null,
    };
    setAlerts(prev => [newAlert, ...prev]);
    setForm(prev => ({ ...prev, targetRate: '', label: '' }));
  };

  const handleDeleteAlert = (id) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
    if (checkResults) setCheckResults(prev => prev?.filter(r => r.id !== id));
  };

  const handleDeleteAll = () => {
    if (window.confirm('Remover todos os alertas?')) {
      setAlerts([]);
      setCheckResults(null);
    }
  };

  const handleCheckAll = useCallback(async () => {
    if (!alerts.length) return;
    setIsChecking(true);
    setCheckResults(null);

    const results = await Promise.all(
      alerts.map(async (alert) => {
        try {
          const data = await getLatestRate(alert.from, alert.to, 1);
          const currentRate = data.rates[alert.to] || 0;
          const triggered =
            (alert.condition === 'above' && currentRate >= alert.targetRate) ||
            (alert.condition === 'below' && currentRate <= alert.targetRate);
          const diff = (((currentRate - alert.targetRate) / alert.targetRate) * 100).toFixed(2);
          return {
            ...alert, currentRate, triggered,
            diff,
            checkedAt: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
            status: triggered ? 'triggered' : 'watching',
          };
        } catch {
          return {
            ...alert, currentRate: null, triggered: false,
            checkedAt: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          };
        }
      })
    );

    setCheckResults(results);
    setAlerts(results);
    setIsChecking(false);
  }, [alerts, setAlerts]);

  const displayAlerts = checkResults || alerts;
  const triggeredCount = displayAlerts.filter(a => a.triggered || a.status === 'triggered').length;

  return (
    <div className="alerts-layout animate-fade-in">
      {/* Add Alert Form Panel */}
      <div className="glass-panel alert-form-panel">
        <h2 className="card-title" style={{ marginBottom: '1.5rem' }}>
          <Bell size={20} color="var(--accent-amber)" />
          Novo Alerta de Taxa
        </h2>

        <div className="input-group">
          <label className="input-label">Par de Moedas</label>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <div style={{ flex: 1, background: 'var(--surface-inner)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)', padding: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>{FLAG_MAP[form.from] || ''}</span>
              <select
                className="currency-select"
                value={form.from}
                onChange={e => setForm(p => ({ ...p, from: e.target.value }))}
              >
                {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <TrendingUp size={16} color="var(--text-dim)" style={{ flexShrink: 0 }} />
            <div style={{ flex: 1, background: 'var(--surface-inner)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)', padding: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>{FLAG_MAP[form.to] || ''}</span>
              <select
                className="currency-select"
                value={form.to}
                onChange={e => setForm(p => ({ ...p, to: e.target.value }))}
              >
                {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="input-group">
          <label className="input-label">Condição de Disparo</label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              className={`condition-btn ${form.condition === 'above' ? 'condition-btn--green' : ''}`}
              onClick={() => setForm(p => ({ ...p, condition: 'above' }))}
            >
              <TrendingUp size={14} /> Acima de
            </button>
            <button
              className={`condition-btn ${form.condition === 'below' ? 'condition-btn--red' : ''}`}
              onClick={() => setForm(p => ({ ...p, condition: 'below' }))}
            >
              <TrendingDown size={14} /> Abaixo de
            </button>
          </div>
        </div>

        <div className="input-group">
          <label className="input-label">Taxa Alvo (1 {form.from} = ? {form.to})</label>
          <input
            type="number"
            className="amount-input"
            placeholder="Ex: 5.80"
            value={form.targetRate}
            onChange={e => setForm(p => ({ ...p, targetRate: e.target.value }))}
            min="0"
            step="0.0001"
            style={{ paddingLeft: '1rem' }}
          />
        </div>

        <div className="input-group">
          <label className="input-label">Rótulo (opcional)</label>
          <input
            type="text"
            className="amount-input"
            placeholder="Ex: Comprar dólares para viagem"
            value={form.label}
            onChange={e => setForm(p => ({ ...p, label: e.target.value }))}
            style={{ paddingLeft: '1rem', fontSize: '0.9rem' }}
          />
        </div>

        {formError && (
          <div className="alert-form-error">
            <AlertTriangle size={14} /> {formError}
          </div>
        )}

        <button className="add-alert-btn" onClick={handleAddAlert}>
          <Plus size={16} />
          Adicionar Alerta
        </button>

        {/* Info Box */}
        <div className="alert-info-box">
          <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>
            💡 Configure alertas para monitorar quando uma taxa atingir seu alvo.
            Clique em <strong style={{ color: 'var(--text-muted)' }}>Verificar Todos</strong> para checar as taxas em tempo real.
          </p>
        </div>
      </div>

      {/* Alerts List Panel */}
      <div className="glass-panel alerts-list-panel">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <h2 className="card-title">
            <Bell size={20} color="var(--accent-amber)" />
            Meus Alertas
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 400, background: 'var(--surface-inner)', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-subtle)' }}>
              {alerts.length}
            </span>
          </h2>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {alerts.length > 0 && (
              <button className="chip-btn" onClick={handleDeleteAll} style={{ color: 'var(--accent-red)', borderColor: 'var(--accent-red)' }}>
                <Trash2 size={12} /> Limpar tudo
              </button>
            )}
            <button
              className="export-csv-btn"
              onClick={handleCheckAll}
              disabled={isChecking || !alerts.length}
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              {isChecking ? (
                <><RefreshCw size={14} className="spin-anim" /> Verificando...</>
              ) : (
                <><CheckCircle2 size={14} /> Verificar Todos</>
              )}
            </button>
          </div>
        </div>

        {/* Result Banner */}
        {checkResults && (
          <div className={`alert-result-banner ${triggeredCount > 0 ? 'alert-result-banner--triggered' : ''}`}>
            {triggeredCount > 0 ? (
              <><CheckCircle2 size={16} /> 🎯 {triggeredCount} alerta{triggeredCount > 1 ? 's' : ''} ativado{triggeredCount > 1 ? 's' : ''}! Hora de agir.</>
            ) : (
              <><Bell size={16} /> Nenhum alerta ativado ainda. Continue monitorando.</>
            )}
          </div>
        )}

        {/* Empty State */}
        {displayAlerts.length === 0 ? (
          <div className="empty-state-box">
            <BellOff size={44} style={{ opacity: 0.3, marginBottom: '0.75rem' }} />
            <p style={{ fontWeight: 600, color: 'var(--text-muted)' }}>Nenhum alerta configurado</p>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-dim)', marginTop: '0.35rem' }}>
              Configure alertas para monitorar taxas de câmbio específicas
            </p>
          </div>
        ) : (
          <div className="alerts-list">
            {displayAlerts.map(alert => {
              const isTriggered = alert.triggered || alert.status === 'triggered';
              const pctDiff = alert.currentRate && alert.targetRate
                ? (((alert.currentRate - alert.targetRate) / alert.targetRate) * 100).toFixed(2)
                : null;
              return (
                <div key={alert.id} className={`alert-item ${isTriggered ? 'alert-item--triggered' : ''}`}>
                  <div className="alert-item-left">
                    <div className={`alert-status-dot ${isTriggered ? 'alert-status-dot--triggered' : ''}`} />
                    <div>
                      <div className="alert-pair">
                        {FLAG_MAP[alert.from] || ''} {alert.from}
                        <span style={{ color: 'var(--text-dim)', margin: '0 0.25rem' }}>→</span>
                        {FLAG_MAP[alert.to] || ''} {alert.to}
                      </div>
                      <div className="alert-label">{alert.label}</div>
                    </div>
                  </div>

                  <div className="alert-item-center">
                    <span className={`alert-condition-badge ${alert.condition === 'above' ? 'badge-green' : 'badge-red'}`}>
                      {alert.condition === 'above' ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                      {alert.condition === 'above' ? 'Acima de' : 'Abaixo de'} {alert.targetRate.toFixed(4)}
                    </span>
                    {alert.currentRate != null && (
                      <div style={{ marginTop: '0.35rem' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          Atual: <strong style={{ color: isTriggered ? 'var(--accent-green)' : 'var(--text-main)' }}>
                            {alert.currentRate.toFixed(4)}
                          </strong>
                        </span>
                        {pctDiff !== null && (
                          <span style={{ fontSize: '0.7rem', color: parseFloat(pctDiff) >= 0 ? 'var(--accent-green)' : 'var(--accent-red)', marginLeft: '0.4rem' }}>
                            ({parseFloat(pctDiff) >= 0 ? '+' : ''}{pctDiff}%)
                          </span>
                        )}
                        {alert.checkedAt && (
                          <span style={{ fontSize: '0.68rem', color: 'var(--text-dim)', marginLeft: '0.4rem' }}>
                            · {alert.checkedAt}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="alert-item-right">
                    {isTriggered && <CheckCircle2 size={18} color="var(--accent-green)" />}
                    <span className="alert-date">{alert.createdAt}</span>
                    <button
                      className="alert-delete-btn"
                      onClick={() => handleDeleteAlert(alert.id)}
                      title="Excluir alerta"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
