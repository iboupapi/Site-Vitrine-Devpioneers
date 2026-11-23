import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/index.css';
import { stats } from '../data';

function Counter({ target, percent }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    let started = false;

    const animate = () => {
      if (started) return;
      started = true;
      const duration = 2000;
      const stepTime = 20;
      const increment = target / (duration / stepTime);
      let count = 0;
      const suffix = percent ? '%' : '';

      const update = () => {
        count += increment;
        if (count >= target) {
          el.textContent = target + suffix;
        } else {
          el.textContent = Math.ceil(count) + suffix;
          setTimeout(update, stepTime);
        }
      };
      update();
    };

    const statsSection = el.closest('.stats');
    const check = () => {
      if (statsSection.getBoundingClientRect().top < window.innerHeight - 50) {
        animate();
        window.removeEventListener('scroll', check);
      }
    };

    window.addEventListener('scroll', check);
    window.addEventListener('load', check);
    check();

    return () => window.removeEventListener('scroll', check);
  }, [target, percent]);

  return <h2 ref={ref}>0{percent ? '%' : ''}</h2>;
}

function Stars() {
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" fill="currentColor" width="15" height="15" aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </>
  );
}

export default function Home() {
  useEffect(() => {
    document.title = 'DevPioneers - Accueil';
  }, []);

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h1>Dev<span>Pioneers</span></h1>
          <p>Nous créons des solutions digitales modernes pour développer votre business</p>
          <div className="hero-btns">
            <Link to="/contact" className="btn btn-primary">Démarrer un projet</Link>
            <Link to="/portfolio" className="btn btn-outline">Voir nos réalisations</Link>
          </div>
        </div>
      </section>

      {/* CLIENTS */}
      <section className="clients">
        <h2>Ils nous font confiance</h2>
        <div className="clients-logos">
          <img src="/images/client2.jpg" alt="Client 1" />
        </div>
      </section>

      {/* QUI SOMMES-NOUS */}
      <section className="quisommesnous">
        <div className="qsn-container">
          <div className="qsn-text">
            <h2>Qui sommes-nous ?</h2>
            <p>Nous sommes une agence digitale spécialisée dans la création de solutions innovantes, alliant design moderne et expertise technique.</p>
            <p>Notre mission est de transformer vos idées en produits performants qui font grandir votre business.</p>
            <a href="#services" className="btn btn-primary">En savoir plus</a>
          </div>
          <div className="qsn-image">
            <img src="/images/team.jpg" alt="Notre équipe DevPioneers" />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats">
        <div className="stats-grid">
          <div className="stat"><Counter target={stats.nombreProjets} /><p>Projets réalisés</p></div>
          <div className="stat"><Counter target={stats.nombreClients} /><p>Clients satisfaits</p></div>
          <div className="stat"><Counter target={stats.experience} /><p>Années d'expérience</p></div>
          <div className="stat"><Counter target={stats.satisfaction} percent /><p>Taux de satisfaction</p></div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="process">
        <h2 className="section-title">Notre méthode</h2>
        <p className="section-subtitle">Un processus éprouvé pour transformer vos idées en produits qui performent.</p>
        <div className="process-grid">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Analyse</h3>
            <p>Compréhension approfondie de votre besoin, de votre marché et de vos objectifs.</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Design</h3>
            <p>Création d'une interface moderne, intuitive et centrée sur l'expérience utilisateur.</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Développement</h3>
            <p>Code performant, sécurisé et maintenable avec les meilleures technologies.</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Déploiement</h3>
            <p>Mise en ligne soignée, suivi des performances et support continu.</p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services" id="services">
        <h2 className="section-title">Nos Services</h2>
        <p className="section-subtitle">Des solutions sur mesure pour tous vos besoins digitaux.</p>
        <div className="service-cards">

          <div className="card">
            <div className="card-img-wrap web">
              <img src="/images/webdev_img.jpg" alt="Développement Web" onError={(e) => (e.currentTarget.style.display = 'none')} />
            </div>
            <div className="card-body">
              <h3>Développement Web</h3>
              <p>Sites web modernes, rapides et optimisés pour le référencement.</p>
            </div>
          </div>

          <div className="card">
            <div className="card-img-wrap mobile">
              <img src="/images/app_mobile.jpg" alt="Applications Mobiles" onError={(e) => (e.currentTarget.style.display = 'none')} />
            </div>
            <div className="card-body">
              <h3>Applications Mobiles</h3>
              <p>Apps Android & iOS performantes avec une expérience native.</p>
            </div>
          </div>

          <div className="card">
            <div className="card-img-wrap ecom">
              <img src="/images/ecomerce.jpg" alt="E-commerce" onError={(e) => (e.currentTarget.style.display = 'none')} />
            </div>
            <div className="card-body">
              <h3>E-commerce</h3>
              <p>Boutiques en ligne puissantes qui convertissent vos visiteurs en clients.</p>
            </div>
          </div>

          <div className="card">
            <div className="card-img-wrap custom">
              <img src="/images/logiciel.jpg" alt="Logiciels sur mesure" onError={(e) => (e.currentTarget.style.display = 'none')} />
            </div>
            <div className="card-body">
              <h3>Logiciels sur mesure</h3>
              <p>Solutions entièrement adaptées à votre activité et vos processus métier.</p>
            </div>
          </div>

        </div>
      </section>

      {/* VIDEO */}
      <div className="section-bg">
        <video className="bg-video" autoPlay muted loop playsInline>
          <source src="/images/devpioneers.mp4" type="video/mp4" />
        </video>
        <div className="overlay"></div>
        <div className="video-content">
          <h1>Start your journey with</h1>
          <h3>DevPioneers</h3>
        </div>
      </div>

      {/* WHY US */}
      <section className="why">
        <h2 className="section-title">Pourquoi choisir DevPioneers ?</h2>
        <p className="section-subtitle">Ce qui nous différencie des autres agences digitales.</p>
        <div className="why-grid">
          <div className="why-card">
            <h3>Performance</h3>
            <p>Des solutions rapides, optimisées et fiables, pensées pour durer et évoluer avec votre business.</p>
          </div>
          <div className="why-card">
            <h3>Résultats</h3>
            <p>Nous concevons des produits orientés conversion qui génèrent de la valeur mesurable.</p>
          </div>
          <div className="why-card">
            <h3>Innovation</h3>
            <p>Design moderne et technologies avancées pour des expériences qui marquent les esprits.</p>
          </div>
          <div className="why-card">
            <h3>Accompagnement</h3>
            <p>Un partenariat de confiance avec un suivi personnalisé à chaque étape de votre projet.</p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials">
        <h2 className="testimonials-title">Ce que disent nos clients</h2>
        <div className="testimonials-grid">

          <div className="testimonial-card">
            <div className="testimonial-stars"><Stars /></div>
            <p>"DevPioneers a complètement transformé notre présence en ligne. Nous avons doublé nos clients en 3 mois."</p>
            <div className="testimonial-author">
              <div className="author-avatar">EK</div>
              <div className="author-info">
                <strong>Eunice keren</strong>
                <span>CEO,k&L-Elegence</span>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-stars"><Stars /></div>
            <p>"Équipe professionnelle, délais respectés et résultat au-delà de nos attentes. Je recommande vivement."</p>
            <div className="testimonial-author">
              <div className="author-avatar">NG</div>
              <div className="author-info">
                <strong>Nicolas Gestin</strong>
                <span>Directrice, Acrobranch</span>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-stars"><Stars /></div>
            <p>"Notre application mobile a reçu des retours excellents. L'UX est intuitive et le code est solide."</p>
            <div className="testimonial-author">
              <div className="author-avatar">MA</div>
              <div className="author-info">
                <strong>Marou Aledji</strong>
                <span>Fondateur, BHM dustribution</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CTA FINAL */}
      <section className="cta-final">
        <h2>Transformons votre idée en succès digital </h2>
        <p>Parlez-nous de votre projet dès aujourd'hui — consultation gratuite</p>
        <Link to="/contact" className="btn btn-outline">Lancer mon projet</Link>
        <Link to="/portfolio" className="btn" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}>Voir nos travaux</Link>
      </section>
    </>
  );
}
