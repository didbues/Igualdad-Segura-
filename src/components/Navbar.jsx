import React, { useState } from 'react';
import {
  ShieldCheckIcon,
  TrophyIcon,
  FlameIcon,
  UserPlusIcon,
  UserIcon,
  MenuIcon,
  XIcon,
} from './Icons';

const NAV_ITEMS = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'perfiles', label: 'Perfiles' },
  { id: 'historias', label: 'Historias' },
  { id: 'consejos', label: 'Consejos' },
  { id: 'dinamicas', label: 'Dinámicas' },
  { id: 'contacto', label: 'Contacto' },
  { id: 'usuario', label: 'Usuario' },
];

export default function Navbar({
  activeTab,
  onSelectTab,
  unlockedCount,
  totalBadges,
  points,
  user,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (id) => {
    onSelectTab(id);
    setMobileOpen(false);
  };

  return (
    <header className="top-navbar">
      <div className="navbar-inner">
        <button
          type="button"
          className="brand-pill"
          onClick={() => handleNav('inicio')}
          aria-label="Ir a inicio de Igualdad Segura"
        >
          <span className="brand-icon-box">
            <ShieldCheckIcon size={18} strokeWidth={2.2} />
          </span>
          <span>Igualdad Segura</span>
        </button>

        <nav
          className={`nav-links ${mobileOpen ? 'mobile-open' : ''}`}
          aria-label="Navegación principal"
        >
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`nav-tab ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => handleNav(item.id)}
            >
              {item.id === 'usuario' && <UserIcon size={15} />}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="nav-right">
          <button
            type="button"
            className="badges-pill"
            onClick={() => handleNav('usuario')}
            title="Ver tus insignias y progreso"
            style={{ border: '1px solid rgba(245, 158, 11, 0.35)' }}
          >
            <TrophyIcon size={15} color="#d97706" />
            <span className="hide-xs">Insignias</span>
            <span className="badge-count-tag">
              {unlockedCount}/{totalBadges}
            </span>
            <span className="points-tag">
              <FlameIcon size={14} />
              {points}
            </span>
          </button>

          <button
            type="button"
            className={`session-btn ${user ? 'logged-in' : ''}`}
            onClick={() => handleNav('usuario')}
          >
            {user ? <UserIcon size={16} /> : <UserPlusIcon size={16} />}
            <span>{user ? user.alias : 'Sesión'}</span>
          </button>

          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Abrir menú"
          >
            {mobileOpen ? <XIcon size={18} /> : <MenuIcon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}

