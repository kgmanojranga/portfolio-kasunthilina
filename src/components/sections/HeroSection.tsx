import { Button } from '../ui/buttons/Button';
import { ScrollHint } from '../ui/misc/ScrollHint';

const ArrowRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M2 7h10M8 3l4 4-4 4"
      stroke="#0a0c10"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M7 2v7M4 6l3 3 3-3M2 11h10"
      stroke="rgba(255,255,255,0.75)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const HeroSection = () => {
  return (
    <>
      <style>{`
        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: var(--bg-page);
        }

        .hero-photo {
          position: absolute;
          inset: 0;
          background-image: url('/hero-image.jpeg');
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
        }

        @media (max-width: 768px) {
          .hero-photo {
            background-image: url('/hero-image-1.jpeg');
            background-position: center top;
          }
        }

        .hero-photo-mask {
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
        }

        @media (max-width: 768px) {
          .hero-photo-mask {
            background: linear-gradient(to bottom,
              rgba(10,12,16,0.40) 0%,
              rgba(10,12,16,0.75) 60%,
              rgba(10,12,16,0.92) 100%
            );
          }
        }

        .hero-radial {
          display: none;
        }

        .hero-content {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 var(--sp-6);
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          align-items: center;
          min-height: 100vh;
        }

        /* ── Left ── */
        .hero-text {
          display: flex;
          flex-direction: column;
          gap: 0;
          padding: 80px 0;
        }

        .hero-eyebrow {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--accent-secondary);
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: var(--sp-5);
          animation: fadeUp 0.7s 0.20s both;
        }
        .hero-eyebrow::before {
          content: '';
          width: 24px;
          height: 1px;
          background: var(--accent-secondary);
          display: block;
        }

        .hero-name {
          font-family: var(--font-display);
          font-size: clamp(44px, 5.5vw, 72px);
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.05;
          letter-spacing: -0.025em;
          margin-bottom: var(--sp-5);
          animation: fadeUp 0.7s 0.35s both;
        }
        .hero-name span {
          display: block;
          font-size: 0.42em;
          font-weight: 400;
          color: var(--text-muted);
          letter-spacing: 0;
          margin-bottom: var(--sp-2);
        }

        .hero-tagline {
          font-size: var(--fs-base);
          color: var(--text-secondary);
          line-height: 1.75;
          max-width: 440px;
          margin-bottom: var(--sp-8);
          animation: fadeUp 0.7s 0.50s both;
        }

        .hero-btns {
          display: flex;
          gap: var(--sp-3);
          flex-wrap: wrap;
          margin-bottom: var(--sp-10);
          animation: fadeUp 0.7s 0.65s both;
        }

        .hero-stats {
          display: flex;
          gap: 0;
          animation: fadeUp 0.7s 0.80s both;
        }
        .hero-stat {
          padding-right: 28px;
          margin-right: 28px;
          border-right: 1px solid var(--border-subtle);
        }
        .hero-stat:last-child {
          border-right: none;
          padding-right: 0;
          margin-right: 0;
        }
        .hero-stat-num {
          font-family: var(--font-display);
          font-size: 26px;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1;
          margin-bottom: var(--sp-1);
        }
        .hero-stat-label {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.10em;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        /* ── Right ── */
        .hero-cards {
          display: flex;
          flex-direction: column;
          gap: 14px;
          padding: 80px 0;
        }

        .hero-cards > *:nth-child(1) { animation: fadeUp 0.7s 0.40s both; }
        .hero-cards > *:nth-child(2) { animation: fadeUp 0.7s 0.55s both; }
        .hero-cards > *:nth-child(3) { animation: fadeUp 0.7s 0.70s both; }
        .hero-cards > *:nth-child(4) { animation: fadeUp 0.7s 0.85s both; }

        .exp-row {
          display: flex;
          align-items: center;
          gap: var(--sp-3);
          padding: 10px 0;
          border-bottom: 1px solid var(--border-subtle);
        }
        .exp-row:first-child { padding-top: 0; }
        .exp-row:last-child  { border-bottom: none; padding-bottom: 0; }

        .exp-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255,255,255,0.25);
          flex-shrink: 0;
        }
        .exp-dot.active { background: var(--accent-secondary); }

        .exp-company {
          font-size: 13px;
          font-weight: 500;
          color: var(--text-secondary);
          flex: 1;
        }
        .exp-role {
          font-size: 11px;
          font-weight: 400;
          color: var(--text-muted);
          margin-top: 1px;
        }
        .exp-year {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-hint);
          letter-spacing: 0.04em;
          white-space: nowrap;
        }

        .card-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-hint);
          margin-bottom: 14px;
        }

        .contact-name {
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 600;
          color: var(--text-secondary);
          margin-bottom: 3px;
        }
        .contact-email {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-muted);
        }

        /* ── Scroll hint ── */
        .hero-scroll-hint {
          position: absolute;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
          animation: fadeIn 1s 1.4s both;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        @media (max-width: 860px) {
          .hero-content {
            grid-template-columns: 1fr;
            gap: var(--sp-8);
          }
          .hero-text  { padding: 100px 0 0; }
          .hero-cards { padding: 0 0 80px; }
        }
      `}</style>

      <section className="hero-section" id="hero">
        <div className="hero-photo">
          <div className="hero-photo-mask" />
        </div>
        <div className="hero-radial" />

        <div className="hero-content">
          {/* ── LEFT: Text ── */}
          <div className="hero-text">
            <p className="hero-eyebrow">Available for work</p>

            <h1 className="hero-name">
              <span>Hello, I'm</span>
              Kasun
              <br />
              Thilina
            </h1>

            <p className="hero-tagline">
              Senior Software Engineer crafting robust enterprise systems with
              Java, Spring Boot &amp; Angular. 7+ years building things that
              scale.
            </p>

            <div className="hero-btns">
              <Button variant="primary" as="a" href="#experience">
                View My Work <ArrowRightIcon />
              </Button>
              <Button variant="ghost" as="a" href="#contact">
                Download CV <DownloadIcon />
              </Button>
            </div>

            <div className="hero-stats">
              <div className="hero-stat">
                <div className="hero-stat-num">7+</div>
                <div className="hero-stat-label">Years Exp.</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-num">10+</div>
                <div className="hero-stat-label">Systems Built</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-num">3</div>
                <div className="hero-stat-label">Companies</div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-scroll-hint">
          <ScrollHint />
        </div>
      </section>
    </>
  );
};

export default HeroSection;
