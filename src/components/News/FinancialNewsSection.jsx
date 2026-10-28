import React, { useState } from 'react';
import { Newspaper, TrendingUp, ExternalLink, Filter, Clock, Flame } from 'lucide-react';
import { MOCK_FINANCIAL_NEWS } from '../../data/mockData';

export default function FinancialNewsSection() {
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [newsList] = useState(MOCK_FINANCIAL_NEWS);

  const categories = ['Todas', 'Câmbio', 'Bancos Centrais', 'Mercado Global', 'Viagens & Pagamentos', 'Economia'];

  const filteredNews = selectedCategory === 'Todas'
    ? newsList
    : newsList.filter(n => n.category === selectedCategory);

  return (
    <section className="financial-news-section animate-fade-in">
      <div className="news-section-header">
        <div className="news-title-area">
          <div className="news-badge-live">
            <Flame size={13} color="var(--accent-red)" />
            <span>MERCADO AO VIVO</span>
          </div>
          <h2 className="news-main-title">Notícias &amp; Análise do Mundo Financeiro</h2>
          <p className="news-subtitle">
            Acompanhe as notícias de câmbio, política monetária, inflação e impactos nas moedas globais.
          </p>
        </div>

        {/* Filtro por Categoria */}
        <div className="news-categories-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`news-cat-chip ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Notícias */}
      <div className="news-cards-grid">
        {filteredNews.map((news) => (
          <article key={news.id} className="news-card glass-panel">
            <div className="news-card-meta">
              <span className={`news-tag-badge tag-${news.tagColor}`}>
                {news.category}
              </span>
              <span className="news-time">
                <Clock size={12} /> {news.date}
              </span>
            </div>

            <h3 className="news-item-title">{news.title}</h3>
            <p className="news-item-excerpt">{news.excerpt}</p>

            <div className="news-card-footer">
              <span className="news-source-name">{news.source}</span>
              <button className="news-read-more-btn" onClick={() => alert(`Abrindo artigo completo da ${news.source}`)}>
                <span>Ler Matéria</span>
                <ExternalLink size={13} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

