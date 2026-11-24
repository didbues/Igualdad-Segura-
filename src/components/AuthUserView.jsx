import React, { useState } from 'react';
import { BADGES_CATALOG } from '../data/storiesData';
import { REFLECTIVE_QUOTES } from '../data/quotesData';
import {
  UserIcon,
  LockIcon,
  TrophyIcon,
  FlameIcon,
  CheckCircle2Icon,
  LogOutIcon,
  SparklesIcon,
  HeartIcon,
  BookmarkIcon,
  ShieldCheckIcon,
} from './Icons';

export default function AuthUserView({
  user,
  onLogin,
  onLogout,
  onUpdateProfile,
  unlockedBadges,
  points,
  stories,
  empathyIds,
  savedIds,
  favoriteQuotes,
  onNavigate,
}) {
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [alias, setAlias] = useState('');
  const [role, setRole] = useState('Busco apoyo y comunidad');

  // Profile editor state when logged in
  const [editingBio, setEditingBio] = useState(false);
  const [bioInput, setBioInput] = useState(user?.bio || '');
  const [pronounsInput, setPronounsInput] = useState(user?.pronouns || 'Ella / Elle');

  const handleSubmitAuth = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    const cleanName =
      authMode === 'register' && name.trim()
        ? name.trim()
        : email.split('@')[0].replace(/[._]/g, ' ');
    const cleanAlias =
      authMode === 'register' && alias.trim()
        ? alias.trim().startsWith('@')
          ? alias.trim()
          : `@${alias.trim()}`
        : `@${email.split('@')[0]}`;

    onLogin({
      name: cleanName.charAt(0).toUpperCase() + cleanName.slice(1),
      alias: cleanAlias,
      email: email.trim(),
      role: authMode === 'register' ? role : 'Miembro de Igualdad Segura',
      pronouns: 'Ella / Él / Elle',
      bio: 'Construyendo espacios más seguros, empáticos y asertivos cada día.',
    });
  };

  const handleDemoLogin = (demoType) => {
    if (demoType === 'apoyo') {
      onLogin({
        name: 'Camila Torres',
        alias: '@camila_segura',
        email: 'camila@igualdadsegura.org',
        role: 'Busco apoyo y comunidad',
        pronouns: 'Ella',
        bio: 'Compartiendo aprendizajes sobre límites asertivos en el entorno laboral.',
      });
    } else {
      onLogin({
        name: 'Andrés Mendoza',
        alias: '@andres_aliado',
        email: 'andres@igualdadsegura.org',
        role: 'Aliado activo en formación',
        pronouns: 'Él',
        bio: 'Aprendiendo a escuchar y actuar con las 5 D en mis espacios cotidianos.',
      });
    }
  };

  if (!user) {
    return (
      <div className="container">
        <section className="section-header" style={{ marginBottom: 24 }}>
          <div>
            <span className="section-eyebrow">
              <UserIcon size={13} />
              Sesión y Cuenta de Usuario
            </span>
            <h1 className="section-title" style={{ fontSize: 'clamp(1.7rem, 3vw, 2.3rem)' }}>
              Inicia Sesión o Únete a Igualdad Segura
            </h1>
            <p className="section-subtitle">
              Accede a tu espacio personal para guardar historias con las que te identificas,
              conservar tus citas reflexivas favoritas y registrar tu progreso de insignias.
            </p>
          </div>
        </section>

        <div className="auth-split-grid">
          {/* Benefits side */}
          <div className="auth-info-panel">
            <div>
              <div className="hero-badge" style={{ marginBottom: 16 }}>
                <ShieldCheckIcon size={15} />
                <span>Espacio privado y respetuoso</span>
              </div>
              <h2 style={{ fontSize: '1.55rem', marginBottom: 12 }}>
                Tu perfil, tus historias y tus insignias en un solo lugar
              </h2>
              <p style={{ color: '#374151', marginBottom: 18 }}>
                Incluso con sesión iniciada, siempre puedes elegir publicar tus experiencias de
                manera anónima para cuidar tu privacidad.
              </p>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 12 }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 600 }}>
                  <CheckCircle2Icon size={18} color="#7c3aed" />
                  <span>Guarda historias y frases asertivas que te hayan servido</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 600 }}>
                  <CheckCircle2Icon size={18} color="#059669" />
                  <span>Desbloquea las 6 insignias de participación y aprendizaje</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 600 }}>
                  <CheckCircle2Icon size={18} color="#d97706" />
                  <span>Personaliza tu rol: busca apoyo o fórmate como aliado activo</span>
                </li>
              </ul>
            </div>

            <div
              style={{
                background: 'rgba(255, 255, 255, 0.85)',
                borderRadius: 16,
                padding: 16,
                border: '1px solid rgba(124, 58, 237, 0.16)',
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 800, color: '#5b21b6', marginBottom: 8 }}>
                ACCESO RÁPIDO DE PRUEBA (1 CLIC)
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                <button
                  type="button"
                  className="btn btn-outline-purple btn-sm"
                  onClick={() => handleDemoLogin('apoyo')}
                >
                  Entrar como @camila_segura
                </button>
                <button
                  type="button"
                  className="btn btn-teal btn-sm"
                  onClick={() => handleDemoLogin('aliado')}
                >
                  Entrar como @andres_aliado
                </button>
              </div>
            </div>
          </div>

          {/* Form side */}
          <div className="auth-form-panel">
            <div className="segmented-control" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={authMode === 'login'}
                className={`segmented-btn ${authMode === 'login' ? 'active' : ''}`}
                onClick={() => setAuthMode('login')}
              >
                Iniciar Sesión
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={authMode === 'register'}
                className={`segmented-btn ${authMode === 'register' ? 'active' : ''}`}
                onClick={() => setAuthMode('register')}
              >
                Crear Cuenta
              </button>
            </div>

            <form onSubmit={handleSubmitAuth}>
              {authMode === 'register' && (
                <>
                  <div className="form-group">
                    <label className="form-label" htmlFor="auth-name">
                      Nombre o seudónimo *
                    </label>
                    <input
                      id="auth-name"
                      type="text"
                      required
                      className="form-control"
                      placeholder="Ej. Sofía Ramírez"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="auth-alias">
                      Nombre de usuario (@alias)
                    </label>
                    <input
                      id="auth-alias"
                      type="text"
                      className="form-control"
                      placeholder="@sofia_segura"
                      value={alias}
                      onChange={(e) => setAlias(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="auth-role">
                      ¿Cómo te gustaría participar?
                    </label>
                    <select
                      id="auth-role"
                      className="form-control"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="Busco apoyo y comunidad">Busco apoyo y comunidad</option>
                      <option value="Aliado activo en formación">Aliado activo en formación</option>
                      <option value="Acompañamiento / Educación">Acompañamiento / Educación</option>
                    </select>
                  </div>
                </>
              )}

              <div className="form-group">
                <label className="form-label" htmlFor="auth-email">
                  Correo electrónico *
                </label>
                <input
                  id="auth-email"
                  type="email"
                  required
                  className="form-control"
                  placeholder="tucorreo@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="auth-pass">
                  Contraseña *
                </label>
                <input
                  id="auth-pass"
                  type="password"
                  required
                  minLength={4}
                  className="form-control"
                  placeholder="Mínimo 4 caracteres"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', marginTop: 6 }}
              >
                <LockIcon size={16} />
                <span>
                  {authMode === 'login' ? 'Iniciar Sesión Segura' : 'Crear mi Cuenta y Entrar'}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Logged-in User Dashboard
  const myStories = stories.filter((s) => s.ownerEmail === user.email);
  const savedStoriesList = stories.filter((s) => savedIds.includes(s.id));
  const favQuotesList = REFLECTIVE_QUOTES.filter((q) => favoriteQuotes.includes(q.id));

  return (
    <div className="container">
      <section className="section-header" style={{ marginBottom: 24 }}>
        <div>
          <span className="section-eyebrow">
            <UserIcon size={13} />
            Panel de Usuario
          </span>
          <h1 className="section-title" style={{ fontSize: 'clamp(1.7rem, 3vw, 2.3rem)' }}>
            Hola, {user.name}
          </h1>
          <p className="section-subtitle">
            Aquí gestionas tu perfil, revisas tus insignias desbloqueadas y encuentras las historias
            y citas que guardaste.
          </p>
        </div>

        <button type="button" className="btn btn-ghost btn-sm" onClick={onLogout}>
          <LogOutIcon size={16} />
          <span>Cerrar sesión</span>
        </button>
      </section>

      <div className="user-dashboard-grid">
        {/* Left Profile Card */}
        <aside className="card-white">
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
            <span className="avatar-circle" style={{ width: 54, height: 54, fontSize: 20 }}>
              {user.name.charAt(0).toUpperCase()}
            </span>
            <div>
              <h2 style={{ fontSize: '1.2rem' }}>{user.name}</h2>
              <div style={{ fontSize: 13.5, color: '#6d28d9', fontWeight: 700 }}>{user.alias}</div>
              <div style={{ fontSize: 12.5, color: '#6b7280' }}>{user.pronouns}</div>
            </div>
          </div>

          <span className="story-category-pill" style={{ display: 'inline-block', marginBottom: 12 }}>
            {user.role}
          </span>

          {editingBio ? (
            <div style={{ marginTop: 8 }}>
              <div className="form-group">
                <label className="form-label" htmlFor="edit-pronouns">
                  Pronombres
                </label>
                <input
                  id="edit-pronouns"
                  type="text"
                  className="form-control"
                  value={pronounsInput}
                  onChange={(e) => setPronounsInput(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="edit-bio">
                  Tu propósito en la comunidad
                </label>
                <textarea
                  id="edit-bio"
                  rows={3}
                  className="form-control"
                  value={bioInput}
                  onChange={(e) => setBioInput(e.target.value)}
                />
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    onUpdateProfile({ bio: bioInput, pronouns: pronounsInput });
                    setEditingBio(false);
                  }}
                >
                  Guardar
                </button>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={() => setEditingBio(false)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <>
              <p style={{ fontSize: '0.92rem', color: '#374151', marginBottom: 14 }}>
                {user.bio}
              </p>
              <button
                type="button"
                className="btn btn-outline-purple btn-sm"
                style={{ width: '100%' }}
                onClick={() => {
                  setBioInput(user.bio || '');
                  setPronounsInput(user.pronouns || '');
                  setEditingBio(true);
                }}
              >
                Editar perfil
              </button>
            </>
          )}

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 10,
              marginTop: 18,
              paddingTop: 16,
              borderTop: '1px solid #f3f4f6',
            }}
          >
            <div
              style={{
                background: '#fffbeb',
                padding: 12,
                borderRadius: 14,
                textAlign: 'center',
              }}
            >
              <div style={{ fontWeight: 800, fontSize: 18, color: '#b45309' }}>
                {unlockedBadges.length}/6
              </div>
              <div style={{ fontSize: 12, color: '#78350f' }}>Insignias</div>
            </div>
            <div
              style={{
                background: '#f5f3ff',
                padding: 12,
                borderRadius: 14,
                textAlign: 'center',
              }}
            >
              <div style={{ fontWeight: 800, fontSize: 18, color: '#6d28d9' }}>{points}</div>
              <div style={{ fontSize: 12, color: '#4c1d95' }}>Puntos</div>
            </div>
          </div>
        </aside>

        {/* Right Activity & Badges */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          {/* Badges Progress */}
          <div className="card-white">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 16,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <TrophyIcon size={20} color="#d97706" />
                <h2 style={{ fontSize: '1.22rem' }}>Tus Insignias de Espacio Seguro</h2>
              </div>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontWeight: 700, color: '#be185d', fontSize: 14 }}>
                <FlameIcon size={16} />
                {points} pts
              </span>
            </div>

            <div className="badges-grid">
              {BADGES_CATALOG.map((badge) => {
                const isUnlocked = unlockedBadges.includes(badge.id);
                return (
                  <div
                    key={badge.id}
                    className={`badge-item ${isUnlocked ? 'unlocked' : ''}`}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 6,
                      }}
                    >
                      <strong style={{ fontSize: 14 }}>{badge.title}</strong>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 800,
                          color: isUnlocked ? '#047857' : '#6b7280',
                        }}
                      >
                        {isUnlocked ? 'Desbloqueada' : `+${badge.points} pts`}
                      </span>
                    </div>
                    <p style={{ fontSize: 12.5, color: '#4b5563', marginBottom: 6 }}>
                      {badge.description}
                    </p>
                    <div style={{ fontSize: 11.5, fontWeight: 700, color: '#6d28d9' }}>
                      Meta: {badge.requirement}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Saved Stories & Quotes */}
          <div className="card-white">
            <h2 style={{ fontSize: '1.2rem', marginBottom: 14 }}>
              Tu Actividad y Recursos Guardados
            </h2>

            <div style={{ display: 'grid', gap: 14 }}>
              <div
                style={{
                  background: '#f9fafb',
                  borderRadius: 14,
                  padding: 14,
                  border: '1px solid #f3f4f6',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontWeight: 700, marginBottom: 6 }}>
                  <BookmarkIcon size={16} color="#6d28d9" />
                  <span>Historias guardadas ({savedStoriesList.length})</span>
                </div>
                {savedStoriesList.length === 0 ? (
                  <p style={{ fontSize: 13.5, color: '#6b7280' }}>
                    Aún no has guardado historias. Explora Historias para marcar las que quieras
                    conservar.
                  </p>
                ) : (
                  <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14 }}>
                    {savedStoriesList.map((st) => (
                      <li key={st.id} style={{ marginBottom: 4 }}>
                        {st.title}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div
                style={{
                  background: '#fdf2f8',
                  borderRadius: 14,
                  padding: 14,
                  border: '1px solid #fce7f3',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontWeight: 700, marginBottom: 6 }}>
                  <HeartIcon size={16} color="#db2777" filled />
                  <span>Citas reflexivas favoritas ({favQuotesList.length})</span>
                </div>
                {favQuotesList.length === 0 ? (
                  <p style={{ fontSize: 13.5, color: '#6b7280' }}>
                    Marca "Me inspira" en la sección de Citas Reflexivas en Inicio para verlas aquí.
                  </p>
                ) : (
                  <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14 }}>
                    {favQuotesList.map((q) => (
                      <li key={q.id} style={{ marginBottom: 4 }}>
                        “{q.quote}”
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div
                style={{
                  background: '#ecfdf5',
                  borderRadius: 14,
                  padding: 14,
                  border: '1px solid #d1fae5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 10,
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14.5 }}>
                    Historias publicadas por ti: {myStories.length} · Me identifico dados:{' '}
                    {empathyIds.length}
                  </div>
                  <div style={{ fontSize: 13, color: '#065f46' }}>
                    Comparte una nueva historia para ayudar a otros a sentirse acompañados.
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-teal btn-sm"
                  onClick={() => onNavigate('historias')}
                >
                  <SparklesIcon size={15} />
                  <span>Ir a Historias</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

