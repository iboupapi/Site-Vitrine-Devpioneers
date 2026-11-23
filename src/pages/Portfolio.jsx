import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/portfolio.css';
import { projets } from '../data';

const FILTERS = ['all', 'web', 'mobile', 'ecommerce', 'logiciel'];

export default function Portfolio() {
  const [filter, setFilter] = useState('all');
  const [layout, setLayout] = useState('grid'); // 'grid' | 'list'
  const gridRef = useRef(null);

  useEffect(() => {
    document.title = 'Portfolio — DevPioneers';
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
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const visibleProjects = projets.filter(
    (p) => filter === 'all' || (p.category || 'web') === filter
  );

  return (
    <main>
      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="hero-blob hero-blob-1"></div>
        <div className="hero-blob hero-blob-2"></div>
        <div className="hero-blob hero-blob-3"></div>
        <div className="hero-grid"></div>

        <div className="hero-inner">
          <div className="hero-badge">Nos Réalisations</div>
          <h1>Des projets qui<br /><span>parlent</span> pour nous</h1>
          <p>Web, mobile, e-commerce et logiciels sur mesure — découvrez comment nous transformons les idées en produits performants.</p>
          <div className="hero-stats">
            <div className="hero-stat"><strong>+50</strong> Projets livrés</div>
            <div className="hero-stat"><strong>+30</strong> Clients satisfaits</div>
            <div className="hero-stat"><strong>5★</strong> Note moyenne</div>
          </div>
        </div>

        <div className="scroll-hint">
          <div className="scroll-track"></div>
          Défiler
        </div>
      </section>

      {/* ===== STICKY FILTER BAR ===== */}
      <div className="filters-bar" id="filters">
        <div className="filters-inner">
          <span className="filters-label">Filtrer</span>
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`filter-btn${filter === f ? ' active' : ''}`}
              data-filter={f}
              onClick={() => setFilter(f)}
            >
              {f === 'all' ? 'Tous' : f === 'web' ? 'Web' : f === 'mobile' ? 'Mobile' : f === 'ecommerce' ? 'E-commerce' : 'Logiciel'}
            </button>
          ))}
        </div>
      </div>

      {/* ===== PROJECTS ===== */}
      <section className="projects-section">

        <div className="projects-header reveal">
          <p className="projects-count" id="projectsCount">
            <span className="count-num" id="countNum">{visibleProjects.length}</span> projets
          </p>
          <div className="layout-toggle">
            <button
              className={`layout-btn${layout === 'grid' ? ' active' : ''}`}
              id="gridBtn"
              title="Vue grille"
              aria-label="Vue grille"
              onClick={() => setLayout('grid')}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <rect x="1" y="1" width="6" height="6" rx="1.5" />
                <rect x="9" y="1" width="6" height="6" rx="1.5" />
                <rect x="1" y="9" width="6" height="6" rx="1.5" />
                <rect x="9" y="9" width="6" height="6" rx="1.5" />
              </svg>
            </button>
            <button
              className={`layout-btn${layout === 'list' ? ' active' : ''}`}
              id="listBtn"
              title="Vue liste"
              aria-label="Vue liste"
              onClick={() => setLayout('list')}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <rect x="1" y="2" width="14" height="3" rx="1.5" />
                <rect x="1" y="7" width="14" height="3" rx="1.5" />
                <rect x="1" y="12" width="14" height="3" rx="1.5" />
              </svg>
            </button>
          </div>
        </div>

        <div
          className={`projects-grid reveal${layout === 'list' ? ' list-view' : ''}`}
          id="projectsGrid"
          ref={gridRef}
          style={{ transitionDelay: '0.1s' }}
        >
          {visibleProjects.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🖥️</div>
              <h3>Aucun projet disponible</h3>
              <p>Revenez bientôt — de nouvelles réalisations arrivent.</p>
            </div>
          ) : (
            projets.map((p, i) => {
              const show = filter === 'all' || (p.category || 'web') === filter;
              return (
              <div
                key={i}
                className="project-card"
                data-category={p.category || 'web'}
                style={{
                  transition: 'opacity 0.28s ease, transform 0.28s ease',
                  display: show ? 'flex' : 'none',
                  opacity: show ? 1 : 0,
                  transform: show ? 'none' : 'translateY(12px)'
                }}
              >
                <div className="project-image">
                  <span className="project-badge">{p.badge || p.category}</span>
                  <img
                    src={p.image || '/images/webdev_img.jpg'}
                    alt={p.title}
                    loading="lazy"
                    onError={(e) => { e.currentTarget.src = '/images/webdev_img.jpg'; }}
                  />
                  <div className="project-overlay">
                    <a href={p.url} target="_blank" rel="noopener" className="overlay-btn">
                      Voir le projet
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>
                    </a>
                  </div>
                </div>

                <div className="project-content">
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>

                  {p.tags && p.tags.length > 0 && (
                    <div className="project-tags">
                      {p.tags.map((tag, j) => (
                        <span key={j} className="project-tag">{tag}</span>
                      ))}
                    </div>
                  )}

                  <div className="project-footer">
                    <a href={p.url} target="_blank" rel="noopener" className="project-link">
                      Voir le projet
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                    </a>
                  </div>
                </div>
              </div>
              );
            })
          )}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="cta-section reveal">
        <div className="cta-inner">
          <div className="cta-blob cta-blob-1"></div>
          <div className="cta-blob cta-blob-2"></div>
          <div className="cta-content">
            <span className="cta-label">Prêt à démarrer ?</span>
            <h2>Un projet en tête ?</h2>
            <p>Parlons de votre idée et construisons ensemble quelque chose d'exceptionnel.</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn-primary">
                Démarrer un projet
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
              </Link>
              <a href="tel:+221710434772" className="btn-secondary">
                📞 Appeler directement
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
