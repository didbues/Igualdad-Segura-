import React from 'react';
import { COMMUNITY_PROFILES } from '../data/profilesData';
import { UsersIcon, AwardIcon, ArrowRightIcon, ShieldCheckIcon } from './Icons';

export default function ProfilesView({ user, onNavigate }) {
  return (
    <div className="container">
      <section className="section-header" style={{ marginBottom: 24 }}>
        <div>
          <span className="section-eyebrow">
            <UsersIcon size={13} />
            Red de Apoyo y Aliados
          </span>
          <h1 className="section-title" style={{ fontSize: 'clamp(1.7rem, 3vw, 2.3rem)' }}>
            Perfiles de la Comunidad y Espacios Seguros
          </h1>
          <p className="section-subtitle">
            Conoce a especialistas, facilitadores de masculinidades corresponsables y colectivos
            estudiantiles que acompañan la construcción de entornos libres de violencia.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => onNavigate('usuario')}
        >
          <span>{user ? `Mi perfil (${user.alias})` : 'Crear mi perfil'}</span>
          <ArrowRightIcon size={15} />
        </button>
      </section>

      <div className="profiles-grid" style={{ marginBottom: 28 }}>
        {COMMUNITY_PROFILES.map((profile) => (
          <article key={profile.id} className="card-white">
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: 12,
                marginBottom: 14,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span className={`avatar-circle ${profile.color}`}>
                  {profile.name.charAt(0)}
                </span>
                <div>
                  <h2 style={{ fontSize: '1.12rem', fontWeight: 700 }}>{profile.name}</h2>
                  <div style={{ fontSize: 13, color: '#6b7280' }}>
                    {profile.handle} · {profile.role}
                  </div>
                </div>
              </div>
              <span className="story-category-pill">{profile.badge}</span>
            </div>

            <p style={{ fontSize: '0.94rem', color: '#374151', marginBottom: 14 }}>
              {profile.focus}
            </p>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: 12,
                borderTop: '1px solid #f3f4f6',
                fontSize: 13,
                color: '#4b5563',
                flexWrap: 'wrap',
                gap: 8,
              }}
            >
              <span>{profile.availability}</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontWeight: 700, color: '#6d28d9' }}>
                <AwardIcon size={15} />
                {profile.badgesEarned}/6 insignias
              </span>
            </div>
          </article>
        ))}
      </div>

      <div
        className="card-white"
        style={{
          background: 'linear-gradient(135deg, #f5f3ff 0%, #ecfdf5 100%)',
          borderColor: '#ddd6fe',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div className="pillar-icon purple">
            <ShieldCheckIcon size={22} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: 3 }}>
              ¿Quieres sumarte como aliado/a o abrir tu propio espacio seguro?
            </h3>
            <p style={{ fontSize: 14, color: '#4b5563' }}>
              Personaliza tu perfil en la pestaña Usuario o escríbenos desde Contacto para recibir
              acompañamiento.
            </p>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-outline-purple btn-sm"
          onClick={() => onNavigate('contacto')}
        >
          Solicitar orientación
        </button>
      </div>
    </div>
  );
}

