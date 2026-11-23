import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/header.css';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const active =
    location.pathname === '/' ? 'home'
    : location.pathname === '/portfolio' ? 'portfolio'
    : location.pathname === '/contact' ? 'contact'
    : '';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`header${scrolled ? ' scrolled' : ''}`} id="header">
      <div className="header-container">

        {/* LOGO */}
        <div className="logo">
          <Link to="/" aria-label="Retour à l'accueil - DevPioneers">
            <img src="/images/DevPioneers_Logo_HQ.svg" alt="Logo DevPioneers" onError={(e) => (e.currentTarget.style.display = 'none')} />
            <span className="logo-text">Dev<span>Pioneers</span></span>
          </Link>
        </div>

        {/* NAVIGATION DESKTOP */}
        <nav className="nav-links" role="navigation" aria-label="Navigation principale">
          <Link to="/" className={active === 'home' ? 'active' : ''}>Accueil</Link>
          <Link to="/#services">Services</Link>
          <Link to="/portfolio" className={active === 'portfolio' ? 'active' : ''}>Réalisations</Link>
          <Link to="/contact" className={active === 'contact' ? 'active' : ''}>Contact</Link>
        </nav>

        {/* CTA DESKTOP */}
        <div className="header-right">
          <Link to="/contact" className="btn-header" aria-label="Démarrer un projet">
            Démarrer
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

      </div>
    </header>
  );
}
