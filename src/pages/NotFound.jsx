import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/error404.css';

export default function NotFound() {
  useEffect(() => {
    document.title = '404 - Page introuvable | DevPioneers';
  }, []);

  return (
    <main className="error-page">
      {/* VIDEO BACKGROUND */}
      <video className="error-video" autoPlay muted loop playsInline>
        <source src="/images/astronaut-lost.mp4" type="video/mp4" />
      </video>

      {/* OVERLAY */}
      <div className="error-overlay"></div>

      <div className="error-container">
        <h1>Oups... Vous êtes perdu dans l'espace</h1>
        <p>
          La page que vous recherchez semble avoir disparu dans une galaxie inconnue.
          Notre équipe DevPioneers va vous aider à retrouver votre chemin.
        </p>

        <div className="error-actions">
          <Link to="/" className="btn-primary">Retour à l'accueil</Link>
          <Link to="/contact" className="btn-secondary">Nous contacter</Link>
        </div>
      </div>
    </main>
  );
}
