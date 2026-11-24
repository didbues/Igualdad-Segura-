import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import HomeView from './components/HomeView';
import StoriesView, { ShareStoryModal } from './components/StoriesView';
import AdviceView from './components/AdviceView';
import DynamicsView from './components/DynamicsView';
import ProfilesView from './components/ProfilesView';
import ContactView from './components/ContactView';
import AuthUserView from './components/AuthUserView';
import { INITIAL_STORIES, BADGES_CATALOG } from './data/storiesData';
import { CheckCircle2Icon } from './components/Icons';

const STORAGE_KEY = 'igualdad_segura_state_v1';

function loadSavedState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export default function App() {
  const saved = loadSavedState();

  const [activeTab, setActiveTab] = useState('inicio');
  const [stories, setStories] = useState(saved?.stories || INITIAL_STORIES);
  const [user, setUser] = useState(saved?.user || null);
  const [empathyIds, setEmpathyIds] = useState(saved?.empathyIds || []);
  const [savedIds, setSavedIds] = useState(saved?.savedIds || []);
  const [favoriteQuotes, setFavoriteQuotes] = useState(saved?.favoriteQuotes || []);
  const [unlockedBadges, setUnlockedBadges] = useState(saved?.unlockedBadges || []);
  const [points, setPoints] = useState(typeof saved?.points === 'number' ? saved.points : 20);
  const [shareStory, setShareStory] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          stories,
          user,
          empathyIds,
          savedIds,
          favoriteQuotes,
          unlockedBadges,
          points,
        })
      );
    } catch {
      // Ignore storage quota errors
    }
  }, [stories, user, empathyIds, savedIds, favoriteQuotes, unlockedBadges, points]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => {
      setToast((current) => (current === msg ? null : current));
    }, 3200);
  };

  const unlockBadge = (badgeId) => {
    const badge = BADGES_CATALOG.find((b) => b.id === badgeId);
    if (!badge) return;
    setUnlockedBadges((prev) => {
      if (prev.includes(badgeId)) return prev;
      setPoints((p) => p + badge.points);
      showToast(`Insignia desbloqueada: ${badge.title} (+${badge.points} pts)`);
      return [...prev, badgeId];
    });
  };

  const handleNavigate = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleEmpathy = (storyId) => {
    setEmpathyIds((prev) => {
      const exists = prev.includes(storyId);
      if (!exists) {
        unlockBadge('badge-reader');
        return [...prev, storyId];
      }
      return prev.filter((id) => id !== storyId);
    });
  };

  const handleToggleSave = (storyId) => {
    setSavedIds((prev) => {
      const exists = prev.includes(storyId);
      if (exists) {
        showToast('Historia quitada de guardadas.');
        return prev.filter((id) => id !== storyId);
      }
      showToast('Historia guardada en tu perfil.');
      return [...prev, storyId];
    });
  };

  const handleAddComment = (storyId, text) => {
    const newComment = {
      id: `c-${Date.now()}`,
      author: user ? `${user.name} (${user.alias})` : 'Invitado/a Solidario/a',
      text,
      time: 'Ahora mismo',
    };
    setStories((prev) =>
      prev.map((st) =>
        st.id === storyId ? { ...st, comments: [...st.comments, newComment] } : st
      )
    );
    showToast('Tu mensaje de apoyo fue publicado.');
  };

  const handlePublishStory = (payload) => {
    const authorDisplay = payload.anonymous
      ? 'Anónimo · Voz Segura'
      : user
      ? user.name
      : 'Integrante de la Comunidad';
    const newStory = {
      id: `st-${Date.now()}`,
      author: authorDisplay,
      alias: payload.anonymous ? '@voz_anonima' : user?.alias || '@comunidad',
      role: user?.role || 'Miembro de Igualdad Segura',
      ownerEmail: user?.email || null,
      anonymous: payload.anonymous,
      category: payload.category,
      categoryLabel: payload.categoryLabel,
      title: payload.title,
      situation: payload.situation,
      howICoped: payload.howICoped,
      takeaway: payload.takeaway,
      date: 'Recién publicada',
      readTime: '2 min',
      empathyCount: 1,
      sharesCount: 0,
      tags: payload.tags,
      comments: [],
    };
    setStories((prev) => [newStory, ...prev]);
    unlockBadge('badge-storyteller');
    showToast('¡Tu historia se publicó para apoyar a la comunidad!');
  };

  const handleConfirmShare = (storyId) => {
    setStories((prev) =>
      prev.map((st) =>
        st.id === storyId ? { ...st, sharesCount: st.sharesCount + 1 } : st
      )
    );
    unlockBadge('badge-sharer');
    showToast('Gracias por compartir esta historia de afrontamiento.');
  };

  const handleToggleFavoriteQuote = (quoteId) => {
    setFavoriteQuotes((prev) => {
      const exists = prev.includes(quoteId);
      if (exists) return prev.filter((id) => id !== quoteId);
      showToast('Cita reflexiva guardada en tus favoritas.');
      return [...prev, quoteId];
    });
  };

  const handleShareQuote = () => {
    unlockBadge('badge-sharer');
    showToast('Cita copiada para compartir.');
  };

  const handleLogin = (userData) => {
    setUser(userData);
    unlockBadge('badge-member');
    showToast(`¡Bienvenida/o, ${userData.name}!`);
  };

  const handleLogout = () => {
    setUser(null);
    showToast('Has cerrado sesión correctamente.');
  };

  const handleUpdateProfile = (updates) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : prev));
    showToast('Perfil actualizado.');
  };

  return (
    <div className="app-shell">
      <Navbar
        activeTab={activeTab}
        onSelectTab={handleNavigate}
        unlockedCount={unlockedBadges.length}
        totalBadges={BADGES_CATALOG.length}
        points={points}
        user={user}
      />

      <main className="main-content">
        {activeTab === 'inicio' && (
          <HomeView
            onNavigate={handleNavigate}
            stories={stories}
            empathyIds={empathyIds}
            onToggleEmpathy={handleToggleEmpathy}
            onOpenShareModal={setShareStory}
            favoriteQuotes={favoriteQuotes}
            onToggleFavoriteQuote={handleToggleFavoriteQuote}
            onShareQuote={handleShareQuote}
          />
        )}

        {activeTab === 'perfiles' && (
          <ProfilesView user={user} onNavigate={handleNavigate} />
        )}

        {activeTab === 'historias' && (
          <StoriesView
            stories={stories}
            user={user}
            empathyIds={empathyIds}
            savedIds={savedIds}
            onToggleEmpathy={handleToggleEmpathy}
            onToggleSave={handleToggleSave}
            onAddComment={handleAddComment}
            onPublishStory={handlePublishStory}
            onOpenShareModal={setShareStory}
          />
        )}

        {activeTab === 'consejos' && (
          <AdviceView onUseAssertiveBuilder={() => unlockBadge('badge-assertive')} />
        )}

        {activeTab === 'dinamicas' && (
          <DynamicsView onCompleteDynamics={() => unlockBadge('badge-game')} />
        )}

        {activeTab === 'contacto' && (
          <ContactView user={user} onNotify={showToast} />
        )}

        {activeTab === 'usuario' && (
          <AuthUserView
            user={user}
            onLogin={handleLogin}
            onLogout={handleLogout}
            onUpdateProfile={handleUpdateProfile}
            unlockedBadges={unlockedBadges}
            points={points}
            stories={stories}
            empathyIds={empathyIds}
            savedIds={savedIds}
            favoriteQuotes={favoriteQuotes}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div>
            <strong>Igualdad Segura</strong> · Comunidad para la igualdad de género, asertividad y
            espacios libres de violencia.
          </div>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => handleNavigate('historias')}
              style={{ border: 'none', background: 'none', color: '#5b21b6', fontWeight: 700 }}
            >
              Historias
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('consejos')}
              style={{ border: 'none', background: 'none', color: '#5b21b6', fontWeight: 700 }}
            >
              Estructuras DESC
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('usuario')}
              style={{ border: 'none', background: 'none', color: '#5b21b6', fontWeight: 700 }}
            >
              Sesión y Usuario
            </button>
          </div>
        </div>
      </footer>

      <ShareStoryModal
        story={shareStory}
        onClose={() => setShareStory(null)}
        onConfirmShare={handleConfirmShare}
      />

      {toast && (
        <div className="toast-banner" role="status" aria-live="polite">
          <CheckCircle2Icon size={18} color="#34d399" />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}
