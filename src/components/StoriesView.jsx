import React, { useMemo, useState } from 'react';
import { STORY_CATEGORIES } from '../data/storiesData';
import {
  SearchIcon,
  PlusIcon,
  HeartIcon,
  Share2Icon,
  MessageCircleIcon,
  BookmarkIcon,
  SendIcon,
  XIcon,
  CopyIcon,
  CheckIcon,
} from './Icons';

export default function StoriesView({
  stories,
  user,
  empathyIds,
  savedIds,
  onToggleEmpathy,
  onToggleSave,
  onAddComment,
  onPublishStory,
  onOpenShareModal,
}) {
  const [category, setCategory] = useState('todas');
  const [query, setQuery] = useState('');
  const [onlySaved, setOnlySaved] = useState(false);
  const [openCommentsId, setOpenCommentsId] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [showPublishModal, setShowPublishModal] = useState(false);

  // New story form state
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('laboral');
  const [formSituation, setFormSituation] = useState('');
  const [formCoping, setFormCoping] = useState('');
  const [formTakeaway, setFormTakeaway] = useState('');
  const [formTags, setFormTags] = useState('');
  const [formAnonymous, setFormAnonymous] = useState(true);

  const filteredStories = useMemo(() => {
    return stories.filter((story) => {
      if (category !== 'todas' && story.category !== category) return false;
      if (onlySaved && !savedIds.includes(story.id)) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        const hay = [
          story.title,
          story.situation,
          story.howICoped,
          story.takeaway,
          ...(story.tags || []),
        ]
          .join(' ')
          .toLowerCase();
        return hay.includes(q);
      }
      return true;
    });
  }, [stories, category, onlySaved, savedIds, query]);

  const handleSubmitStory = (e) => {
    e.preventDefault();
    if (!formTitle.trim() || !formSituation.trim() || !formCoping.trim()) return;

    const catObj = STORY_CATEGORIES.find((c) => c.id === formCategory);
    const parsedTags = formTags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
      .slice(0, 4);

    onPublishStory({
      title: formTitle.trim(),
      category: formCategory,
      categoryLabel: catObj ? catObj.label : 'Comunidad',
      situation: formSituation.trim(),
      howICoped: formCoping.trim(),
      takeaway:
        formTakeaway.trim() ||
        'Nombrar lo vivido y buscar apoyo nos recuerda que no tenemos que atravesarlo en soledad.',
      tags: parsedTags.length > 0 ? parsedTags : ['Afrontamiento', 'Espacio seguro'],
      anonymous: formAnonymous,
    });

    setFormTitle('');
    setFormSituation('');
    setFormCoping('');
    setFormTakeaway('');
    setFormTags('');
    setShowPublishModal(false);
  };

  const handleCommentSubmit = (e, storyId) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment(storyId, commentText.trim());
    setCommentText('');
  };

  return (
    <div className="container">
      <section className="section-header" style={{ marginBottom: 24 }}>
        <div>
          <span className="section-eyebrow">Historias y Afrontamiento</span>
          <h1 className="section-title" style={{ fontSize: 'clamp(1.7rem, 3vw, 2.3rem)' }}>
            Historias Reales para Identificarte y Sobrellevar Situaciones
          </h1>
          <p className="section-subtitle">
            Lee cómo otras personas pusieron límites, encontraron respaldo o transformaron un
            entorno. Si algo te resuena, compártelo o publica tu propia experiencia (incluso de
            forma anónima).
          </p>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setShowPublishModal(true)}
        >
          <PlusIcon size={18} />
          <span>Compartir mi historia</span>
        </button>
      </section>

      {/* Toolbar */}
      <div className="stories-toolbar">
        <div className="search-box">
          <SearchIcon size={17} />
          <input
            type="search"
            className="search-input"
            placeholder="Buscar por situación, consejo o etiqueta..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <button
          type="button"
          className={`filter-pill ${onlySaved ? 'active' : ''}`}
          onClick={() => setOnlySaved((prev) => !prev)}
        >
          <BookmarkIcon size={14} filled={onlySaved} />{' '}
          <span style={{ marginLeft: 4 }}>Guardadas ({savedIds.length})</span>
        </button>
      </div>

      {/* Category Pills */}
      <div className="quote-theme-pills" style={{ marginBottom: 24 }}>
        {STORY_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            className={`filter-pill ${category === cat.id ? 'active' : ''}`}
            onClick={() => setCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Stories Grid */}
      {filteredStories.length === 0 ? (
        <div className="card-white" style={{ textAlign: 'center', padding: 40 }}>
          <h3 style={{ marginBottom: 8 }}>No encontramos historias con ese filtro</h3>
          <p style={{ color: '#6b7280', marginBottom: 16 }}>
            Prueba limpiando la búsqueda o sé la primera persona en compartir sobre este tema.
          </p>
          <button
            type="button"
            className="btn btn-outline-purple btn-sm"
            onClick={() => {
              setCategory('todas');
              setQuery('');
              setOnlySaved(false);
            }}
          >
            Mostrar todas las historias
          </button>
        </div>
      ) : (
        <div className="stories-grid">
          {filteredStories.map((story) => {
            const isEmpathy = empathyIds.includes(story.id);
            const isSaved = savedIds.includes(story.id);
            const commentsOpen = openCommentsId === story.id;
            const totalEmpathy = story.empathyCount + (isEmpathy ? 1 : 0);

            return (
              <article key={story.id} className="story-card">
                <div className="story-header">
                  <div className="story-author-row">
                    <span
                      className={`avatar-circle ${
                        story.category === 'aliados'
                          ? 'teal'
                          : story.anonymous
                          ? 'amber'
                          : ''
                      }`}
                    >
                      {story.author.charAt(0).toUpperCase()}
                    </span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15 }}>{story.author}</div>
                      <div style={{ fontSize: 12.5, color: '#6b7280' }}>
                        {story.role} · {story.date} · {story.readTime} lectura
                      </div>
                    </div>
                  </div>
                  <span className="story-category-pill">{story.categoryLabel}</span>
                </div>

                <h2 className="story-title">{story.title}</h2>

                <div className="story-block situation">
                  <span className="story-block-label">1. Qué ocurrió</span>
                  {story.situation}
                </div>

                <div className="story-block coping">
                  <span className="story-block-label">2. Cómo lo sobrellevó</span>
                  {story.howICoped}
                </div>

                <div className="story-block takeaway">
                  <span className="story-block-label">3. Aprendizaje clave</span>
                  {story.takeaway}
                </div>

                <div className="story-tags">
                  {(story.tags || []).map((tag) => (
                    <span key={tag} className="tag-chip">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="story-actions">
                  <div className="action-group">
                    <button
                      type="button"
                      className={`action-btn ${isEmpathy ? 'empathy-active' : ''}`}
                      onClick={() => onToggleEmpathy(story.id)}
                    >
                      <HeartIcon size={15} filled={isEmpathy} />
                      <span>Me identifico ({totalEmpathy})</span>
                    </button>

                    <button
                      type="button"
                      className="action-btn"
                      onClick={() =>
                        setOpenCommentsId(commentsOpen ? null : story.id)
                      }
                    >
                      <MessageCircleIcon size={15} />
                      <span>Apoyo ({story.comments.length})</span>
                    </button>
                  </div>

                  <div className="action-group">
                    <button
                      type="button"
                      className={`action-btn ${isSaved ? 'saved-active' : ''}`}
                      onClick={() => onToggleSave(story.id)}
                      title="Guardar historia"
                    >
                      <BookmarkIcon size={15} filled={isSaved} />
                    </button>

                    <button
                      type="button"
                      className="action-btn"
                      onClick={() => onOpenShareModal(story)}
                    >
                      <Share2Icon size={15} />
                      <span>Compartir ({story.sharesCount})</span>
                    </button>
                  </div>
                </div>

                {commentsOpen && (
                  <div className="comments-box">
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#374151' }}>
                      Mensajes de apoyo y escucha
                    </div>
                    {story.comments.map((c) => (
                      <div key={c.id} className="comment-item">
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: 3,
                            fontSize: 12,
                          }}
                        >
                          <strong>{c.author}</strong>
                          <span style={{ color: '#6b7280' }}>{c.time}</span>
                        </div>
                        <p style={{ color: '#374151' }}>{c.text}</p>
                      </div>
                    ))}
                    <form
                      className="comment-form"
                      onSubmit={(e) => handleCommentSubmit(e, story.id)}
                    >
                      <input
                        type="text"
                        className="form-control"
                        placeholder={
                          user
                            ? `Escribe un mensaje empático como ${user.name}...`
                            : 'Escribe un mensaje de apoyo (como Invitado/a)...'
                        }
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                      />
                      <button type="submit" className="btn btn-primary btn-sm">
                        <SendIcon size={15} />
                      </button>
                    </form>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}

      {/* Modal to Publish Story */}
      {showPublishModal && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="publish-story-title"
        >
          <div className="modal-card">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 16,
              }}
            >
              <div>
                <h2 id="publish-story-title" style={{ fontSize: '1.35rem' }}>
                  Comparte tu Historia de Afrontamiento
                </h2>
                <p style={{ fontSize: 13.5, color: '#6b7280', marginTop: 4 }}>
                  Tu experiencia puede dar claridad y alivio a alguien que hoy vive algo parecido.
                </p>
              </div>
              <button
                type="button"
                className="action-btn"
                onClick={() => setShowPublishModal(false)}
                aria-label="Cerrar modal"
              >
                <XIcon size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmitStory}>
              <div className="form-group">
                <label className="form-label" htmlFor="story-title-input">
                  Título breve de la experiencia *
                </label>
                <input
                  id="story-title-input"
                  type="text"
                  required
                  className="form-control"
                  placeholder="Ej. Cómo logré poner un límite en mi equipo sin perder la calma"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="story-cat-select">
                  Ámbito / Categoría
                </label>
                <select
                  id="story-cat-select"
                  className="form-control"
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                >
                  {STORY_CATEGORIES.filter((c) => c.id !== 'todas').map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="story-situation-input">
                  1. ¿Qué situación viviste? *
                </label>
                <textarea
                  id="story-situation-input"
                  required
                  rows={3}
                  className="form-control"
                  placeholder="Describe brevemente el contexto para que otros puedan identificarse..."
                  value={formSituation}
                  onChange={(e) => setFormSituation(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="story-coping-input">
                  2. ¿Cómo lo sobrellevaste o qué estrategia te ayudó? *
                </label>
                <textarea
                  id="story-coping-input"
                  required
                  rows={3}
                  className="form-control"
                  placeholder="Comparte qué hiciste, a quién acudiste o qué frase te funcionó..."
                  value={formCoping}
                  onChange={(e) => setFormCoping(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="story-takeaway-input">
                  3. Aprendizaje o consejo clave (opcional)
                </label>
                <input
                  id="story-takeaway-input"
                  type="text"
                  className="form-control"
                  placeholder="Ej. Documentar hechos y apoyarme en aliadas marcó la diferencia"
                  value={formTakeaway}
                  onChange={(e) => setFormTakeaway(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="story-tags-input">
                  Etiquetas separadas por coma (opcional)
                </label>
                <input
                  id="story-tags-input"
                  type="text"
                  className="form-control"
                  placeholder="Asertividad, Límites, Red de apoyo"
                  value={formTags}
                  onChange={(e) => setFormTags(e.target.value)}
                />
              </div>

              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  fontSize: 14,
                  fontWeight: 600,
                  marginBottom: 20,
                  cursor: 'pointer',
                }}
              >
                <input
                  type="checkbox"
                  checked={formAnonymous}
                  onChange={(e) => setFormAnonymous(e.target.checked)}
                />
                <span>Publicar de forma anónima (protege tu identidad)</span>
              </label>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setShowPublishModal(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Publicar en Igualdad Segura
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export function ShareStoryModal({ story, onClose, onConfirmShare }) {
  const [copied, setCopied] = useState(false);

  if (!story) return null;

  const shareText = `Historia en Igualdad Segura: "${story.title}"\n\nCómo lo sobrellevó: ${story.howICoped}\n\nAprendizaje: ${story.takeaway}`;

  const handleCopy = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(shareText).catch(() => {});
    }
    setCopied(true);
    onConfirmShare(story.id);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="share-title">
      <div className="modal-card" style={{ maxWidth: 520 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 14,
          }}
        >
          <h2 id="share-title" style={{ fontSize: '1.25rem' }}>
            Compartir Historia de Apoyo
          </h2>
          <button type="button" className="action-btn" onClick={onClose} aria-label="Cerrar">
            <XIcon size={16} />
          </button>
        </div>

        <p style={{ fontSize: 14, color: '#4b5563', marginBottom: 14 }}>
          Comparte esta experiencia con alguien que pueda sentirse identificado o necesitar una idea
          práctica para sobrellevar una situación similar.
        </p>

        <div
          style={{
            background: 'linear-gradient(135deg, #f5f3ff 0%, #fefce8 100%)',
            border: '1px solid #ddd6fe',
            borderRadius: 16,
            padding: 16,
            marginBottom: 18,
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 800, color: '#6d28d9', marginBottom: 6 }}>
            {story.categoryLabel} · {story.author}
          </div>
          <div style={{ fontWeight: 700, fontSize: 15.5, marginBottom: 8 }}>{story.title}</div>
          <div style={{ fontSize: 13.5, color: '#374151' }}>
            <strong>Aprendizaje:</strong> {story.takeaway}
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          <button type="button" className="btn btn-primary" onClick={handleCopy} style={{ flex: 1 }}>
            {copied ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
            <span>{copied ? '¡Texto copiado!' : 'Copiar historia completa'}</span>
          </button>

          <a
            href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noreferrer"
            className="btn btn-teal"
            onClick={() => onConfirmShare(story.id)}
          >
            <Share2Icon size={16} />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}

