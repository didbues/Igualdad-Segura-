import React, { useState } from 'react';
import { ASSERTIVE_FRAMEWORKS, ASSERTIVE_TEMPLATES } from '../data/frameworksData';
import {
  LightbulbIcon,
  CopyIcon,
  CheckIcon,
  SparklesIcon,
  ShieldCheckIcon,
} from './Icons';

const PRESETS = [
  {
    label: 'Interrupciones en junta',
    d: 'cuando presenté mi propuesta técnica hoy, fui interrumpida antes de concluir el segundo punto',
    e: 'me sentí frustrada y percibí que la idea no se evaluó completa',
    s: 'que mantengamos turnos de palabra hasta que cada persona cierre su explicación',
    c: 'podremos tomar mejores decisiones escuchando al equipo completo',
  },
  {
    label: 'Comentario fuera de lugar',
    d: 'en el chat del grupo se compartió una broma sobre la apariencia de una compañera',
    e: 'me incomoda y rompe la confianza que necesitamos para trabajar a gusto',
    s: 'que evitemos ese tipo de comentarios y mantengamos el respeto en el canal',
    c: 'todos nos sentiremos seguros participando sin temor a burlas',
  },
  {
    label: 'Carga desigual de tareas',
    d: 'en las últimas tres entregas asumí sola la coordinación y revisión final',
    e: 'estoy agotada y siento que el esfuerzo no está repartido de manera justa',
    s: 'que dividamos la coordinación y las revisiones por semana de forma explícita',
    c: 'el proyecto saldrá a tiempo y ambos cuidaremos nuestro bienestar',
  },
];

