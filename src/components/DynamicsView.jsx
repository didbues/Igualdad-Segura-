import React, { useState } from 'react';
import { DYNAMIC_SCENARIOS, MYTH_VS_REALITY } from '../data/frameworksData';
import {
  PartyPopperIcon,
  CheckCircle2Icon,
  ArrowRightIcon,
  SparklesIcon,
  TrophyIcon,
} from './Icons';

export default function DynamicsView({ onCompleteDynamics }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [revealedMyths, setRevealedMyths] = useState([]);

  const scenario = DYNAMIC_SCENARIOS[currentIdx];

  const handleSelectOption = (opt) => {
    if (selectedOption) return;
    setSelectedOption(opt);
    if (opt.isBest) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < DYNAMIC_SCENARIOS.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setFinished(true);
      onCompleteDynamics();
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setScore(0);
    setFinished(false);
  };

  const toggleMyth = (id) => {
    setRevealedMyths((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="container">
      <section className="section-header" style={{ marginBottom: 24 }}>
        <div>
          <span className="section-eyebrow">
            <PartyPopperIcon size={13} />
            Aprendizaje Activo y Entretenido
          </span>
          <h1 className="section-title" style={{ fontSize: 'clamp(1.7rem, 3vw, 2.3rem)' }}>
            Dinámicas: Entrena tu Respuesta Asertiva
          </h1>
          <p className="section-subtitle">
            Pon a prueba cómo actuar en situaciones cotidianas sin caer en el silencio ni en la
            agresividad. Completa los escenarios y gana tu insignia de Aliado en Acción.
          </p>
        </div>
      </section>

      <div className="dynamics-grid">
        {/* Interactive Scenario Simulator */}
        <section className="scenario-card" aria-label="Simulador de escenarios">
          {!finished ? (
            <>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 16,
                }}
              >
                <span className="story-category-pill">{scenario.tag}</span>
                <span style={{ fontSize: 13.5, fontWeight: 700, color: '#6b7280' }}>
                  Escenario {currentIdx + 1} de {DYNAMIC_SCENARIOS.length}
                </span>
              </div>

              <div
                style={{
                  height: 8,
                  borderRadius: 999,
                  background: '#f3f4f6',
                  overflow: 'hidden',
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    width: `${((currentIdx + (selectedOption ? 1 : 0)) / DYNAMIC_SCENARIOS.length) * 100}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #7c3aed, #10b981)',
                    transition: 'width 0.3s ease',
                  }}
                />
              </div>

              <h2 style={{ fontSize: '1.22rem', lineHeight: 1.4, marginBottom: 20 }}>
                {scenario.question}
              </h2>

              <div>
                {scenario.options.map((opt) => {
                  let statusClass = '';
                  if (selectedOption) {
                    if (opt.isBest) statusClass = 'correct';
                    else if (selectedOption.id === opt.id) statusClass = 'incorrect';
                  }

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      disabled={Boolean(selectedOption)}
                      className={`option-btn ${statusClass}`}
                      onClick={() => handleSelectOption(opt)}
                    >
                      {opt.text}
                    </button>
                  );
                })}
              </div>

              {selectedOption && (
                <div
                  style={{
                    marginTop: 16,
                    padding: 16,
                    borderRadius: 16,
                    background: selectedOption.isBest ? '#ecfdf5' : '#fffbeb',
                    border: `1px solid ${selectedOption.isBest ? '#a7f3d0' : '#fde68a'}`,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      fontWeight: 800,
                      fontSize: 14,
                      color: selectedOption.isBest ? '#047857' : '#b45309',
                      marginBottom: 6,
                    }}
                  >
                    <CheckCircle2Icon size={17} />
                    <span>
                      {selectedOption.isBest ? 'Respuesta Asertiva' : 'Oportunidad de mejora'}
                    </span>
                  </div>
                  <p style={{ fontSize: 14, color: '#374151', marginBottom: 14 }}>
                    {selectedOption.feedback}
                  </p>
                  <button type="button" className="btn btn-primary btn-sm" onClick={handleNext}>
                    <span>
                      {currentIdx + 1 < DYNAMIC_SCENARIOS.length
                        ? 'Siguiente escenario'
                        : 'Finalizar y reclamar insignia'}
                    </span>
                    <ArrowRightIcon size={15} />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '16px 8px' }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 20,
                  background: 'linear-gradient(135deg, #fde047 0%, #f59e0b 100%)',
                  color: '#ffffff',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 16,
                }}
              >
                <TrophyIcon size={30} />
              </div>
              <h2 style={{ fontSize: '1.55rem', marginBottom: 8 }}>
                ¡Completaste la Dinámica Asertiva!
              </h2>
              <p style={{ color: '#4b5563', marginBottom: 16 }}>
                Acertaste <strong>{score}</strong> de <strong>{DYNAMIC_SCENARIOS.length}</strong>{' '}
                escenarios. Tu insignia <strong>Aliado en Acción</strong> y <strong>+35 pts</strong>{' '}
                ya están en tu perfil.
              </p>
              <button type="button" className="btn btn-primary" onClick={handleRestart}>
                <SparklesIcon size={16} />
                <span>Volver a jugar</span>
              </button>
            </div>
          )}
        </section>

        {/* Myth vs Reality Interactive Column */}
        <aside>
          <div
            className="card-white"
            style={{
              background: 'linear-gradient(135deg, #fefce8 0%, #ffffff 100%)',
              borderColor: '#fde68a',
            }}
          >
            <h2 style={{ fontSize: '1.25rem', marginBottom: 6 }}>Mito vs. Realidad</h2>
            <p style={{ fontSize: 13.5, color: '#4b5563', marginBottom: 16 }}>
              Toca cada tarjeta para descubrir la respuesta basada en respeto y convivencia segura.
            </p>

            {MYTH_VS_REALITY.map((item) => {
              const revealed = revealedMyths.includes(item.id);
              return (
                <div key={item.id} className="myth-card">
                  <div style={{ fontWeight: 700, fontSize: 14.5, color: '#111827', marginBottom: 10 }}>
                    {item.myth}
                  </div>
                  {revealed ? (
                    <div
                      style={{
                        background: '#ecfdf5',
                        borderRadius: 10,
                        padding: '10px 12px',
                        fontSize: 13.5,
                        color: '#065f46',
                        marginBottom: 8,
                      }}
                    >
                      <strong>Realidad:</strong> {item.reality}
                    </div>
                  ) : null}
                  <button
                    type="button"
                    className="action-btn"
                    onClick={() => toggleMyth(item.id)}
                  >
                    {revealed ? 'Ocultar respuesta' : 'Destapar realidad'}
                  </button>
                </div>
              );
            })}
          </div>
        </aside>
      </div>
    </div>
  );
}

