import profile from '../../data/profile';
import NetworkSphereBackground from '../ui/misc/NetworkSphereBackground';

const AboutSection = () => {
  const { title, contact } = profile;

  return (
    <section id="about" className="about-section">
      <style>{`
        .about-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #f8f9fa;
        }

        .about-inner {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 4rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 1.5rem;
        }

        @media (max-width: 768px) {
          .about-inner { padding: 0 1.75rem; }
        }

        .about-eyebrow {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #3b82c4;
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 0;
        }
        .about-eyebrow::before {
          content: '';
          width: 24px;
          height: 1px;
          background: #3b82c4;
          flex-shrink: 0;
        }

        .about-overlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(to right,
              rgba(10,12,16,0.78) 0%,
              rgba(10,12,16,0.50) 40%,
              rgba(10,12,16,0.18) 70%,
              rgba(10,12,16,0.08) 100%
            ),
            linear-gradient(to bottom,
              rgba(10,12,16,0.18) 0%,
              rgba(10,12,16,0.38) 100%
            );
          pointer-events: none;
          z-index: 0;
        }

        @media (max-width: 768px) {
          .about-overlay {
            background: linear-gradient(to bottom,
              rgba(10,12,16,0.40) 0%,
              rgba(10,12,16,0.75) 60%,
              rgba(10,12,16,0.92) 100%
            );
          }
        }

        .about-name {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(38px, 5.5vw, 72px);
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.03em;
          line-height: 1.0;
          margin: 0;
        }

        .about-subtitle {
          font-size: 15px;
          font-weight: 400;
          color: rgba(255,255,255,0.45);
          margin: 0;
        }

        .about-quote {
          font-size: clamp(15px, 2vw, 18px);
          font-style: italic;
          line-height: 1.8;
          color: rgba(255,255,255,0.38);
          max-width: 560px;
          margin: 0.5rem 0 0;
        }
      `}</style>

      <NetworkSphereBackground />
      <div className="about-overlay" />

      <div className="about-inner">
        <p className="about-eyebrow">About me</p>
        <h2 className="about-name">Kasun Thilina</h2>
        <p className="about-subtitle">
          {title} · {contact.address}
        </p>
        <p className="about-quote">
          "A passionate Senior Software Engineer with 7+ years of experience
          building robust enterprise systems. I thrive on solving complex
          problems with clean architecture, and I bring the same focus and
          dedication to every system I design — from backend APIs to scalable
          cloud deployments."
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
