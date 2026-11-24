import React, { useState } from 'react';
import {
  SparklesIcon,
  BookOpenIcon,
  PartyPopperIcon,
  ShieldCheckIcon,
  UsersIcon,
  HeartIcon,
  ArrowRightIcon,
  LightbulbIcon,
  Share2Icon,
} from './Icons';
import ReflectiveQuotesSection from './ReflectiveQuotesSection';
import { ASSERTIVE_FRAMEWORKS } from '../data/frameworksData';

export default function HomeView({
  onNavigate,
  stories,
  empathyIds,
  onToggleEmpathy,
  onOpenShareModal,
  favoriteQuotes,
  onToggleFavoriteQuote,
  onShareQuote,
}) {
  const [selectedStructureId, setSelectedStructureId] = useState('desc');
  const activeFramework =
    ASSERTIVE_FRAMEWORKS.find((f) => f.id === selectedStructureId) || ASSERTIVE_FRAMEWORKS[0];

  const featuredStories = stories.slice(0, 2);

  return (
    <div className="container">
      {/* Hero Section matching screenshot */}
      <section className="hero-card" aria-labelledby="hero-heading">
        <div className="hero-badge">
          <SparklesIcon size={15} />
          <span>Comunidad interactiva · Apoyo, aprendizaje y juego</span>
        </div>

        <h1 id="hero-heading" className="hero-title">
          Qué es <span className="hero-gradient-text">Igualdad Segura</span>
        </h1>

        <p className="hero-subtitle">
          Una comunidad digital donde las mujeres encuentran apoyo, información y espacios libres
          de violencia, y los hombres aprenden a ser aliados activos. Lee y comparte cómo otras
          personas sobrellevaron situaciones reales, practica respuestas asertivas y desbloquea
          insignias.
        </p>

        <div className="hero-actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => onNavigate('historias')}
          >
            <BookOpenIcon size={18} />
            <span>Leer historias</span>
          </button>

          <button
            type="button"
            className="btn btn-amber"
            onClick={() => onNavigate('dinamicas')}
          >
            <PartyPopperIcon size={18} />
            <span>Jugar en Dinámicas</span>
          </button>

          <button
            type="button"
            className="btn btn-outline-purple"
            onClick={() => onNavigate('contacto')}
          >
            <span>Contacto directo</span>
          </button>
        </div>
      </section>

      {/* 3 Pastel Feature Cards directly below Hero */}
      <section className="pillars-grid" aria-label="Pilares de Igualdad Segura">
        <article className="pillar-card lavender">
          <div>
            <div className="pillar-icon purple" style={{ marginBottom: 14 }}>
              <ShieldCheckIcon size={22} />
            </div>
            <h3>Espacios Seguros y Protocolos</h3>
            <p>
              Guías claras y estructuras asertivas para poner límites saludables, documentar
              situaciones difíciles y construir acuerdos de respeto.
            </p>
          </div>
          <button
            type="button"
            className="pillar-link"
            onClick={() => onNavigate('consejos')}
          >
            <span>Explorar estructuras DESC y 5D</span>
            <ArrowRightIcon size={15} />
          </button>
        </article>

        <article className="pillar-card mint">
          <div>
            <div className="pillar-icon teal" style={{ marginBottom: 14 }}>
              <UsersIcon size={22} />
            </div>
            <h3>Aliados Activos y Perfiles</h3>
            <p>
              Conecta con mentoras, especialistas y personas que practican la corresponsabilidad
              para frenar microviolencias en lo cotidiano.
            </p>
          </div>
          <button
            type="button"
            className="pillar-link"
            onClick={() => onNavigate('perfiles')}
          >
            <span>Ver perfiles de apoyo</span>
            <ArrowRightIcon size={15} />
          </button>
        </article>

        <article className="pillar-card cream">
          <div>
            <div className="pillar-icon amber" style={{ marginBottom: 14 }}>
              <HeartIcon size={22} />
            </div>
            <h3>Historias que Acompañan</h3>
            <p>
              Descubre cómo otras personas atravesaron retos en el trabajo, estudio o familia,
              identifícate con sus estrategias y comparte la tuya.
            </p>
          </div>
          <button
            type="button"
            className="pillar-link"
            onClick={() => onNavigate('historias')}
          >
            <span>Compartir o leer historias</span>
            <ArrowRightIcon size={15} />
          </button>
        </article>
      </section>

      {/* Citas Reflexivas - completely separate from Login/User sections */}
      <ReflectiveQuotesSection
        favoriteQuotes={favoriteQuotes}
        onToggleFavoriteQuote={onToggleFavoriteQuote}
        onShareQuote={onShareQuote}
      />

      {/* Complex & Assertive Structures Section */}
      <section className="section-block" aria-labelledby="estructuras-heading">
        <div className="section-header">
          <div>
            <span className="section-eyebrow">
              <LightbulbIcon size={13} />
              Estructuras Complejas y Asertivas
            </span>
            <h2 id="estructuras-heading" className="section-title">
              Herramientas Prácticas para Responder y Cuidar el Entorno
            </h2>
            <p className="section-subtitle">
              Cuando una situación nos toma por sorpresa, tener una estructura clara evita el
              bloqueo o la escalada. Explora tres marcos probados paso a paso.
            </p>
          </div>
          <button
            type="button"
            className="btn btn-outline-purple btn-sm"
            onClick={() => onNavigate('consejos')}
          >
            <span>Abrir Constructor DESC</span>
            <ArrowRightIcon size={15} />
          </button>
        </div>

        <div className="framework-tabs">
          {ASSERTIVE_FRAMEWORKS.map((fw) => (
            <button
              key={fw.id}
              type="button"
              className={`framework-tab-btn ${selectedStructureId === fw.id ? 'active' : ''}`}
              onClick={() => setSelectedStructureId(fw.id)}
            >
              {fw.title}
            </button>
          ))}
        </div>

        <div className="steps-grid">
          {activeFramework.steps.map((step) => (
            <div key={step.name} className="step-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span className={`step-badge-letter ${activeFramework.color}`}>
                  {step.letter}
                </span>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{step.name}</h3>
              </div>
              <p style={{ fontSize: '0.92rem', color: '#4b5563' }}>{step.detail}</p>
              <div className="step-example">{step.example}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Highlighted Coping Stories Preview */}
      <section className="section-block" aria-labelledby="historias-preview-heading">
        <div className="section-header">
          <div>
            <span className="section-eyebrow">Experiencias Reales</span>
            <h2 id="historias-preview-heading" className="section-title">
              Cómo Otras Personas Sobrellevaron Situaciones Similares
            </h2>
            <p className="section-subtitle">
              Cada relato está estructurado en situación, estrategia asertiva y aprendizaje clave
              para que sea fácil de leer y compartir.
            </p>
          </div>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => onNavigate('historias')}
          >
            <span>Ver todas ({stories.length})</span>
            <ArrowRightIcon size={15} />
          </button>
        </div>

        <div className="stories-grid">
          {featuredStories.map((story) => {
            const liked = empathyIds.includes(story.id);
            return (
              <article key={story.id} className="story-card">
                <div className="story-header">
                  <div className="story-author-row">
                    <span className={`avatar-circle ${story.anonymous ? 'teal' : ''}`}>
                      {story.author.charAt(0).toUpperCase()}
                    </span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14.5 }}>{story.author}</div>
                      <div style={{ fontSize: 12.5, color: '#6b7280' }}>
                        {story.role} · {story.date}
                      </div>
                    </div>
                  </div>
                  <span className="story-category-pill">{story.categoryLabel}</span>
                </div>

                <h3 className="story-title">{story.title}</h3>

                <div className="story-block situation">
                  <span className="story-block-label">Situación</span>
                  {story.situation}
                </div>

                <div className="story-block coping">
                  <span className="story-block-label">Cómo lo sobrellevó</span>
                  {story.howICoped}
                </div>

                <div className="story-actions">
                  <div className="action-group">
                    <button
                      type="button"
                      className={`action-btn ${liked ? 'empathy-active' : ''}`}
                      onClick={() => onToggleEmpathy(story.id)}
                    >
                      <HeartIcon size={15} filled={liked} />
                      <span>Me identifico ({story.empathyCount + (liked ? 1 : 0)})</span>
                    </button>
                    <button
                      type="button"
                      className="action-btn"
                      onClick={() => onOpenShareModal(story)}
                    >
                      <Share2Icon size={15} />
                      <span>Compartir</span>
                    </button>
                  </div>
                  <button
                    type="button"
                    className="pillar-link"
                    onClick={() => onNavigate('historias')}
                  >
                    <span>Leer completa</span>
                    <ArrowRightIcon size={14} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}

