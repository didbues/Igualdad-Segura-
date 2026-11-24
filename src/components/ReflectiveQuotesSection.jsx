import React, { useMemo, useState } from 'react';
import { REFLECTIVE_QUOTES } from '../data/quotesData';
import {
  QuoteIcon,
  HeartIcon,
  CopyIcon,
  CheckIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  SparklesIcon,
} from './Icons';

const THEMES = ['Todas', 'Espacios Seguros', 'Igualdad', 'Asertividad', 'Aliados', 'Comunidad'];

export default function ReflectiveQuotesSection({
  favoriteQuotes,
  onToggleFavoriteQuote,
  onShareQuote,
}) {
  const [selectedTheme, setSelectedTheme] = useState('Todas');
  const [activeId, setActiveId] = useState(REFLECTIVE_QUOTES[0].id);
  const [copiedId, setCopiedId] = useState(null);

  const filteredQuotes = useMemo(() => {
    if (selectedTheme === 'Todas') return REFLECTIVE_QUOTES;
    return REFLECTIVE_QUOTES.filter((q) => q.theme === selectedTheme);
  }, [selectedTheme]);

  const activeQuote =
    filteredQuotes.find((q) => q.id === activeId) || filteredQuotes[0] || REFLECTIVE_QUOTES[0];

  const activeIndex = filteredQuotes.findIndex((q) => q.id === activeQuote.id);

  const handleCycle = (dir) => {
    if (filteredQuotes.length === 0) return;
    const nextIdx = (activeIndex + dir + filteredQuotes.length) % filteredQuotes.length;
    setActiveId(filteredQuotes[nextIdx].id);
  };

  const handleCopyQuote = (quoteObj) => {
    const formatted = `“${quoteObj.quote}” — ${quoteObj.author} (Igualdad Segura)`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(formatted).catch(() => {});
    }
    setCopiedId(quoteObj.id);
    setTimeout(() => setCopiedId(null), 2000);
    onShareQuote(quoteObj);
  };

  const isFav = favoriteQuotes.includes(activeQuote.id);

  return (
    <section className="section-block" aria-labelledby="citas-reflexivas-heading">
      <div className="section-header">
        <div>
          <span className="section-eyebrow">
            <SparklesIcon size={13} />
            Espacio de Pausa y Reflexión
          </span>
          <h2 id="citas-reflexivas-heading" className="section-title">
            Citas Reflexivas para Fortalecer tu Voz
          </h2>
          <p className="section-subtitle">
            Ideas breves para recordar tu valor, nombrar los límites con calma y construir entornos
            más justos. Puedes guardar tus favoritas o compartirlas con alguien que las necesite.
          </p>
        </div>
      </div>

      <div className="quotes-showcase">
        <div className="quote-theme-pills" role="tablist" aria-label="Temas de citas reflexivas">
          {THEMES.map((theme) => (
            <button
              key={theme}
              type="button"
              role="tab"
              aria-selected={selectedTheme === theme}
              className={`filter-pill ${selectedTheme === theme ? 'active' : ''}`}
              onClick={() => {
                setSelectedTheme(theme);
                const firstMatch =
                  theme === 'Todas'
                    ? REFLECTIVE_QUOTES[0]
                    : REFLECTIVE_QUOTES.find((q) => q.theme === theme);
                if (firstMatch) setActiveId(firstMatch.id);
              }}
            >
              {theme}
            </button>
          ))}
        </div>

        <div className="quote-spotlight-grid">
          <div className="quote-main-card">
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 14,
                }}
              >
                <span className="quote-mark-badge">
                  <QuoteIcon size={18} />
                  {activeQuote.theme}
                </span>
                <span style={{ fontSize: 12.5, color: '#6b7280', fontWeight: 600 }}>
                  {activeIndex + 1} de {filteredQuotes.length}
                </span>
              </div>

              <blockquote
                className="quote-text-large"
                style={{ margin: '0 0 14px', padding: 0 }}
              >
                “{activeQuote.quote}”
              </blockquote>

              <p style={{ fontSize: 14, fontWeight: 700, color: '#5b21b6', marginBottom: 16 }}>
                — {activeQuote.author}
              </p>

              <div className="quote-reflection-box">
                <strong style={{ display: 'block', marginBottom: 3 }}>Pregunta para hoy:</strong>
                {activeQuote.reflection}
              </div>
            </div>

            <div className="quote-card-footer">
              <div className="action-group">
                <button
                  type="button"
                  className={`action-btn ${isFav ? 'empathy-active' : ''}`}
                  onClick={() => onToggleFavoriteQuote(activeQuote.id)}
                >
                  <HeartIcon size={15} filled={isFav} />
                  <span>{isFav ? 'Guardada' : 'Me inspira'}</span>
                </button>

                <button
                  type="button"
                  className="action-btn"
                  onClick={() => handleCopyQuote(activeQuote)}
                >
                  {copiedId === activeQuote.id ? (
                    <>
                      <CheckIcon size={15} color="#059669" />
                      <span style={{ color: '#059669' }}>¡Cita copiada!</span>
                    </>
                  ) : (
                    <>
                      <CopyIcon size={15} />
                      <span>Copiar y compartir</span>
                    </>
                  )}
                </button>
              </div>

              <div className="action-group">
                <button
                  type="button"
                  className="action-btn"
                  onClick={() => handleCycle(-1)}
                  aria-label="Cita anterior"
                >
                  <ArrowLeftIcon size={15} />
                </button>
                <button
                  type="button"
                  className="action-btn"
                  onClick={() => handleCycle(1)}
                  aria-label="Siguiente cita"
                >
                  <ArrowRightIcon size={15} />
                </button>
              </div>
            </div>
          </div>

          <div className="quote-mini-list">
            {filteredQuotes.slice(0, 4).map((q) => (
              <button
                key={q.id}
                type="button"
                className={`quote-mini-item ${q.id === activeQuote.id ? 'selected' : ''}`}
                onClick={() => setActiveId(q.id)}
              >
                <div className="quote-mini-theme">{q.theme}</div>
                <div className="quote-mini-text">“{q.quote}”</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

