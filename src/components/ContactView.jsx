import React, { useState } from 'react';
import { HELP_CHANNELS } from '../data/profilesData';
import { SendIcon, CheckCircle2Icon, ShieldCheckIcon } from './Icons';

export default function ContactView({ user, onNotify }) {
  const [name, setName] = useState(user ? user.name : '');
  const [topic, setTopic] = useState('orientacion');
  const [message, setMessage] = useState('');
  const [anonymous, setAnonymous] = useState(true);
  const [submittedTicket, setSubmittedTicket] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    const ticketId = `IS-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedTicket({
      id: ticketId,
      topic,
      anonymous,
    });
    setMessage('');
    onNotify('Tu mensaje confidencial fue recibido correctamente.');
  };

  return (
    <div className="container">
      <section className="section-header" style={{ marginBottom: 24 }}>
        <div>
          <span className="section-eyebrow">
            <ShieldCheckIcon size={13} />
            Contacto Directo y Confidencial
          </span>
          <h1 className="section-title" style={{ fontSize: 'clamp(1.7rem, 3vw, 2.3rem)' }}>
            Estamos Aquí para Escucharte y Orientarte
          </h1>
          <p className="section-subtitle">
            Si necesitas orientación emocional, herramientas para crear un espacio seguro en tu
            institución o prefieres escribir de manera anónima, este canal es para ti.
          </p>
        </div>
      </section>

      <div className="contact-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {HELP_CHANNELS.map((ch) => (
            <div key={ch.id} className="card-white">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 8,
                }}
              >
                <h2 style={{ fontSize: '1.12rem' }}>{ch.title}</h2>
                <span className="story-category-pill">{ch.tag}</span>
              </div>
              <p style={{ fontSize: '0.93rem', color: '#4b5563', marginBottom: 10 }}>
                {ch.description}
              </p>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: '#047857' }}>
                {ch.responseTime}
              </div>
            </div>
          ))}
        </div>

        <div className="card-white" style={{ padding: 28 }}>
          {submittedTicket ? (
            <div style={{ textAlign: 'center', padding: '18px 8px' }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 18,
                  background: '#ecfdf5',
                  color: '#059669',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 14,
                }}
              >
                <CheckCircle2Icon size={28} />
              </div>
              <h2 style={{ fontSize: '1.35rem', marginBottom: 8 }}>
                Mensaje recibido de forma segura
              </h2>
              <p style={{ color: '#4b5563', marginBottom: 16 }}>
                Código de seguimiento: <strong>{submittedTicket.id}</strong>. Nuestro equipo de
                acompañamiento revisará tu solicitud con total confidencialidad.
              </p>
              <button
                type="button"
                className="btn btn-outline-purple btn-sm"
                onClick={() => setSubmittedTicket(null)}
              >
                Enviar otra consulta
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h2 style={{ fontSize: '1.3rem', marginBottom: 6 }}>Buzón de Espacio Seguro</h2>
              <p style={{ fontSize: 13.5, color: '#6b7280', marginBottom: 18 }}>
                Puedes escribir con tu nombre o activar el envío anónimo.
              </p>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-topic">
                  ¿En qué podemos acompañarte?
                </label>
                <select
                  id="contact-topic"
                  className="form-control"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                >
                  <option value="orientacion">Orientación personal o escucha inicial</option>
                  <option value="protocolo">Implementar protocolo de espacio seguro</option>
                  <option value="aliados">Formación para aliados activos</option>
                  <option value="sugerencia">Sugerencia para la comunidad</option>
                </select>
              </div>

              {!anonymous && (
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-name">
                    Nombre o alias
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    className="form-control"
                    placeholder="Cómo prefieres que te llamemos"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              )}

              <div className="form-group">
                <label className="form-label" htmlFor="contact-msg">
                  Cuéntanos brevemente *
                </label>
                <textarea
                  id="contact-msg"
                  required
                  rows={4}
                  className="form-control"
                  placeholder="Escribe aquí tu duda, situación o consulta..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 9,
                  fontSize: 14,
                  fontWeight: 600,
                  marginBottom: 18,
                  cursor: 'pointer',
                }}
              >
                <input
                  type="checkbox"
                  checked={anonymous}
                  onChange={(e) => setAnonymous(e.target.checked)}
                />
                <span>Enviar de manera anónima y confidencial</span>
              </label>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                <SendIcon size={16} />
                <span>Enviar mensaje seguro</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

