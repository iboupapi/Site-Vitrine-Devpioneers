import { useEffect, useState } from 'react';
import '../styles/contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', website: '' });
  const [status, setStatus] = useState(null); // { type: 'success'|'error', text }
  const [sending, setSending] = useState(false);

  useEffect(() => {
    document.title = 'DevPioneers — Contactez-nous';
  }, []);

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    const { name, email, subject, message, website } = form;

    if (!name || !email || !subject || !message) {
      setStatus({ type: 'error', text: 'Tous les champs sont obligatoires !' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus({ type: 'error', text: 'Email invalide !' });
      return;
    }

    // Anti spam — honeypot
    if (website) {
      setStatus({ type: 'error', text: 'Requête invalide.' });
      return;
    }

    setSending(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message })
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        setStatus({ type: 'success', text: '✅ Message envoyé avec succès !' });
        setForm({ name: '', email: '', subject: '', message: '', website: '' });
      } else {
        setStatus({ type: 'error', text: data.message || 'Une erreur est survenue. Réessayez plus tard.' });
      }
    } catch {
      setStatus({ type: 'error', text: 'Une erreur est survenue. Réessayez plus tard.' });
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="hero-blob hero-blob-1"></div>
        <div className="hero-blob hero-blob-2"></div>
        <div className="hero-blob hero-blob-3"></div>
        <div className="hero-grid"></div>

        <div className="hero-inner">
          <div className="hero-badge">Disponible pour vos projets</div>
          <h1>Parlons de votre <span>projet</span></h1>
          <p>Transformons vos idées en solutions digitales puissantes. Notre équipe est prête à vous accompagner.</p>
          <a href="#form" className="hero-cta" onClick={(e) => {
            e.preventDefault();
            document.querySelector('#form')?.scrollIntoView({ behavior: 'smooth' });
          }}>
            Démarrer maintenant
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        <div className="scroll-hint">
          <div className="scroll-track"></div>
          Défiler
        </div>
      </section>

      {/* ===== WHY US ===== */}
      <section className="why-us section">
        <div className="container">
          <div className="why-header reveal">
            <div>
              <span className="section-label">Pourquoi nous</span>
              <h2>Ce qui nous<br />distingue</h2>
            </div>
            <p>Une équipe passionnée, des livraisons rapides et un accompagnement personnalisé à chaque étape de votre projet.</p>
          </div>

          <div className="why-grid">
            <div className="why-card reveal" style={{ transitionDelay: '0.1s' }}>
              <div className="why-card-num">01</div>
              <h3>Rapidité d'exécution</h3>
              <p>Des prototypes fonctionnels en quelques jours et des mises en production optimisées pour aller vite sans sacrifier la qualité.</p>
            </div>
            <div className="why-card reveal" style={{ transitionDelay: '0.2s' }}>
              <div className="why-card-num">02</div>
              <h3>Sécurité & Fiabilité</h3>
              <p>Code propre, mises à jour régulières et protection avancée de vos données. Votre tranquillité d'esprit, notre priorité.</p>
            </div>
            <div className="why-card reveal" style={{ transitionDelay: '0.3s' }}>
              <div className="why-card-num">03</div>
              <h3>Design & Expérience</h3>
              <p>Des interfaces intuitives, modernes et conçues pour convertir vos visiteurs en clients fidèles.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== EXPERTISE ===== */}
      <section className="expertise section">
        <div className="container">
          <div className="expertise-grid">
            <div className="expertise-visual reveal">
              <img src="/images/contact.jpg" alt="Nos expertises" />
              <div className="stat-card stat-card-1">
                <div className="stat-num">98%</div>
                <div className="stat-label">Clients satisfaits</div>
              </div>
              <div className="stat-card stat-card-2">
                <div className="stat-num">3j</div>
                <div className="stat-label">Premier prototype</div>
              </div>
            </div>

            <div className="reveal" style={{ transitionDelay: '0.15s' }}>
              <span className="section-label">Nos domaines</span>
              <h2 style={{ fontSize: 'clamp(36px,4vw,52px)', fontWeight: 800, marginBottom: 40, lineHeight: 1.1 }}>Nos Expertises</h2>

              <div className="expertise-list">
                <div className="exp-item">
                  <div className="exp-icon">🖥️</div>
                  <div className="exp-content">
                    <h3>Développement Web</h3>
                    <p>Sites vitrines, applications web et plateformes sur mesure, rapides, modernes et optimisées pour convertir vos visiteurs.</p>
                  </div>
                </div>
                <div className="exp-item">
                  <div className="exp-icon">🔧</div>
                  <div className="exp-content">
                    <h3>Maintenance & Évolution</h3>
                    <p>Nous assurons la sécurité, les mises à jour et l'amélioration continue de votre solution digitale.</p>
                  </div>
                </div>
                <div className="exp-item">
                  <div className="exp-icon">💬</div>
                  <div className="exp-content">
                    <h3>Support Technique</h3>
                    <p>Un accompagnement réactif et professionnel pour résoudre rapidement tous vos besoins.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FORM ===== */}
      <section className="form-section section" id="form">
        <div className="container">
          <div className="form-wrapper">

            {/* Info */}
            <div className="reveal">
              <span className="section-label">Nous écrire</span>
              <h2>On est là pour vous</h2>
              <p>Remplissez le formulaire ou contactez-nous directement. Nous répondons sous 24h.</p>

              <div className="contact-cards">
                <a href="tel:+221710434772" className="contact-card">
                  <div className="cc-icon">📞</div>
                  <div className="cc-text">
                    <div className="cc-label">+221 71 043 47 72</div>
                    <div className="cc-sub">Lun–Sam, 9h–18h</div>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, opacity: 0.4 }}>
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <a href="mailto:devpioneershome@gmail.com" className="contact-card">
                  <div className="cc-icon">✉️</div>
                  <div className="cc-text">
                    <div className="cc-label">devpioneershome@gmail.com</div>
                    <div className="cc-sub">Réponse sous 24h</div>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, opacity: 0.4 }}>
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <div className="contact-card" style={{ cursor: 'default' }}>
                  <div className="cc-icon">🕒</div>
                  <div className="cc-text">
                    <div className="cc-label">Lundi — Samedi</div>
                    <div className="cc-sub">9h00 – 18h00</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="reveal" style={{ transitionDelay: '0.15s' }}>
              <div className="contact-form">
                {status && (
                  <div className="form-message" style={{ color: status.type === 'success' ? '#22c55e' : '#ef4444' }}>
                    {status.text}
                  </div>
                )}

                <form onSubmit={onSubmit} className="contact-form-grid">
                  {/* Honeypot anti-spam */}
                  <input
                    type="text"
                    name="website"
                    value={form.website}
                    onChange={onChange}
                    style={{ display: 'none' }}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Nom complet</label>
                      <input type="text" id="name" name="name" placeholder="Jean Dupont" required value={form.name} onChange={onChange} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Adresse email</label>
                      <input type="email" id="email" name="email" placeholder="jean@exemple.com" required value={form.email} onChange={onChange} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject">Sujet</label>
                    <input type="text" id="subject" name="subject" placeholder="Création de site web, application..." required value={form.subject} onChange={onChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Votre message</label>
                    <textarea id="message" name="message" placeholder="Décrivez votre projet en détail : objectifs, délais, budget estimé..." required value={form.message} onChange={onChange} />
                  </div>
                  <button type="submit" className="submit-btn" disabled={sending}>
                    {sending ? 'Envoi en cours...' : 'Envoyer le message'}
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
