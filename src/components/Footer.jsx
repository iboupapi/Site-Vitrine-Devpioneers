import { Link } from 'react-router-dom';
import '../styles/footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* TOP — Brand + Navigation + Contact */}
        <div className="footer-top">

          {/* BRAND */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <img src="/images/DevPioneers_Logo_HQ.webp" alt="DevPioneers" onError={(e) => (e.currentTarget.style.display = 'none')} />
              <span>Dev<em>Pioneers</em></span>
            </Link>
            <p>Nous créons des solutions digitales modernes, élégantes et performantes pour propulser votre business.</p>

            {/* Réseaux sociaux sous le texte brand */}
            <div className="footer-socials">
              <a href="#" aria-label="Facebook" className="social-btn" onClick={(e) => e.preventDefault()}>
                <img src="/images/fb.webp" alt="Facebook" />
              </a>
              <a href="#" aria-label="Twitter/X" className="social-btn" onClick={(e) => e.preventDefault()}>
                <img src="/images/twitter.webp" alt="Twitter" />
              </a>
              <a href="#" aria-label="YouTube" className="social-btn" onClick={(e) => e.preventDefault()}>
                <img src="/images/yt.webp" alt="YouTube" />
              </a>
              <a href="#" aria-label="Instagram" className="social-btn" onClick={(e) => e.preventDefault()}>
                <img src="/images/ig.webp" alt="Instagram" />
              </a>
            </div>
          </div>

          {/* NAVIGATION */}
          <div className="footer-col">
            <h4>Navigation</h4>
            <nav>
              <Link to="/">Accueil</Link>
              <Link to="/#services">Services</Link>
              <Link to="/portfolio">Portfolio</Link>
              <Link to="/contact">Contact</Link>
            </nav>
          </div>

          {/* CONTACT */}
          <div className="footer-col">
            <h4>Contact</h4>
            <nav>
              <a href="tel:+221710434772" className="contact-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 0120 2.18 2 2 0 0122 4.18v3" />
                </svg>
                +221 71 043 47 72
              </a>
              <a href="mailto:devpioneershome@gmail.com" className="contact-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <polyline points="2,4 12,13 22,4" />
                </svg>
                devpioneershome@gmail.com
              </a>
              <a href="#" className="contact-item" onClick={(e) => e.preventDefault()}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Dakar, Sénégal
              </a>
            </nav>
          </div>

        </div>

        {/* BOTTOM — Copyright */}
        <div className="footer-bottom">
          <p>&copy; 2026 DevPioneers — Tous droits réservés.</p>
          <div className="footer-bottom-links">
            <a href="#" onClick={(e) => e.preventDefault()}>Politique de confidentialité</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Mentions légales</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