export default function AdviceView({ onUseAssertiveBuilder }) {
  const [activeFwId, setActiveFwId] = useState('desc');
  const [dText, setDText] = useState(PRESETS[0].d);
  const [eText, setEText] = useState(PRESETS[0].e);
  const [sText, setSText] = useState(PRESETS[0].s);
  const [cText, setCText] = useState(PRESETS[0].c);
  const [copiedKey, setCopiedKey] = useState(null);

  const activeFw =
    ASSERTIVE_FRAMEWORKS.find((f) => f.id === activeFwId) || ASSERTIVE_FRAMEWORKS[0];

  const assembledMessage = `He notado que ${dText || '[describe el hecho]'}. Esto hace que ${
    eText || '[expresa cómo te afecta]'
  }. Por eso te propongo ${sText || '[sugiere un cambio concreto]'}; así ${
    cText || '[indica el beneficio]'
  }.`;

  const handleCopy = (key, text, unlock = false) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
    if (unlock) onUseAssertiveBuilder();
  };

  return (
    <div className="container">
      <section className="section-header" style={{ marginBottom: 24 }}>
        <div>
          <span className="section-eyebrow">
            <ShieldCheckIcon size={13} />
            Estructuras Complejas y Asertivas
          </span>
          <h1 className="section-title" style={{ fontSize: 'clamp(1.7rem, 3vw, 2.3rem)' }}>
            Guías Asertivas y Arquitectura de Espacios Seguros
          </h1>
          <p className="section-subtitle">
            Estructuras claras y accionables para responder con firmeza sin escalar la violencia,
            intervenir como aliado/a y diseñar entornos saludables.
          </p>
        </div>
      </section>

      {/* Frameworks Tabs */}
      <section className="section-block">
        <div className="framework-tabs">
          {ASSERTIVE_FRAMEWORKS.map((fw) => (
            <button
              key={fw.id}
              type="button"
              className={`framework-tab-btn ${activeFwId === fw.id ? 'active' : ''}`}
              onClick={() => setActiveFwId(fw.id)}
            >
              {fw.title}
            </button>
          ))}
        </div>

        <div
          className="card-white"
          style={{
            marginBottom: 18,
            background: 'linear-gradient(135deg, #ffffff 0%, #f5f3ff 100%)',
          }}
        >
          <span className="story-category-pill">{activeFw.badge}</span>
          <h2 style={{ fontSize: '1.35rem', marginTop: 10, marginBottom: 6 }}>{activeFw.title}</h2>
          <p style={{ color: '#4b5563' }}>{activeFw.subtitle}</p>
        </div>

        <div className="steps-grid">
          {activeFw.steps.map((step) => (
            <div key={step.name} className="step-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span className={`step-badge-letter ${activeFw.color}`}>{step.letter}</span>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{step.name}</h3>
              </div>
              <p style={{ fontSize: '0.93rem', color: '#4b5563' }}>{step.detail}</p>
              <div className="step-example">{step.example}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive DESC Builder */}
      <section className="section-block">
        <div className="builder-card">
          <div style={{ marginBottom: 20 }}>
            <span className="section-eyebrow">
              <SparklesIcon size={13} />
              Herramienta Interactiva
            </span>
            <h2 className="section-title" style={{ fontSize: '1.5rem' }}>
              Constructor de Mensajes Asertivos (Modelo DESC)
            </h2>
            <p style={{ color: '#4b5563', fontSize: '0.95rem', marginTop: 4 }}>
              Elige un escenario base o escribe tu propia situación para redactar un límite claro,
              respetuoso y directo.
            </p>
          </div>

          <div className="quote-theme-pills">
            {PRESETS.map((p) => (
              <button
                key={p.label}
                type="button"
                className="filter-pill"
                onClick={() => {
                  setDText(p.d);
                  setEText(p.e);
                  setSText(p.s);
                  setCText(p.c);
                }}
              >
                Usar ejemplo: {p.label}
              </button>
            ))}
          </div>

          <div className="builder-grid">
            <div>
              <div className="form-group">
                <label className="form-label" htmlFor="desc-d">
                  D · Describe el hecho objetivo (sin insultos ni suposiciones)
                </label>
                <input
                  id="desc-d"
                  type="text"
                  className="form-control"
                  value={dText}
                  onChange={(e) => setDText(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="desc-e">
                  E · Expresa cómo te hace sentir o cómo impacta
                </label>
                <input
                  id="desc-e"
                  type="text"
                  className="form-control"
                  value={eText}
                  onChange={(e) => setEText(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="desc-s">
                  S · Sugiere un cambio concreto y medible
                </label>
                <input
                  id="desc-s"
                  type="text"
                  className="form-control"
                  value={sText}
                  onChange={(e) => setSText(e.target.value)}
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" htmlFor="desc-c">
                  C · Consecuencia o beneficio compartido
                </label>
                <input
                  id="desc-c"
                  type="text"
                  className="form-control"
                  value={cText}
                  onChange={(e) => setCText(e.target.value)}
                />
              </div>
            </div>

            <div className="preview-message-box">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  color: '#6d28d9',
                  fontWeight: 800,
                  fontSize: 13,
                  marginBottom: 12,
                }}
              >
                <LightbulbIcon size={16} />
                <span>TU MENSAJE ASERTIVO LISTO</span>
              </div>
              <p
                style={{
                  fontSize: '1.03rem',
                  lineHeight: 1.65,
                  color: '#111827',
                  fontWeight: 500,
                  marginBottom: 18,
                }}
              >
                “{assembledMessage}”
              </p>

              <button
                type="button"
                className="btn btn-primary"
                style={{ width: '100%' }}
                onClick={() => handleCopy('builder', assembledMessage, true)}
              >
                {copiedKey === 'builder' ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
                <span>
                  {copiedKey === 'builder'
                    ? '¡Mensaje copiado! (+30 pts)'
                    : 'Copiar frase asertiva'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Ready-to-use assertive phrases */}
      <section className="section-block">
        <div className="section-header">
          <div>
            <h2 className="section-title" style={{ fontSize: '1.45rem' }}>
              Frases Rápidas para Momentos Difíciles
            </h2>
            <p className="section-subtitle">
              Respuestas cortas que puedes tener a mano para cortar interrupciones, microviolencias o
              apoyar a alguien más.
            </p>
          </div>
        </div>

        <div className="stories-grid">
          {ASSERTIVE_TEMPLATES.map((tpl) => (
            <div key={tpl.id} className="card-white">
              <span className="story-category-pill">{tpl.context}</span>
              <p
                style={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: '#111827',
                  margin: '12px 0 16px',
                }}
              >
                {tpl.phrase}
              </p>
              <button
                type="button"
                className="action-btn"
                onClick={() => handleCopy(tpl.id, tpl.phrase, true)}
              >
                {copiedKey === tpl.id ? (
                  <>
                    <CheckIcon size={15} color="#059669" />
                    <span style={{ color: '#059669' }}>Copiada</span>
                  </>
                ) : (
                  <>
                    <CopyIcon size={15} />
                    <span>Copiar frase</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

