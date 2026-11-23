import { useEffect, useState } from 'react';
import '../styles/cookies.css';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('cookiesChoice')) {
      const t = setTimeout(() => setVisible(true), 500);
      return () => clearTimeout(t);
    }
  }, []);

  const choose = (choice) => {
    localStorage.setItem('cookiesChoice', choice);
    setVisible(false);
  };

  return (
    <div id="cookie-banner" className={`cookie-banner${visible ? ' show' : ''}`}>
      <div className="cookie-content">
        <img src="/images/DevPioneers_Logo_HQ.svg" alt="DevPioneers" />
        <div className="cookie-text">
          Nous utilisons des cookies pour améliorer votre expérience sur <strong>DevPioneers</strong>.
        </div>
      </div>

      <div className="cookie-actions">
        <button id="accept-cookies" onClick={() => choose('accepted')}>Accepter</button>
        <button id="refuse-cookies" onClick={() => choose('refused')}>Refuser</button>
      </div>
    </div>
  );
}
